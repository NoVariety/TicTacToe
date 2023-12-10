import React from "react"
import "./game.css"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"

import Cell from "./cell"

import { cellTypes, hintTextOptions } from "../data"

function Game() {
  const BOARD_LENGTH: number = 3

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

  let computerTurnFlag: boolean =
    playerSign === cellTypes.FIRST_PLAYER ? false : true

  let tempBoard: cellTypes[][] = board.map((arr) => {
    return arr.slice()
  })

  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0)

  React.useEffect(() => {
    console.log(computerTurnFlag)
    if (computerTurnFlag) {
      computerTurnFlag = false

      tempBoard[getRandomCoordinate()][getRandomCoordinate()] =
        cellTypes.FIRST_PLAYER
      setBoard(tempBoard)
    }
    forceUpdate()
  }, [])

  function changeSign(cellSign: cellTypes, playSign: cellTypes): cellTypes {
    if (cellSign === cellTypes.EMPTY) {
      computerTurnFlag = false

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
    tempBoard[rowIndex][colIndex] = playSign
    setBoard(tempBoard)
    mapBoard()
  }

  function isBoardFull(): boolean {
    for (let rowIndex = 0; rowIndex < BOARD_LENGTH; rowIndex++) {
      for (let colIndex = 0; colIndex < BOARD_LENGTH; colIndex++) {
        if (tempBoard[rowIndex][colIndex] === cellTypes.EMPTY) {
          return false
        }
      }
    }

    return true
  }

  function computerTurn(): void {
    const computerSign: cellTypes =
      playerSign === cellTypes.FIRST_PLAYER
        ? cellTypes.SECOND_PLAYER
        : cellTypes.FIRST_PLAYER
    let rowIndex: number = getRandomCoordinate()
    let colIndex: number = getRandomCoordinate()
    let sign: cellTypes = cellTypes.EMPTY

    // TODO: check board if full as a condition for the while
    while (computerTurnFlag) {
      rowIndex = getRandomCoordinate()
      colIndex = getRandomCoordinate()
      sign = changeSign(tempBoard[rowIndex][colIndex], computerSign)
    }

    changeCell(rowIndex, colIndex, sign)
  }

  function playTurn(rowIndex: number, colIndex: number): void {
    if (isBoardFull()) {
      alert("Board is full!") // TODO: change to html element
    } else {
      if (tempBoard[rowIndex][colIndex] !== cellTypes.EMPTY) {
        alert("The cell you clicked is already filled!") // TODO: change to html element
      } else {
        setHintsText(getRandomHint())

        changeCell(rowIndex, colIndex, playerSign)

        computerTurnFlag = true

        if (!isBoardFull()) {
          computerTurn()
        }
      }
    }
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
