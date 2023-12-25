import Grid from "@mui/material/Grid"

import { cellTypes } from "../../data.consts"
import { Container, Typography } from "@mui/material"
import { getBoardCellSX, getSignSX } from "./cellStyle"

type Props = {
  index: number
  sign: cellTypes
  boardLength: number
  playTurn: () => void
}

export default function Cell({ index, sign, boardLength, playTurn }: Props) {
  return (
    <Grid item xs={0} sm={4} md={1} key={index}>
      <Container onClick={playTurn} sx={{ ...getBoardCellSX(boardLength) }}>
        <Typography variant="h1" sx={{ ...getSignSX(boardLength) }}>
          {sign}
        </Typography>
      </Container>
    </Grid>
  )
}
