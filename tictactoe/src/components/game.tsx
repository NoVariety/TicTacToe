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
      setComputerTurnFlag(false)
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
          return rIndex === rowIndex && cIndex === colIndex
            ? changeSign(prevCell, playSign)
            : prevCell
        })
      })
    })
  }

  const [drawCounter, setDrawCounter] = React.useState<number>(0)
  const [computerTurnFlag, setComputerTurnFlag] = React.useState<boolean>(
    playerSign === cellTypes.FIRST_PLAYER ? false : true
  )

  // React.useEffect(() => {
  function computerTurn(): void {
    const computerSign: cellTypes =
      playerSign === cellTypes.FIRST_PLAYER
        ? cellTypes.SECOND_PLAYER
        : cellTypes.FIRST_PLAYER
    let rowIndex: number = getRandomCoordinate()
    let colIndex: number = getRandomCoordinate()
    let sign: cellTypes = cellTypes.EMPTY

    console.log(computerTurnFlag)
    while (computerTurnFlag && drawCounter < MAX_TURNS) {
      rowIndex = getRandomCoordinate()
      colIndex = getRandomCoordinate()
      sign = changeSign(board[rowIndex][colIndex], computerSign)
      console.log("x")
    }

    changeCell(rowIndex, colIndex, sign)
  }

  computerTurn()
  // }, [computerTurnFlag])

  function playTurn(rowIndex: number, colIndex: number): void {
    setHintsText(getRandomHint()) //change

    changeCell(rowIndex, colIndex, playerSign)
    setComputerTurnFlag(true)
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
