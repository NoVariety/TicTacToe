import React from "react"
import "./cell.css"
import Grid from "@mui/material/Grid"

import { cellTypes } from "../data"

function Cell(props: { index: number; sign: cellTypes; playTurn: () => void }) {
  return (
    <Grid item xs={0} sm={4} md={1} key={props.index}>
      <div className="board-cell" onClick={props.playTurn}>
        <p className="cell-sign">{props.sign}</p>
      </div>
    </Grid>
  )
}

export default Cell
