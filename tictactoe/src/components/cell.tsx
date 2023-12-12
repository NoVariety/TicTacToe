import React from "react"
import "./cell.css"
import Grid from "@mui/material/Grid"

import { cellTypes } from "../data.consts"
//! take props out individually => decided it is better not to as it diffrentiates props from normal params

type Props = {
  index: number
  sign: cellTypes
  playTurn: () => void
}

function Cell(props: Props) {
  //! check if i can switch func to type Function
  return (
    <Grid item xs={0} sm={4} md={1} key={props.index}>
      <div className="board-cell" onClick={props.playTurn}>
        <p className="cell-sign">{props.sign}</p>
      </div>
    </Grid>
  )
}

export default Cell
