import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
import Item from '../interface/Item';

interface MyProp {
    selectedVariable: string;
    itemsIn: Item[];
}

export default function LineChartWeather(prop: MyProp) {
    const [rows, setRows] = useState<Item[]>([]);

    useEffect(() => {
        setRows(prop.itemsIn.slice(0, 8));
    }, [prop.itemsIn]);

    const dataDictionary: { [key: string]: number[] } = {
        Temperatura: rows.map((item) => parseFloat(item.temperature)),
        Humedad: rows.map((item) => parseFloat(item.humidity)),
        Precipitación: rows.map((item) => parseFloat(item.precipitation)),
    };

    const variable = prop.selectedVariable;

    const xLabels = rows.map((row) => row.timeStart);

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            }}
        >
            <h2>{prop.selectedVariable} las próximas 24 horas</h2>
            {/* Componente para un gráfico de líneas */}
            <LineChart
                width={700}
                height={400}
                series={[
                    {
                        data: dataDictionary[variable],
                        label: variable,
                        area: true,
                        // color: '#fdb462'
                    }
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
            />
        </Paper>
    );
}