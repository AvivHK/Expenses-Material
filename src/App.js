import React from 'react';
import { Typography, Container, Box, Switch } from '@material-ui/core';
import Tabs from "./Tabs"
import AddButton from "./Components/AddButton"
import { observer, inject } from 'mobx-react';
import { ThemeProvider } from '@material-ui/core/styles';
import darkTheme from "./Styles/DarkTheme"
import lightTheme from "./Styles/LightTheme"
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline"
import PieChart from "./Components/Charts/PieChart"
import HttpsRedirect from 'react-https-redirect';

const App = inject("generalStore")(
  observer((props) => {

    const handleChange = (event) => {
      props.generalStore.toggleLightMode(event.target.checked)
    }
    const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
    props.generalStore.getData()


    return (
      <StylesProvider jss={jss}>
        <ThemeProvider theme={props.generalStore.lightMode ? darkTheme : lightTheme}>
          <HttpsRedirect>
            <CssBaseline />
            <Container maxWidth="sm">
              <Box mt={3}>
                <Typography align="right" variant="h3" gutterBottom>
                  ExpensesApp
      </Typography>
              </Box>
              <Tabs />
              <Box mb={1} mt={1}>
                <AddButton className="buttonStatic" />
              </Box>
              <PieChart />
              <Switch onChange={handleChange}
                checked={props.generalStore.lightMode} />
            </Container>
          </HttpsRedirect>
        </ThemeProvider>
      </StylesProvider>
    );
  })
)


export default App;

