import { appTitleSX, appGridSX, appSX } from "./AppStyle"

import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

import Game from "./components/game/game"
import { Container } from "@mui/material"

function App() {
  return (
    <Container sx={appSX}>
      <Grid container sx={appGridSX}>
        <Typography variant="h2" sx={appTitleSX}>
          Tic Tac Toe
        </Typography>
      </Grid>
      <Game />
    </Container>
  )
}

export default App
