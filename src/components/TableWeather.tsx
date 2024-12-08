import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Item from '../interface/Item';
import { useEffect, useState } from 'react';
import { Grid, TablePagination, Typography } from '@mui/material';

interface MyProp {
    itemsIn: Item[];
}

export default function BasicTable(props: MyProp) {
    const [rows, setRows] = useState<Item[]>([]);

    const [page, setPage] = useState(0); // Página actual
    const rowsPerPage = 8; // Número de filas por página

    // Manejadores de eventos para la paginación
    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    useEffect(() => {
        setRows(props.itemsIn);
    }, [props]);

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            }}
        >
            <Grid spacing={4}>    
                <Typography variant='h4' component='h4'>Historial Climático</Typography>
                <Grid>

                </Grid>
            </Grid>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Fecha</TableCell>
                            <TableCell align='center'>Hora de inicio</TableCell>
                            <TableCell align="center">Hora de fin</TableCell>
                            <TableCell align="center">Temperatura ({/*rows.temperature_units*/}°C)</TableCell>
                            <TableCell align="center">Humedad (%)</TableCell>
                            <TableCell align="center">Precipitación (mm)</TableCell>
                            <TableCell align="center">Velocidad del Viento (m/s)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Filtrar filas según la página
                            .map((row, idx) => (
                                <TableRow
                                    key={idx}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align='center' component="th" scope="row">
                                        {row.date}
                                    </TableCell>
                                    <TableCell align='center'> {row.timeStart}</TableCell>
                                    <TableCell align="center">{row.timeEnd}</TableCell>
                                    <TableCell align="center">{row.temperature}</TableCell>
                                    <TableCell align="center">{row.humidity}</TableCell>
                                    <TableCell align="center">{row.precipitation}</TableCell>
                                    <TableCell align="center">{row.windSpeed}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                {/* Agregar paginación debajo de la tabla */}
                <TablePagination
                    rowsPerPageOptions={[8]} // Opciones de filas por página (fijo en 8)
                    component="div"
                    count={rows.length} // Número total de filas
                    rowsPerPage={rowsPerPage} // Número de filas por página
                    page={page} // Página actual
                    onPageChange={handleChangePage} // Manejador de cambio de página
                />
            </TableContainer>
        </Paper>
    );
}