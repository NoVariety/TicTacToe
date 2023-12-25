import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"

import Cell from "../cell/cell"
import { cellTypes } from "../../data.consts"
import { boardGridSX } from "./boardStyle"
import { Container } from "@mui/material"

type Props = {
  board: cellTypes[][]
  boardLength: number
  playTurn: Function
}

export default function Board({ board, boardLength, playTurn }: Props) {
  return (
    <Grid container item sx={boardGridSX}>
      {board.map((row, rowIndex) => (
        <Box gridRow="span 3">
          {row.map((cell, colIndex) => (
            <Cell
              sign={row[colIndex]}
              index={colIndex}
              boardLength={boardLength}
              playTurn={() => playTurn(rowIndex, colIndex)}
            />
          ))}
        </Box>
      ))}
    </Grid>
  )
}
