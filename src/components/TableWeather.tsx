import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Item from '../interface/Item';
import { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, TablePagination, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2'

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

    {/* Arreglo de objetos */ }
    const items = [
        { "date": "Temperatura", "data": "Medida del calor o frío en el ambiente, generalmente expresada en grados Celsius o Fahrenheit." },
        { "date": "Humedad", "data": "Cantidad de vapor de agua presente en el aire, generalmente expresada como un porcentaje." },
        { "date": "Precipitación", "data": "Cantidad de agua que cae sobre una superficie en un período específico." },
    ]

    // items = props.itemsIn;

    {/* Arreglo de elementos JSX */ }
    const options = items.map((item, key) => <MenuItem key={key} value={key}>{item["date"]}</MenuItem>)

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
            <Grid container spacing={4}>
                <Grid container spacing={2} flexDirection='column'>
                    {/* <Grid size={{ xs: 12, md: 6 }}> */}
                    <Typography variant='h4' component='h4'>Historial Climático</Typography>
                    {/* </Grid> */}
                    {/* <Grid size={{ xs: 12, md: 6 }}> */}
                    <Typography variant='body1' component='p'>Datos climáticos de los últimos 5 días</Typography>
                    {/* </Grid> */}
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ minWidth: 120 }}>

                        <FormControl fullWidth>
                            <InputLabel id="simple-select-label">Fecha</InputLabel>
                            <Select
                                labelId="simple-select-label"
                                id="simple-select"
                                label="Variables"
                                defaultValue='-1'
                                // onChange={handleChange}
                            >
                                <MenuItem key="-1" value="-1" disabled>Seleccione una variable</MenuItem>

                                {options}

                            </Select>
                        </FormControl>

                    </Box>
                </Grid>
            </Grid>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'><b>Fecha</b></TableCell>
                            <TableCell align='center'><b>Hora de inicio</b></TableCell>
                            <TableCell align="center"><b>Hora de fin</b></TableCell>
                            <TableCell align="center"><b>Temperatura ({/*rows.temperature_units*/}°C)</b></TableCell>
                            <TableCell align="center"><b>Humedad (%)</b></TableCell>
                            <TableCell align="center"><b>Precipitación (mm)</b></TableCell>
                            <TableCell align="center"><b>Velocidad del Viento (m/s)</b></TableCell>
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