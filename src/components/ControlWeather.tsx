{/* Hooks */ }
import { useState, useRef } from 'react';

{/* Componentes MUI */ }

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

{/* Interfaz SelectChangeEvent */ }
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function ControlWeather() {
    {/* Constante de referencia a un elemento HTML */ }
    const descriptionRef = useRef<HTMLDivElement>(null);

    {/* Variable de estado y función de actualización */ }
    const [, setSelected] = useState(-1)

    {/* Arreglo de objetos */ }
    const items = [
        { "name": "Precipitación", "description": "Cantidad de agua que cae sobre una superficie en un período específico." },
        { "name": "Humedad", "description": "Cantidad de vapor de agua presente en el aire, generalmente expresada como un porcentaje." },
        { "name": "Temperatura", "description": "Medida del calor o frío en el ambiente, generalmente expresada en grados Celsius o Fahrenheit." }
    ]

    {/* Arreglo de elementos JSX */ }
    const options = items.map((item, key) => <MenuItem key={key} value={key}>{item["name"]}</MenuItem>)



    {/* Manejador de eventos */ }
    const handleChange = (event: SelectChangeEvent) => {

        const idx = parseInt(event.target.value)
        // alert( idx );
        setSelected(idx);

        {/* Modificación de la referencia descriptionRef */ }
        if (descriptionRef.current !== null) {
            descriptionRef.current.innerHTML = (idx >= 0) ? items[idx]["description"] : ""
        }

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
                        defaultValue='-1'
                        onChange={handleChange}
                    >
                        <MenuItem key="-1" value="-1" disabled>Seleccione una variable</MenuItem>

                        {options}

                    </Select>
                </FormControl>

            </Box>

            {/* Use la variable de estado para renderizar del item seleccionado */}
            <Typography ref={descriptionRef} mt={2} component="p" color="text.secondary"/>


        </Paper>


    )
}