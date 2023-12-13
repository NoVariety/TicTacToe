import { useState, useEffect } from "react"

import "./game.css"
import { gameHintsSX } from "./gameStyle"

import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import Board from "../board/board"
import Typography from "@mui/material/Typography"

import { cellTypes, BOARD_LENGTH } from "../../data.consts"
import {
  getRandomPlayerSign,
  getRandomCoordinate,
  getRandomHint,
  createEmptyBoard,
  isBoardFull,
} from "../../utils/gameUtils"

enum gameStateMessages {
  WIN_MESSAGE = "YOU WIN!",
  DRAW_MESSAGE = "IT'S A DRAW!",
  LOSS_MESSAGE = "YOU LOSE!",
}

//! fix bug in which drawing the game as X causes an infinite loop before last turn

function Game() {
  const [playerSign, setPlayerSign] = useState<cellTypes>(getRandomPlayerSign())
  const [hintsText, setHintsText] = useState<string>(getRandomHint())
  const [board, setBoard] = useState<cellTypes[][]>(createEmptyBoard())

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

  //****************************************************************************/ rennovate as a bulk => from here
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
    //* IDEA:
    //? make an indexes array the size of the board
    //? for example: [{x: 0,y: 0}, {x: 1,y: 0}, {x: 2,y: 0}... {x: 2,y: 2}...].
    //? each time get random number between 0 and indexes array -1 to get a random indexes object
    //? after taking an indexes object out, remove it from the array
    //? on player turn, search the object matching the indexes of the play and remove it
    //? this way while is unnecessary as is isComputerTurn and it will work much faster on bigger boards
    while (isComputerTurn) {
      rowIndex = getRandomCoordinate()
      colIndex = getRandomCoordinate()
      sign = changeSign(tempBoard[rowIndex][colIndex], computerSign)
    }

    changeCell(rowIndex, colIndex, sign)
  }
  //****************************************************************************/                 => to here

  function setWinnerMessage(winnerSign: cellTypes): void {
    setHintsText(
      winnerSign === playerSign
        ? gameStateMessages.WIN_MESSAGE
        : gameStateMessages.LOSS_MESSAGE
    )
  }

  function playTurn(rowIndex: number, colIndex: number): void {
    if (!isBoardFull(board) && !isThereAWinner()) {
      if (tempBoard[rowIndex][colIndex] !== cellTypes.EMPTY) {
        setHintsText("⚠ THIS CELL IS FULL, TRY ANOTHER ONE ⚠︎")
      } else {
        setHintsText(getRandomHint())

        changeCell(rowIndex, colIndex, playerSign)

        isComputerTurn = true //! try making it a state

        if (!isBoardFull(board) && !isThereAWinner()) {
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
    if (!isGameWon && isBoardFull(board)) {
      setHintsText(gameStateMessages.DRAW_MESSAGE)
    }

    return isGameWon
  }

  useEffect(() => {
    //! check if the minimum possible moves for a win were made
    //* how? when i do the array of free cells,
    //* check (board lengh * board length) - array length to see num of moves made
    isThereAWinner()
  }, [board])

  // TODO:
  // ? make winning cooler

  function startNewGame(): void {
    setHintsText(getRandomHint())

    setBoard(createEmptyBoard())
    tempBoard = board.map((arr) => arr.slice())

    let tempPlayerSign = getRandomPlayerSign()
    isComputerTurn = tempPlayerSign !== cellTypes.FIRST_PLAYER

    setPlayerSign(tempPlayerSign)
    setNewGameToggle((prev) => !prev)
  }

  return (
    <Container className="board">
      <Container className="board-main">
        <Grid container justifyContent="center">
          <Typography variant="h2" sx={gameHintsSX}>
            {hintsText}
          </Typography>
        </Grid>

        <Board board={board} playTurn={playTurn} />

        <Grid container justifyContent="center">
          <button className="new-game-button" onClick={startNewGame}>
            NEW GAME
          </button>
        </Grid>
      </Container>
    </Container>
  )
}

export default Game
