import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Item from '../interface/item';
import { useEffect, useState } from 'react';

interface MyProp {
    itemsIn: Item[];
}

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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