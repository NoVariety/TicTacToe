import { useState, useEffect } from "react"

import { gameHintsSX, newGameButtonSX, rewindButtonSX } from "./gameStyle"

import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

import Board from "../board/board"

import { cellTypes, legalMovesObj } from "../../data.consts"
import {
  getRandomPlayerSign,
  getRandomHint,
  createEmptyBoard,
  isBoardFull,
  createLegalMoves,
  getRandomCoordinateObject,
} from "../../utils/gameUtils"

enum gameStateMessages {
  WIN_MESSAGE = "YOU WIN!",
  DRAW_MESSAGE = "IT'S A DRAW!",
  LOSS_MESSAGE = "YOU LOSE!",
}

function Game() {
  const BOARD_LENGTH: number = 3

  const [playerSign, setPlayerSign] = useState<cellTypes>(getRandomPlayerSign())
  const [hintsText, setHintsText] = useState<string>(getRandomHint())
  const [board, setBoard] = useState<cellTypes[][]>(
    createEmptyBoard(BOARD_LENGTH)
  )

  let tempBoard: cellTypes[][] = board.map((arr) => arr.slice())

  const [newGameToggle, setNewGameToggle] = useState<boolean>(false)

  useEffect(() => {
    function doFirstComputerPlay(): void {
      if (playerSign !== cellTypes.FIRST_PLAYER) {
        computerTurn()
      }
    }

    doFirstComputerPlay()
  }, [newGameToggle])

  const [legalMoves, setLegalMoves] = useState<Array<legalMovesObj>>(
    createLegalMoves(BOARD_LENGTH)
  )
  const [movesMade, setMovesMade] = useState<Array<legalMovesObj>>([])

  function changeCell(
    rowIndex: number,
    colIndex: number,
    playSign: cellTypes
  ): void {
    const moveObj: legalMovesObj = { row: rowIndex, col: colIndex }

    removeFromLegalMoves(moveObj)
    setMovesMade((prev) => [...prev, moveObj])

    tempBoard[rowIndex][colIndex] = playSign
    setBoard(tempBoard)
  }

  function removeFromLegalMoves(movesObj: legalMovesObj): void {
    setLegalMoves((prev) =>
      prev.filter(
        (move) => move.col !== movesObj.col || move.row !== movesObj.row
      )
    )
  }

  const [computerTurnToggle, setComputerTurnToggle] = useState<boolean>(
    playerSign !== cellTypes.FIRST_PLAYER
  )

  function computerTurn(): void {
    const computerSign: cellTypes =
      playerSign === cellTypes.FIRST_PLAYER
        ? cellTypes.SECOND_PLAYER
        : cellTypes.FIRST_PLAYER
    const movesObj: legalMovesObj = getRandomCoordinateObject(legalMoves)

    if (legalMoves.length > 0) {
      changeCell(movesObj.row, movesObj.col, computerSign)
    }
  }

  function setWinnerMessage(winnerSign: cellTypes): void {
    setHintsText(
      winnerSign === playerSign
        ? gameStateMessages.WIN_MESSAGE
        : gameStateMessages.LOSS_MESSAGE
    )
  }

  const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
  useEffect(() => {
    if (!isFirstRender) {
      computerTurn()
    } else {
      setIsFirstRender(false)
    }
  }, [computerTurnToggle])

  function playTurn(rowIndex: number, colIndex: number): void {
    if (!isBoardFull(board) && !isThereAWinner()) {
      if (tempBoard[rowIndex][colIndex] !== cellTypes.EMPTY) {
        setHintsText("⚠ THIS CELL IS FULL, TRY ANOTHER ONE ⚠︎")
      } else {
        setHintsText(getRandomHint())

        changeCell(rowIndex, colIndex, playerSign)

        if (!isBoardFull(board) && !isThereAWinner()) {
          setComputerTurnToggle((prev) => !prev)
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
    const isGameWon: boolean = checkSlashes() || checkRowsCols()
    if (!isGameWon && isBoardFull(board)) {
      setHintsText(gameStateMessages.DRAW_MESSAGE)
    }

    return isGameWon
  }

  function calculateTotalMovesMade(): number {
    return BOARD_LENGTH * BOARD_LENGTH - legalMoves.length
  }

  useEffect(() => {
    const MINIMUM_MOVES_REQUIRED_TO_WIN: number = BOARD_LENGTH * 2 - 1

    if (calculateTotalMovesMade() >= MINIMUM_MOVES_REQUIRED_TO_WIN) {
      isThereAWinner()
    }
  }, [board])

  function startNewGame(): void {
    setHintsText(getRandomHint())

    setBoard(createEmptyBoard(BOARD_LENGTH))
    tempBoard = board.map((arr) => arr.slice())

    setLegalMoves(createLegalMoves(BOARD_LENGTH))
    setMovesMade([])

    setPlayerSign(getRandomPlayerSign())
    setNewGameToggle((prev) => !prev)
  }

  function popMovesMade(): legalMovesObj {
    const moveObj: legalMovesObj = movesMade[movesMade.length - 1]
    setMovesMade((prev) =>
      prev.filter(
        (move) => move.col !== moveObj.col || move.row !== moveObj.row
      )
    )
    return moveObj
  }

  function rewindTurn(): void {
    const moveObj: legalMovesObj = popMovesMade()
    setLegalMoves((prev) => [...prev, moveObj])

    tempBoard[moveObj.row][moveObj.col] = cellTypes.EMPTY
    setBoard(tempBoard)
  }

  function toggleOffRewind(): boolean {
    return (
      !(movesMade.length > 0) ||
      hintsText === gameStateMessages.DRAW_MESSAGE ||
      hintsText === gameStateMessages.WIN_MESSAGE ||
      hintsText === gameStateMessages.LOSS_MESSAGE
    )
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

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            disabled={toggleOffRewind()}
            onClick={rewindTurn}
            sx={rewindButtonSX}
          ></Button>

          <Button onClick={startNewGame} sx={newGameButtonSX}>
            NEW GAME
          </Button>
        </Grid>
      </Container>
    </Container>
  )
}

export default Game
