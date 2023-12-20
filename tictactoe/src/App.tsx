import { appTitleSX, bottomTextSX, appGridSX, appSX } from "./AppStyle"

import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"

import Game from "./components/game/game"
import Config from "./components/config/config"

function App() {
  return (
    <Container sx={appSX}>
      <Grid container sx={appGridSX}>
        <Typography variant="h2" sx={appTitleSX}>
          Tic Tac Toe
        </Typography>
      </Grid>
      <Game />
      <Config />
      <Typography variant="body1" sx={bottomTextSX}>
        nova corp. © no rights reserved
      </Typography>
    </Container>
  )
}

export default App
