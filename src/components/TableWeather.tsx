import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Item from '../interface/Item';
import { useEffect, useState } from 'react';
import { Box, TablePagination, Typography, Autocomplete, TextField, Card } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { createFilterOptions } from '@mui/material/Autocomplete';

interface MyProp {
    itemsIn: Item[];
}

export default function BasicTable(props: MyProp) {
    const [rows, setRows] = useState<Item[]>([]);
    const [filteredRows, setFilteredRows] = useState<Item[]>([]);
    const [page, setPage] = useState(0); // Página actual
    const rowsPerPage = 8; // Número de filas por página

    // Manejadores de eventos para la paginación
    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    useEffect(() => {
        setRows(props.itemsIn);
        setFilteredRows(props.itemsIn);
    }, [props]);

    const uniqueDates = Array.from(new Set(rows.map(item => item.date)));

    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option: string) => option,
    });

    const handleFilterChange = (_event: unknown, value: string[] | null) => {
        setPage(0); // Reset page to 0 when filter changes
        if (value && value.length > 0) {
            setFilteredRows(rows.filter((item) => value.includes(item.date)));
        } else {
            setFilteredRows(rows);
        }
    };

    return (
        <Card
            variant='outlined'
            sx={{
                p: 2,
                m: 2,
                display: 'flex',
                flexDirection: 'column',
                width: { xs: '100%' },
            }}
        >
            <Grid container spacing={4}
                justifyContent='space-between'
                margin={2}
                alignItems='center'
            >
                <Grid container spacing={2} flexDirection='column' sx={{ sm: 12, md: 8 }}
                    justifyContent='center'
                    alignItems='center'
                >
                    <Grid sx={{ sm: 12, md: 12 }}>
                        <Typography variant='h4' component='h4'>Historial Climático</Typography>
                    </Grid>
                    <Grid sx={{ sm: 12, md: 12 }}>
                        <Typography variant='body1' component='p'>Datos climáticos de los últimos 5 días</Typography>
                    </Grid>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ minWidth: 120 }}>
                        <Autocomplete
                            multiple
                            options={uniqueDates}
                            filterOptions={filterOptions}
                            onChange={handleFilterChange}
                            renderInput={(params) => <TextField {...params} label="Filtrar por Fecha" />}
                            sx={{ width: '100%' }}
                        />
                    </Box>
                </Grid>
            </Grid>
            <TableContainer
                sx={{ width: '100%' }}
            >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'><b>Fecha</b></TableCell>
                            <TableCell align='center'><b>Hora de inicio</b></TableCell>
                            <TableCell align="center"><b>Hora de fin</b></TableCell>
                            <TableCell align="center"><b>Temperatura (°C)</b></TableCell>
                            <TableCell align="center"><b>Humedad (%)</b></TableCell>
                            <TableCell align="center"><b>Precipitación (mm)</b></TableCell>
                            <TableCell align="center"><b>Velocidad del Viento (m/s)</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows
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
                <TablePagination
                    rowsPerPageOptions={[8]} // Opciones de filas por página (fijo en 8)
                    component="div"
                    count={filteredRows.length} // Número total de filas
                    rowsPerPage={rowsPerPage} // Número de filas por página
                    page={page} // Página actual
                    onPageChange={handleChangePage} // Manejador de cambio de página
                />
            </TableContainer>
        </Card>
    );
}
