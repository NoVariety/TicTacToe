import { useState, ReactElement, useEffect, useReducer } from "react"

import "./game.css"

import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"

import Cell from "./cell"

import { cellTypes, hintTextOptions } from "../data.consts"

//TODO: move all possible css to sx for style tags from MUI

enum gameStateMessages {
  WIN_MESSAGE = "YOU WIN!",
  DRAW_MESSAGE = "IT'S A DRAW!",
  LOSS_MESSAGE = "YOU LOSE!",
}

//! move all non dependent functions to a util func and pass params
//! each component should have a dedicated folder with all of its files

function Game() {
  const BOARD_LENGTH: number = 3

  const [playerSign, setPlayerSign] = useState<cellTypes>(
    Math.random() < 0.5 ? cellTypes.FIRST_PLAYER : cellTypes.SECOND_PLAYER
  )

  function getRandomHint(): string {
    const index = Math.floor(Math.random() * hintTextOptions.length)
    return hintTextOptions[index]
  }

  const [hintsText, setHintsText] = useState<string>(getRandomHint())

  function initializeBoard(): cellTypes[][] {
    return Array(BOARD_LENGTH).fill(
      new Array(BOARD_LENGTH).fill(cellTypes.EMPTY)
    )
  }

  const [board, setBoard] = useState<cellTypes[][]>(initializeBoard())

  //! להפריד את MAPBOARD לקומפוננטה אחרת
  //! לבדוק אם אפשר להעביר את הJUSTIFY CONTENT ETC.. לSTYLE
  //! type sx props
  function mapBoard(): ReactElement {
    return (
      <Grid container item justifyContent="center" alignItems="center">
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

  let isComputerTurn: boolean = playerSign !== cellTypes.FIRST_PLAYER

  let tempBoard: cellTypes[][] = board.map((arr) => arr.slice())

  const [newGameToggle, setNewGameToggle] = useState<boolean>(false)

  useEffect(() => {
    function doFirstComputerPlay(): void {
      if (isComputerTurn) {
        isComputerTurn = false

        tempBoard[getRandomCoordinate()][getRandomCoordinate()] =
          cellTypes.FIRST_PLAYER
        setBoard(tempBoard)
      }
    }

    doFirstComputerPlay()
  }, [newGameToggle])

  function changeSign(cellSign: cellTypes, playSign: cellTypes): cellTypes {
    if (cellSign === cellTypes.EMPTY) {
      isComputerTurn = false

      return playSign
    }
    return cellSign
  }

  function changeCell(
    rowIndex: number,
    colIndex: number,
    playSign: cellTypes
  ): void {
    tempBoard[rowIndex][colIndex] = playSign
    setBoard(tempBoard)
  }

  //! improve complexity
  function isBoardFull(): boolean {
    // for (let rowIndex: number = 0; rowIndex < BOARD_LENGTH; rowIndex++) {
    //   for (let colIndex: number = 0; colIndex < BOARD_LENGTH; colIndex++) {
    //     if (tempBoard[rowIndex][colIndex] === cellTypes.EMPTY) {
    //       return false
    //     }
    //   }
    // }

    // return true
    return board.every((row) => row.every((col) => col !== cellTypes.EMPTY))
  }

  //! useEffect instead of isComputerTurn
  function computerTurn(): void {
    const computerSign: cellTypes =
      playerSign === cellTypes.FIRST_PLAYER
        ? cellTypes.SECOND_PLAYER
        : cellTypes.FIRST_PLAYER
    let rowIndex: number = getRandomCoordinate() //! remove randoms
    let colIndex: number = getRandomCoordinate()
    let sign: cellTypes = cellTypes.EMPTY

    //! make more effcient
    while (isComputerTurn) {
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

        isComputerTurn = true //! try making it a state

        if (!isBoardFull() && !isThereAWinner()) {
          computerTurn()
        }
      }
    }
  }

  function checkRowsCols(): boolean {
    const FIRST_CELL_INDEX: number = 0

    let countSameRowSign: number = 0
    let countSameColSign: number = 0

    for (
      let initialIndex: number = 0;
      initialIndex < BOARD_LENGTH;
      initialIndex++
    ) {
      const rowSign: cellTypes = tempBoard[initialIndex][FIRST_CELL_INDEX]
      const colSign: cellTypes = tempBoard[FIRST_CELL_INDEX][initialIndex]

      for (let runIndex: number = 0; runIndex < BOARD_LENGTH; runIndex++) {
        if (tempBoard[initialIndex][runIndex] === rowSign) {
          countSameRowSign++
        }
        if (tempBoard[runIndex][initialIndex] === colSign) {
          countSameColSign++
        }
      }

      if (countSameRowSign === BOARD_LENGTH && rowSign !== cellTypes.EMPTY) {
        setWinnerMessage(rowSign)
        return true
      }
      if (countSameColSign === BOARD_LENGTH && colSign !== cellTypes.EMPTY) {
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

    const slashSign: cellTypes = tempBoard[0][0]
    const reverseSlashSign: cellTypes = tempBoard[BOARD_LENGTH - 1][0]

    let reverseIndex: number = BOARD_LENGTH - 1

    for (
      let rowColIndex: number = 0;
      rowColIndex < BOARD_LENGTH;
      rowColIndex++
    ) {
      if (tempBoard[rowColIndex][rowColIndex] === slashSign) {
        countSlashSign++
      }
      if (tempBoard[rowColIndex][reverseIndex] === reverseSlashSign) {
        countReverseSlashSign++
      }
      reverseIndex--
    }

    if (countSlashSign === BOARD_LENGTH && slashSign !== cellTypes.EMPTY) {
      setWinnerMessage(slashSign)
      return true
    }
    if (
      countReverseSlashSign === BOARD_LENGTH &&
      reverseSlashSign !== cellTypes.EMPTY
    ) {
      setWinnerMessage(reverseSlashSign)
      return true
    }

    return false
  }

  function isThereAWinner(): boolean {
    const isGameWon: boolean = checkRowsCols() || checkSlashes()
    if (!isGameWon && isBoardFull()) {
      setHintsText(gameStateMessages.DRAW_MESSAGE)
    }

    return isGameWon
  }

  useEffect(() => {
    //! check if the minimum possible moves for a win were made
    isThereAWinner()
  }, [board])

  function getRandomCoordinate(): number {
    return Math.floor(Math.random() * BOARD_LENGTH)
  }

  // TODO:
  // ? make winning cooler
  // ? disable new game button unless game can't progress

  function startNewGame(): void {
    setHintsText(getRandomHint())

    setBoard(initializeBoard())
    tempBoard = board.map((arr) => arr.slice())

    let tempPlayerSign =
      Math.random() < 0.5 ? cellTypes.FIRST_PLAYER : cellTypes.SECOND_PLAYER
    isComputerTurn = tempPlayerSign !== cellTypes.FIRST_PLAYER

    setPlayerSign(tempPlayerSign)
    setNewGameToggle((prev) => !prev)
  }

  return (
    <div className="board">
      <main className="board-main">
        <Grid container justifyContent="center">
          <h2 className="game-hints">{hintsText}</h2>
        </Grid>

        {mapBoard()}

        <Grid container justifyContent="center">
          <button className="replay-button" onClick={startNewGame}>
            NEW GAME
          </button>
        </Grid>
      </main>
    </div>
  )
}

export default Game
