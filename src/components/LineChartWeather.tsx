import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
import Item from '../interface/Item';
import { Card, Typography } from '@mui/material';

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
        <Card variant='outlined' sx={{ p: 2, m: 2 }}>
            <Typography component="h2" variant='subtitle2' gutterBottom>
                {prop.selectedVariable} las próximas 24 horas
            </Typography>
            <LineChart
                xAxis={[
                    {
                        scaleType: 'point',
                        data: xLabels
                    }
                ]}
                series={[
                    {
                        data: dataDictionary[variable],
                        label: variable,
                        // area: true,
                        // color: '#fdb462'
                    }
                ]}
                height={400}
                margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
                grid={{ horizontal: true }}
            />
        </Card>
    );
}