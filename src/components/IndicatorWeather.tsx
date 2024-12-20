import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

interface Indicator {
    title?: string;
    subtitle?: string;
    value?: string;
    icon?: JSX.Element;
}

export default function IndicatorWeather(config: Indicator) {
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 1,
                borderRadius: 2,
                backgroundColor: '#ffffff',
                minWidth: 180,
                maxWidth: { xs: 300, sm: 400},
            }}
        >
            {config.icon && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 1,
                    }}
                >
                    {config.icon}
                </Box>
            )}
            <Typography component="h2" variant="subtitle1"
                color="text.secondary" gutterBottom>
                {config.title}
            </Typography>
            <Typography component="p" variant="h4" color="text.primary">
                {config.value}
            </Typography>
            <Typography component="p" variant="body2" color="text.secondary">
                {config.subtitle}
            </Typography>
        </Paper>
    )
}