import { useState, useEffect } from "react"

import {
  gameHintsSX,
  newGameButtonSX,
  rewindButtonSX,
  actionButtonsGridSX,
  gridCenterSX,
  newGameContainerSX,
} from "./gameStyle"

import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { SxProps } from "@mui/material"

import Board from "../board/board"
import RewindPause from "../rewindPause/rewindPause"
import GameStatePause from "../gameStatePause/gameStatePause"

import { cellTypes, legalMoves, gameStateMessages } from "../../data.consts"
import {
  getRandomPlayerSign,
  getRandomHint,
  createEmptyBoard,
  isBoardFull,
  createLegalMoves,
  getRandomCoordinateObject,
  isGameStillOngoing,
} from "../../utils/gameUtils"

function Game() {
  const BOARD_LENGTH: number = 3

  const [playerSign, setPlayerSign] = useState<cellTypes>(getRandomPlayerSign())
  const [hintsText, setHintsText] = useState<string>(getRandomHint())
  const [gameStateMessage, setGameStateMessage] = useState<gameStateMessages>(
    gameStateMessages.GAME_ONGOING
  )
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

  //! move to utils
  function setWinnerMessage(winnerSign: cellTypes): void {
    setGameStateMessage(
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

  //! move to utils
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

  //! move to utils
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

  //! move to utils
  function isThereAWinner(): boolean {
    const isGameWon: boolean = checkSlashes() || checkRowsCols()
    if (!isGameWon && isBoardFull(legalMoves)) {
      setGameStateMessage(gameStateMessages.DRAW_MESSAGE)
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
    handleGameStatePauseClose()
    setHintsText(getRandomHint())
    setGameStateMessage(gameStateMessages.GAME_ONGOING)

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
    //! remove obj from name
    const moveObj: legalMoves = popFromMovesMade()
    setLegalMoves((prev) => [...prev, moveObj])

    const rewoundTurnSign = tempBoard[moveObj.row][moveObj.col]
    setCurrentTurnSign(rewoundTurnSign)

    tempBoard[moveObj.row][moveObj.col] = cellTypes.EMPTY
    setBoard(tempBoard)

    if (rewoundTurnSign !== playerSign) {
      setRewindPauseOpen(true)
    }
  }

  const [rewindPauseOpen, setRewindPauseOpen] = useState(false)
  const handleRewindPauseClose = () => {
    setRewindPauseOpen(false)

    if (currentTurnSign !== playerSign && currentTurnSign !== cellTypes.EMPTY) {
      setComputerTurnToggle((prev) => !prev)
    }
  }

  const [gameStatePauseOpen, setGameStatePauseOpen] = useState(false)
  const handleGameStatePauseClose = () => setGameStatePauseOpen(false)

  useEffect(() => {
    if (isGameStillOngoing(gameStateMessage)) {
      setGameStatePauseOpen(true)
    }
  }, [gameStateMessage])

  function toggleOffRewind(): boolean {
    return movesMade.length <= 0 || isGameStillOngoing(gameStateMessage)
  }

  //! try again to move to style
  const rewindDisabledProp: SxProps = {
    ...(rewindPauseOpen && { filter: "none !important" }),
    ...(gameStatePauseOpen && { filter: "none !important" }),
    ...(rewindPauseOpen &&
      movesMade.length >= 1 && {
        outline: "5px dashed #555",
        borderRadius: "4vh",
        outlineColor: "white",
        transition: "0.2s",

        "&:hover": {
          transition: "0.2s",
          outlineColor: "transparent",
        },
      }),
  } as const

  const gameStateProp: SxProps = {
    ...(gameStatePauseOpen && {
      outline: "5px dashed #555",
      outlineColor: "white",
      zIndex: "100",
      transition: "0.2s",

      "&:hover": {
        transition: "0.2s",
        outlineColor: "transparent",
      },
    }),
  } as const

  return (
    <Container>
      <Grid container sx={gridCenterSX}>
        <Typography variant="h2" sx={gameHintsSX}>
          {hintsText}
        </Typography>
      </Grid>

      <Board board={board} playTurn={playTurn} />

      <RewindPause
        open={rewindPauseOpen}
        handleClose={handleRewindPauseClose}
        showRewindHint={movesMade.length > 0}
      />

      <GameStatePause
        open={gameStatePauseOpen}
        handleClose={handleGameStatePauseClose}
        mainText={gameStateMessage}
      />

      {/* split to another component */}
      <Grid container sx={actionButtonsGridSX}>
        <Stack direction="row">
          <Container disableGutters>
            <Button
              disabled={toggleOffRewind()}
              onClick={rewindTurn}
              sx={{ ...rewindButtonSX, p: rewindDisabledProp }}
            ></Button>
          </Container>

          <Container
            disableGutters
            sx={{ ...newGameContainerSX, p: gameStateProp }}
          >
            <Button onClick={startNewGame} sx={newGameButtonSX}>
              NEW GAME
            </Button>
          </Container>
        </Stack>
      </Grid>
    </Container>
  )
}

export default Game
