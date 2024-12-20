{/* Hooks */ }
import { useState, useEffect } from 'react';

{/* Componentes MUI */ }

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

{/* Interfaz SelectChangeEvent */ }
import Select from '@mui/material/Select';

interface ControlWeatherProps {
    selectedVariable: string;
    setSelectedVariable: (value: string) => void;
}

export default function ControlWeather({ selectedVariable, setSelectedVariable }: ControlWeatherProps) {
    
    const [description, setDescription] = useState('');

    {/* Arreglo de objetos */ }
    const items = [
        { "name": "Temperatura", "description": "Medida del calor o frío en el ambiente, generalmente expresada en grados Celsius o Fahrenheit." },
        { "name": "Humedad", "description": "Cantidad de vapor de agua presente en el aire, generalmente expresada como un porcentaje." },
        { "name": "Precipitación", "description": "Cantidad de agua que cae sobre una superficie en un período específico." },
    ]

    useEffect(() => {
        const selectedItem = items.find((item) => item.name === selectedVariable);
        setDescription(selectedItem ? selectedItem.description : '');
    }, [selectedVariable]);

    const handleChange = (event: { target: { value: string; }; }) => {
        setSelectedVariable(event.target.value);
    };


    {/* JSX */ }
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}
        >

            <Typography mb={2} component="h3" variant="h6" color="primary">
                Variables Meteorológicas
            </Typography>

            <Box sx={{ minWidth: 120 }}>

                <FormControl fullWidth>
                    <InputLabel id="simple-select-label">Variables</InputLabel>
                    <Select
                        labelId="simple-select-label"
                        id="simple-select"
                        label="Variables"
                        // defaultValue='-1'
                        value={selectedVariable}
                        onChange={handleChange}
                    >
                        {items.map((item, index) => (
                            <MenuItem key={index} value={item.name}>
                                {item.name}
                            </MenuItem>
                        ))}

                    </Select>
                </FormControl>
            </Box>

            {/* Use la variable de estado para renderizar del item seleccionado */}
            <Typography
                mt={2}
                component="p"
                color="text.secondary"
            >
                {description}
            </Typography>



        </Paper>


    )
}