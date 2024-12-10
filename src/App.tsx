import './App.css'
import { Element } from 'react-scroll';
import { useEffect, useState } from 'react';

// MUI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Toolbar, CssBaseline } from '@mui/material';
import Grid from '@mui/material/Grid2'

// Components
import IndicatorWeather from './components/IndicatorWeather'
import TableWeather from './components/TableWeather';
import LineChartWeather from './components/LineChartWeather';
import DrawerAppBar from './components/DrawerAppBar';

// Interfaces
import Item from './interface/Item';

interface Indicator {
  title?: string;
  subtitle?: string;
  value?: string;
  icon?: JSX.Element;
}

// Icons
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import { WbTwilightOutlined } from '@mui/icons-material';
import ControlWeather from './components/ControlWeather';

// Personaliza el tema
const theme = createTheme({
  palette: {
    background: {
      default: '#E3F2FD', // Color de fondo general
    },
    primary: {
      main: '#455A64', // Color del texto y fondo de la barra lateral
    },
    secondary: {
      main: '#FF7043', // Color para íconos, gráficos, y elementos destacados
    },
    text: {
      primary: '#455A64', // Color de texto principal
      secondary: '#90A4AE', // Color de texto secundario (opcional)
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#E3F2FD', // Color de fondo del cuerpo
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF', // Fondo para elementos como tarjetas
          color: '#455A64', // Color de texto en tarjetas
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#FF7043', // Color predeterminado de los íconos
        },
      },
    },
  },
});

function convertUTCToLocal(utcTime: string, timezoneOffset: number): string {
  // Convierte el tiempo UTC a un objeto Date
  const utcDate = new Date(utcTime);

  // Ajusta el tiempo en milisegundos sumando el offset del timezone
  const localDate = new Date(utcDate.getTime() + timezoneOffset * 1000);

  // Devuelve la hora local en formato legible
  return localDate.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function App() {

  {/* Variable de estado y función de actualización */ }
  const [indicators, setIndicators] = useState<Indicator[]>([])

  const [selectedVariable, setSelectedVariable] = useState('Temperatura');

  const [items, setItems] = useState<Item[]>([])

  const [owm, setOWM] = useState(localStorage.getItem("openWeatherMap"))

  {/* Hook: useEffect */ }
  useEffect(() => {
    const request = async () => {
      {/* Referencia a las claves del LocalStorage: openWeatherMap y expiringTime */ }
      const savedTextXML = localStorage.getItem("openWeatherMap") || "";
      const expiringTime = localStorage.getItem("expiringTime");

      {/* Obtenga la estampa de tiempo actual */ }
      const nowTime = (new Date()).getTime();

      {/* Verifique si es que no existe la clave expiringTime o si la estampa de tiempo actual supera el tiempo de expiración */ }
      if (expiringTime === null || nowTime > parseInt(expiringTime)) {

        {/* Request */ }
        const API_KEY = "68dbed2bbf6ea528c73d3d5d21073063"
        const lang = "es"
        const units = "metric"
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&lang=${lang}&units=${units}&appid=${API_KEY}`)
        const savedTextXML = await response.text();

        {/* Tiempo de expiración */ }
        const hours = 0.01
        const delay = hours * 3600000
        const expiringTime = nowTime + delay


        {/* En el LocalStorage, almacene el texto en la clave openWeatherMap, estampa actual y estampa de tiempo de expiración */ }
        localStorage.setItem("openWeatherMap", savedTextXML)
        localStorage.setItem("expiringTime", expiringTime.toString())
        localStorage.setItem("nowTime", nowTime.toString())

        {/* DateTime */ }
        localStorage.setItem("expiringDateTime", new Date(expiringTime).toString())
        localStorage.setItem("nowDateTime", new Date(nowTime).toString())

        {/* Modificación de la variable de estado mediante la función de actualización */ }
        setOWM(savedTextXML)

      }

      {/* Valide el procesamiento con el valor de savedTextXML */ }
      if (savedTextXML) {
        {/* XML Parser */ }
        const parser = new DOMParser();
        const xml = parser.parseFromString(savedTextXML, "application/xml");

        {/* Arreglo para agregar los resultados */ }

        const dataToIndicators: Indicator[] = new Array<Indicator>();

        const dataToItems: Item[] = new Array<Item>();

        {/* 
              Análisis, extracción y almacenamiento del contenido del XML 
              en el arreglo de resultados
          */}

        const name = xml.getElementsByTagName("name")[0].innerHTML || ""
        const country = xml.getElementsByTagName("country")[0].innerHTML || ""
        dataToIndicators.push({ "title": "Ciudad", "subtitle": country, "value": name, icon: <LocationCityOutlinedIcon sx={{ fontSize: 80 }} /> })


        const times = xml.getElementsByTagName("time")

        const climate = times[0].getElementsByTagName("symbol")[0].getAttribute("name") || ""
        const icon = times[0].getElementsByTagName("symbol")[0].getAttribute("var") || ""
        dataToIndicators.push({ "title": "Clima", "subtitle": "", "value": climate, "icon": <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} /> })

        const timezone = xml.getElementsByTagName("timezone")[0].innerHTML || ""
        const sun = xml.getElementsByTagName("sun")[0]

        const sunriseUTC = sun.getAttribute("rise") || ""
        const sunsetUTC = sun.getAttribute("set") || ""

        const sunriseLocal = convertUTCToLocal(sunriseUTC, parseInt(timezone))
        const sunsetLocal = convertUTCToLocal(sunsetUTC, parseInt(timezone))

        const sunrise = sun.getAttribute("rise")?.split("T") || ""
        dataToIndicators.push({ "title": "Amanecer", "subtitle": sunrise[0], "value": sunriseLocal, "icon": <WbTwilightOutlined sx={{ fontSize: 80 }} /> })

        const sunset = sun.getAttribute("set")?.split("T") || ""
        dataToIndicators.push({ "title": "Atardecer", "subtitle": sunset[0], "value": sunsetLocal, "icon": <WbTwilightOutlined sx={{ fontSize: 80 }} /> })

        for (let i = 0; i < 40; i++) {
          const time = times[i]

          const date = time.getAttribute("from")?.split('T')[0] || ""

          const from = time.getAttribute("from")?.split('T')[1].slice(0, -3) || ""
          const to = time.getAttribute("to")?.split('T')[1].slice(0, -3) || ""

          const temperature = time.getElementsByTagName("temperature")[0].getAttribute("value") || ""
          const precipitation = time.getElementsByTagName("precipitation")[0].getAttribute("probability") || ""
          const humidity = time.getElementsByTagName("humidity")[0].getAttribute("value") || ""
          const windSpeed = time.getElementsByTagName("windSpeed")[0].getAttribute("mps") || ""


          dataToItems.push({
            "date": date,
            "timeStart": from,
            "timeEnd": to,
            "temperature": temperature,
            "humidity": humidity,
            "precipitation": precipitation,
            "windSpeed": windSpeed
          })
        }

        {/* Modificación de la variable de estado mediante la función de actualización */ }
        setIndicators(dataToIndicators)

        setItems(dataToItems)

      }

    }

    request();

  }, [owm])

  return (
    <ThemeProvider theme={theme}>
      <DrawerAppBar />
      <Toolbar />
      <CssBaseline />
      <Grid
        container
        spacing={{ xs: 2, md: 5 }}
        justifyContent="center"
      >

        {/* Indicadores */}
        <Element name="informacion">
          <section>
            <Grid container spacing={5}>
              {
                indicators
                  .map(
                    (indicator, idx) => (
                      <Grid key={idx}
                        // size={{ xs: 12, md: 6 }}
                        size="auto"
                      >
                        <IndicatorWeather
                          title={indicator["title"]}
                          subtitle={indicator["subtitle"]}
                          value={indicator["value"]}
                          icon={indicator.icon}
                        />
                      </Grid>
                    )
                  )
              }
            </Grid>
          </section>
        </Element>

        <Element name='grafico'>
          <section>
            <Grid container spacing={5} justifyContent="center">
              <Element name="controls">
                <ControlWeather selectedVariable={selectedVariable} setSelectedVariable={setSelectedVariable} />
              </Element>
              <Element name="chart">
                <LineChartWeather selectedVariable={selectedVariable} itemsIn={items} />
              </Element>
            </Grid>
          </section>
        </Element>

        {/* Gráfico
        <Element name="grafico">
          <section>
            <Grid container spacing={5}>
              <Grid
                // size={{ xs: 12, md: 12 }}
                size="auto"
              >
                <LineChartWeather itemsIn={items} />
              </Grid>
            </Grid>
          </section>
        </Element> */}

        {/* Tabla */}
        <Element name="historial">
          <section>
            <Grid container spacing={5}>
              {/* <Grid size={{ xs: 12, md: 12 }}> */}
              {/* Grid Anidado */}
              {/* <Grid container spacing={2}> */}
              {/* <Grid size={{ xs: 12, md: 3 }}>
                    <ControlWeather />
                  </Grid> */}
              <Grid size={{ xs: 12, md: 12 }}>
                <TableWeather itemsIn={items} />
              </Grid>
              {/* </Grid> */}
              {/* </Grid> */}
            </Grid>
          </section>
        </Element>



      </Grid>
    </ThemeProvider>
  )
}

export default App
