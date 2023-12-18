import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"

import Cell from "../cell/cell"
import { cellTypes } from "../../data.consts"

type Props = {
  board: cellTypes[][]
  playTurn: Function
}

//! change props - split them instead of using props.something
function Board(props: Props) {
  return (
    <Grid
      container
      item
      //! move sx into a dedicated file
      sx={{ alignItems: "center", justifyContent: "center" }}
    >
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
