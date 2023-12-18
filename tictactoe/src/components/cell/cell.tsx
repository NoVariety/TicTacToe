import Grid from "@mui/material/Grid"

import { cellTypes } from "../../data.consts"
import { Container, Typography } from "@mui/material"
import { boardCellSX, signSX } from "./cellStyle"

type Props = {
  index: number
  sign: cellTypes
  playTurn: () => void
}

//! change props - split them instead of using props.something
function Cell(props: Props) {
  return (
    <Grid item xs={0} sm={4} md={1} key={props.index}>
      <Container onClick={props.playTurn} sx={boardCellSX}>
        <Typography variant="h1" sx={signSX}>
          {props.sign}
        </Typography>
      </Container>
    </Grid>
  )
}

export default Cell
