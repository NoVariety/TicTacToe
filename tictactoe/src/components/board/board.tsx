import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"

import Cell from "../cell/cell"
import { cellTypes } from "../../data.consts"

type Props = {
  board: cellTypes[][]
  playTurn: Function
}

function Board(props: Props) {
  return (
    <Grid container item justifyContent="center" alignItems="center">
      {props.board.map((row, rowIndex) => (
        <Box gridRow="span 3">
          {row.map((cell, colIndex) => (
            <Cell
              sign={row[colIndex]}
              index={colIndex}
              playTurn={() => props.playTurn(rowIndex, colIndex)}
            />
          ))}
        </Box>
      ))}
    </Grid>
  )
}

export default Board
