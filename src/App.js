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

const App = inject("generalStore")(
  observer((props) => {

    const handleChange = (event) => {
      props.generalStore.toggleLightMode(event.target.checked)
    }
    const jss = create({ plugins: [...jssPreset().plugins, rtl()] });


    return (
      <StylesProvider jss={jss}>
        <ThemeProvider theme={props.generalStore.lightMode ? darkTheme : lightTheme}>
          <CssBaseline />
          <Container maxWidth="sm">
            <Box mt={3}>
              <Typography variant="h3" gutterBottom>
                אביב
      </Typography>
            </Box>
            <Tabs />
            <AddButton className="buttonStatic" />
            <Switch onChange={handleChange}
              checked={props.generalStore.lightMode} />
          </Container>
        </ThemeProvider>
      </StylesProvider>
    );
  })
)


export default App;

