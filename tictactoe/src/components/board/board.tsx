import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"

import Cell from "../cell/cell"
import { cellTypes } from "../../data.consts"
import { boardGridSX } from "./boardStyle"

type Props = {
  board: cellTypes[][]
  playTurn: Function
}

export default function Board({ board, playTurn }: Props) {
  return (
    <Grid container item sx={boardGridSX}>
      {board.map((row, rowIndex) => (
        <Box gridRow="span 3">
          {row.map((cell, colIndex) => (
            <Cell
              sign={row[colIndex]}
              index={colIndex}
              playTurn={() => playTurn(rowIndex, colIndex)}
            />
          ))}
        </Box>
      ))}
    </Grid>
  )
}
