import React from "react"
import "./game.css"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"

import Cell from "./cell"

import { cellTypes, hintTextOptions } from "../data"

function Game() {
  const BOARD_LENGTH: number = 3
  const MAX_TURNS: number = BOARD_LENGTH * BOARD_LENGTH

  const [playerSign, setPlayerSign] = React.useState<cellTypes>(
    Math.random() < 0.5 ? cellTypes.FIRST_PLAYER : cellTypes.SECOND_PLAYER
  )

  function getRandomHint(): string {
    const index = Math.floor(Math.random() * hintTextOptions.length)
    return hintTextOptions[index]
  }

  const [hintsText, setHintsText] = React.useState<string>(getRandomHint())

  function initializeBoard(): cellTypes[][] {
    return Array(BOARD_LENGTH)
      .fill(cellTypes.EMPTY)
      .map((row) => new Array(BOARD_LENGTH).fill(cellTypes.EMPTY))
  }

  const [board, setBoard] = React.useState<cellTypes[][]>(
    // [[cellTypes.EMPTY, cellTypes.EMPTY, cellTypes.EMPTY],
    // [cellTypes.EMPTY, cellTypes.FIRST_PLAYER, cellTypes.EMPTY],
    // [cellTypes.EMPTY, cellTypes.EMPTY, cellTypes.EMPTY],]
    initializeBoard()
  )

  function mapBoard(): React.ReactElement {
    return (
      <div>
        <Grid container item justifyContent="center" alignItems="center">
          {board.map((row, rowIndex) => {
            return (
              <Box gridRow="span 3">
                {Array.from(row).map((_, colIndex) => (
                  <Cell
                    sign={row[colIndex]}
                    index={colIndex}
                    playTurn={() => playTurn(rowIndex, colIndex)}
                  />
                ))}
              </Box>
            )
          })}
        </Grid>
      </div>
    )
  }

  function changeSign(cellSign: cellTypes, playSign: cellTypes): cellTypes {
    if (cellSign === cellTypes.EMPTY) {
      computerTurnFlag = false
      setDrawCounter((prevDrawCounter) => prevDrawCounter + 1)

      return playSign
    } else {
      return cellSign
    }
  }

  function changeCell(
    rowIndex: number,
    colIndex: number,
    playSign: cellTypes
  ): void {
    setBoard((prevBoard) => {
      return prevBoard.map((prevRow, rIndex) => {
        return prevRow.map((prevCell, cIndex) => {
          if (rIndex === rowIndex && cIndex === colIndex) {
            console.log("curr turn: " + playSign)
            console.log("rIndex = " + rIndex)
            console.log("rowIndex = " + rowIndex)
            console.log("cIndex = " + cIndex)
            console.log("colIndex = " + colIndex)
            return changeSign(prevCell, playSign)
          }
          return prevCell
          // return rIndex === rowIndex && cIndex === colIndex
          //   ? changeSign(prevCell, playSign)
          //   : prevCell
        })
      })
    })
  }

  const [drawCounter, setDrawCounter] = React.useState<number>(0) // ! remove later if not needed
  let computerTurnFlag: boolean =
    playerSign === cellTypes.FIRST_PLAYER ? false : true

  React.useEffect(() => computerTurn(), [computerTurnFlag])

  function computerTurn(): void {
    const computerSign: cellTypes =
      playerSign === cellTypes.FIRST_PLAYER
        ? cellTypes.SECOND_PLAYER
        : cellTypes.FIRST_PLAYER
    let rowIndex: number = getRandomCoordinate()
    let colIndex: number = getRandomCoordinate()
    let sign: cellTypes = cellTypes.EMPTY

    console.log("+++++++++++++++++++++++++++++++++++++")
    console.log("computer turn is " + computerTurnFlag)
    console.log("draw counter is " + drawCounter)

    // while (computerTurnFlag && drawCounter < MAX_TURNS) {
    // TODO: check board if full as a condition for the while
    while (computerTurnFlag) {
      console.log("----------------------------------")
      rowIndex = getRandomCoordinate()
      colIndex = getRandomCoordinate()
      sign = changeSign(board[rowIndex][colIndex], computerSign)
      console.log("in while, sign is " + sign)
    }

    // console.log("row " + rowIndex)
    // console.log("col " + colIndex)
    // console.log("sign  " + sign)
    // console.log("fs  " + board[rowIndex][colIndex])
    changeCell(rowIndex, colIndex, sign)
  }

  function playTurn(rowIndex: number, colIndex: number): void {
    setHintsText(getRandomHint()) // TODO: change so it makes sense

    changeCell(rowIndex, colIndex, playerSign)
    // setComputerTurnFlag(true)
    computerTurnFlag = true
    console.log(computerTurnFlag)
    computerTurn()
    console.log(computerTurnFlag)

    setDrawCounter((prevDrawCounter) => prevDrawCounter + 1)
  }

  function getRandomCoordinate(): number {
    return Math.floor(Math.random() * (BOARD_LENGTH - 0))
  }

  return (
    <div className="board">
      <main className="board-main">
        <Grid container justifyContent="center">
          <h2 className="game-hints">{hintsText}</h2>
        </Grid>

        {mapBoard()}

        <Grid container justifyContent="center">
          <button className="replay-button">NEW GAME</button>
        </Grid>
      </main>
    </div>
  )
}

export default Game
