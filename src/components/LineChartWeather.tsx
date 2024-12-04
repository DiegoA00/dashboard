import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';
import Item from '../interface/Item';
import { useEffect, useState } from 'react';

interface MyProp {
    itemsIn: Item[];
}


export default function LineChartWeather(props: MyProp) {
    const [rows, setRows] = useState<Item[]>([]);

    useEffect(() => {
        setRows(props.itemsIn);
    }, [props]);

    // const pData = rows.map((row) => row.precipitation);

    const temperatureData = rows.map((row) => parseFloat(row.temperature));
    const humidityData = rows.map((row) => parseFloat(row.humidity));
    const precipitationData = rows.map((row) => parseFloat(row.precipitation));
    // const windSpeedData = rows.map((row) => row.windSpeed);

    const xLabels = rows.map((row) => row.timeStart);

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}
        >

            {/* Componente para un gráfico de líneas */}
            <LineChart
                width={400}
                height={250}
                
                series={[
                    { data: temperatureData, label: 'Temperatura' },
                    { data: humidityData, label: 'Humedad' },
                    { data: precipitationData, label: 'Precipitación' },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
            />
        </Paper>
    );
}