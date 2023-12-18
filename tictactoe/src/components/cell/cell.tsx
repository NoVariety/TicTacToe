import Grid from "@mui/material/Grid"

import { cellTypes } from "../../data.consts"
import { Container, Typography } from "@mui/material"
import { boardCellSX, signSX } from "./cellStyle"

type Props = {
  index: number
  sign: cellTypes
  playTurn: () => void
}

export default function Cell({ index, sign, playTurn }: Props) {
  return (
    <Grid item xs={0} sm={4} md={1} key={index}>
      <Container onClick={playTurn} sx={boardCellSX}>
        <Typography variant="h1" sx={signSX}>
          {sign}
        </Typography>
      </Container>
    </Grid>
  )
}
