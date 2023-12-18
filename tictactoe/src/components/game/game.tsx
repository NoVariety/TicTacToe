import { useState, useEffect } from "react"

import { gameHintsSX, newGameButtonSX, rewindButtonSX } from "./gameStyle"

import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

import Board from "../board/board"
import PauseScreenModal from "../pauseScreen/pauseScreenModal"

import { cellTypes, legalMoves } from "../../data.consts"
import {
  getRandomPlayerSign,
  getRandomHint,
  createEmptyBoard,
  isBoardFull,
  createLegalMoves,
  getRandomCoordinateObject,
} from "../../utils/gameUtils"
import { SxProps } from "@mui/material"

enum gameStateMessages {
  WIN_MESSAGE = "YOU WIN!",
  DRAW_MESSAGE = "IT'S A DRAW!",
  LOSS_MESSAGE = "YOU LOSE!",
}

//! make state messages pop up more

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

  const [legalMoves, setLegalMoves] = useState<Array<legalMoves>>(
    createLegalMoves(BOARD_LENGTH)
  )
  const [movesMade, setMovesMade] = useState<Array<legalMoves>>([])

  function changeCell(
    rowIndex: number,
    colIndex: number,
    playSign: cellTypes
  ): void {
    const move: legalMoves = { row: rowIndex, col: colIndex }

    removeFromLegalMoves(move)
    setMovesMade((prev) => [...prev, move])

    tempBoard[rowIndex][colIndex] = playSign
    setBoard(tempBoard)
  }

  function removeFromLegalMoves(movesObj: legalMoves): void {
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
    const moves: legalMoves = getRandomCoordinateObject(legalMoves)

    if (legalMoves.length > 0) {
      changeCell(moves.row, moves.col, computerSign)
    }
  }

  function setWinnerMessage(winnerSign: cellTypes): void {
    setHintsText(
      winnerSign === playerSign
        ? gameStateMessages.WIN_MESSAGE
        : gameStateMessages.LOSS_MESSAGE
    )
  }

  //! check why i did this and if possible to improve it
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
  useEffect(() => {
    if (!isFirstRender) {
      computerTurn()
    } else {
      setIsFirstRender(false)
    }
  }, [computerTurnToggle])

  function playTurn(rowIndex: number, colIndex: number): void {
    if (!isBoardFull(legalMoves) && !isThereAWinner()) {
      if (tempBoard[rowIndex][colIndex] !== cellTypes.EMPTY) {
        setHintsText("⚠ THIS CELL IS FULL, TRY ANOTHER ONE ⚠︎")
      } else {
        setHintsText(getRandomHint())

        changeCell(rowIndex, colIndex, playerSign)

        if (!isBoardFull(legalMoves) && !isThereAWinner()) {
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
    if (!isGameWon && isBoardFull(legalMoves)) {
      setHintsText(gameStateMessages.DRAW_MESSAGE)
    }

    return isGameWon
  }

  useEffect(() => {
    const MINIMUM_MOVES_REQUIRED_TO_WIN: number = BOARD_LENGTH * 2 - 1

    if (movesMade.length >= MINIMUM_MOVES_REQUIRED_TO_WIN) {
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

  function popFromMovesMade(): legalMoves {
    const moveObj: legalMoves = movesMade[movesMade.length - 1]
    setMovesMade((prev) =>
      prev.filter(
        (move) => move.col !== moveObj.col || move.row !== moveObj.row
      )
    )
    return moveObj
  }

  const [currentTurnSign, setCurrentTurnSign] = useState<cellTypes>(
    cellTypes.EMPTY
  )

  function rewindTurn(): void {
    const moveObj: legalMoves = popFromMovesMade()
    setLegalMoves((prev) => [...prev, moveObj])

    const rewoundTurnSign = tempBoard[moveObj.row][moveObj.col]
    setCurrentTurnSign(rewoundTurnSign)

    tempBoard[moveObj.row][moveObj.col] = cellTypes.EMPTY
    setBoard(tempBoard)

    if (rewoundTurnSign !== playerSign) {
      handlePauseModalOpen()
    }
  }

  const [pauseModalOpen, setPauseModalOpen] = useState(false)
  const handlePauseModalOpen = () => setPauseModalOpen(true)
  const handlePauseModalClose = () => {
    setPauseModalOpen(false)

    if (currentTurnSign !== playerSign && currentTurnSign !== cellTypes.EMPTY) {
      setComputerTurnToggle((prev) => !prev)
    }
  }

  function toggleOffRewind(): boolean {
    return (
      movesMade.length <= 0 ||
      hintsText === gameStateMessages.DRAW_MESSAGE ||
      hintsText === gameStateMessages.WIN_MESSAGE ||
      hintsText === gameStateMessages.LOSS_MESSAGE
    )
  }

  const rewindDisabledProp: SxProps = {
    ...(pauseModalOpen && { filter: "none !important" }),
    ...(pauseModalOpen &&
      movesMade.length >= 1 && {
        outline: "5px dashed #555",
        borderRadius: "4vh",
        outlineColor: "white",
        "&:hover": {
          outlineColor: "transparent",
        },
      }),
  } as const

  return (
    <Container>
      <Grid container justifyContent="center">
        <Typography variant="h2" sx={gameHintsSX}>
          {hintsText}
        </Typography>
      </Grid>

      <Board board={board} playTurn={playTurn} />

      <PauseScreenModal
        open={pauseModalOpen}
        handleClose={handlePauseModalClose}
        showRewindHint={movesMade.length > 0}
      />

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          disabled={toggleOffRewind()}
          onClick={rewindTurn}
          sx={{ ...rewindButtonSX, p: rewindDisabledProp }}
        ></Button>

        <Button onClick={startNewGame} sx={newGameButtonSX}>
          NEW GAME
        </Button>
      </Grid>
    </Container>
  )
}

export default Game
