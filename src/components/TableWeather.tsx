import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Item from '../interface/Item';
import { useEffect, useState } from 'react';

interface MyProp {
    itemsIn: Item[];
}

export default function BasicTable(props: MyProp) {
    let [rows, setRows] = useState<Item[]>([]);

    useEffect(() => {
        setRows(props.itemsIn);
    }, [props]);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Hora de inicio</TableCell>
                        <TableCell align="right">Hora de fin</TableCell>
                        <TableCell align="right">Temperatura (°C)</TableCell>
                        <TableCell align="right">Humedad (%)</TableCell>
                        <TableCell align="right">Precipitación (mm)</TableCell>
                        <TableCell align="right">Velocidad del Viento (m/s)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, idx) => (
                        <TableRow
                            key={idx}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.date}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.timeStart}
                            </TableCell>
                            <TableCell align="right">{row.timeEnd}</TableCell>
                            <TableCell align="right">{row.temperature}</TableCell>
                            <TableCell align="right">{row.humidity}</TableCell>
                            <TableCell align="right">{row.precipitation}</TableCell>
                            <TableCell align="right">{row.windSpeed}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}