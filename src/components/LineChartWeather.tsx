import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';
import Item from '../interface/Item';
import { useEffect, useState } from 'react';
import ControlWeather from './ControlWeather';

interface MyProp {
    itemsIn: Item[];
}

export default function LineChartWeather(props: MyProp) {
    const [rows, setRows] = useState<Item[]>([]);

    useEffect(() => {
        setRows(props.itemsIn.slice(0, 8));
    }, [props]);

    const temperatureData = rows.map((row) => parseFloat(row.temperature));
    const humidityData = rows.map((row) => parseFloat(row.humidity));
    const precipitationData = rows.map((row) => parseFloat(row.precipitation));

    const dataDictionary = {
        "Temperatura": temperatureData,
        "Humedad": humidityData,
        "Precipitación": precipitationData,
    };

    const xLabels = rows.map((row) => row.timeStart);

    const variable = "Temperatura";

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            }}
        >
            <h2>{variable} las próximas 24 horas</h2>

            <ControlWeather />

            {/* Componente para un gráfico de líneas */}
            <LineChart
                width={700}
                height={400}
                series={[{ data: dataDictionary[variable], label: variable }]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
            />
        </Paper>
    );
}