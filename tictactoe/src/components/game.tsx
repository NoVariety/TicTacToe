import React from "react"
import "./game.css"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"

import Cell from "./cell"

import { cellTypes, hintTextOptions } from "../data"

enum gameStateMessages {
  WIN_MESSAGE = "YOU WIN!",
  DRAW_MESSAGE = "IT'S A DRAW!",
  LOSS_MESSAGE = "YOU LOSE!",
}

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

  const [board, setBoard] = React.useState<cellTypes[][]>(initializeBoard())

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

  const [, forceUpdate] = React.useReducer((x) => x + 1, 0)

  React.useEffect(() => {
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
    for (let rowIndex: number = 0; rowIndex < BOARD_LENGTH; rowIndex++) {
      for (let colIndex: number = 0; colIndex < BOARD_LENGTH; colIndex++) {
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

    while (computerTurnFlag) {
      rowIndex = getRandomCoordinate()
      colIndex = getRandomCoordinate()
      sign = changeSign(tempBoard[rowIndex][colIndex], computerSign)
    }

    changeCell(rowIndex, colIndex, sign)
  }

  function setWinnerMessage(winnerSign: cellTypes): void {
    setHintsText(
      winnerSign === playerSign
        ? gameStateMessages.WIN_MESSAGE
        : gameStateMessages.LOSS_MESSAGE
    )
  }

  function playTurn(rowIndex: number, colIndex: number): void {
    if (!isBoardFull() && !isThereAWinner()) {
      if (tempBoard[rowIndex][colIndex] !== cellTypes.EMPTY) {
        setHintsText("⚠ THIS CELL IS FULL, TRY ANOTHER ONE ⚠︎")
      } else {
        setHintsText(getRandomHint())

        changeCell(rowIndex, colIndex, playerSign)

        computerTurnFlag = true

        //TODO: also check if game not won
        if (!isBoardFull() && !isThereAWinner()) {
          computerTurn()
        }
      }
    }
    // } else {
    //   checkWinner()
    // }
  }

  function checkRowsCols(): boolean {
    let countSameRowSign: number = 0
    let countSameColSign: number = 0

    for (
      let initialIndex: number = 0;
      initialIndex < BOARD_LENGTH;
      initialIndex++
    ) {
      let runIndex: number = 0

      const rowSign: cellTypes = tempBoard[initialIndex][runIndex]
      const colSign: cellTypes = tempBoard[runIndex][initialIndex]

      for (; runIndex < BOARD_LENGTH; runIndex++) {
        if (
          tempBoard[initialIndex][runIndex] === rowSign &&
          rowSign !== cellTypes.EMPTY
        ) {
          countSameRowSign++
        }
        if (
          tempBoard[runIndex][initialIndex] === colSign &&
          colSign !== cellTypes.EMPTY
        ) {
          countSameColSign++
        }
      }

      if (countSameRowSign === BOARD_LENGTH) {
        setWinnerMessage(rowSign)
        return true
      } else if (countSameColSign === BOARD_LENGTH) {
        setWinnerMessage(colSign)
        return true
      }

      countSameRowSign = 0
      countSameColSign = 0
    }

    return false
  }

  function checkSlashes(): boolean {
    let countSlashSign: number = 0
    let countReverseSlashSign: number = 0

    const slashSign: cellTypes = board[0][BOARD_LENGTH - 1]
    const reverseSlashSign: cellTypes = board[BOARD_LENGTH - 1][0]

    let reverseIndex: number = BOARD_LENGTH

    for (
      let rowColIndex: number = 0;
      rowColIndex < BOARD_LENGTH;
      rowColIndex++
    ) {
      if (
        board[rowColIndex][rowColIndex] === slashSign &&
        slashSign !== cellTypes.EMPTY
      ) {
        countSlashSign++
      }
      if (
        board[rowColIndex][reverseIndex] === reverseSlashSign &&
        reverseSlashSign !== cellTypes.EMPTY
      ) {
        countReverseSlashSign++
      }
      reverseIndex--
    }

    if (countSlashSign === BOARD_LENGTH) {
      setWinnerMessage(slashSign)
      return true
    } else if (countReverseSlashSign === BOARD_LENGTH) {
      setWinnerMessage(reverseSlashSign)
      return true
    }

    return false
  }

  function isThereAWinner(): boolean {
    let isGameWon: boolean = checkRowsCols() || checkSlashes()
    if (isBoardFull() && !isGameWon) {
      setHintsText(gameStateMessages.DRAW_MESSAGE)
    }

    return isGameWon
  }

  React.useEffect(() => {
    isThereAWinner()
  }, [board])

  function getRandomCoordinate(): number {
    return Math.floor(Math.random() * (BOARD_LENGTH - 0))
  }

  // TODO:
  // * fix winner in cross
  // ? make winning cooler
  // ? disable new game button unless game can't progress

  function newGame(): void {
    setBoard(initializeBoard())
  }

  return (
    <div className="board">
      <main className="board-main">
        <Grid container justifyContent="center">
          <h2 className="game-hints">{hintsText}</h2>
        </Grid>

        {mapBoard()}

        <Grid container justifyContent="center">
          <button className="replay-button" onClick={newGame}>
            NEW GAME
          </button>
        </Grid>
      </main>
    </div>
  )
}

export default Game
