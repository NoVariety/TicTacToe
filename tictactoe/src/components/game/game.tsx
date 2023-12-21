import { useState, useEffect } from "react"

import { gameHintsSX, gridCenterSX } from "./gameStyle"

import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

import Board from "../board/board"
import GameAlterPanel from "../gameAlterPanel/gameAlterPanel"
import WaitingScreen from "../waitingScreen/waitingScreen"

import {
  cellTypes,
  legalMoves,
  gameStateMessages,
  gifWaitingTimeMillis,
} from "../../data.consts"

import {
  getRandomPlayerSign,
  getRandomHint,
  createEmptyBoard,
  isBoardFull,
  createLegalMoves,
  getRandomCoordinateObject,
  checkRowsCols,
  checkSlashes,
  isGameStillOngoing,
} from "../../utils/gameUtils"

type props = {
  boardLength: number
  waitingTime: gifWaitingTimeMillis
}

export default function Game({ boardLength, waitingTime }: props) {
  const [playerSign, setPlayerSign] = useState<cellTypes>(getRandomPlayerSign())
  const [hintsText, setHintsText] = useState<string>(getRandomHint())
  const [gameStateMessage, setGameStateMessage] = useState<gameStateMessages>(
    gameStateMessages.GAME_ONGOING
  )
  const [board, setBoard] = useState<cellTypes[][]>(
    createEmptyBoard(boardLength)
  )

  let tempBoard: cellTypes[][] = board.map((arr) => arr.slice())

  const [newGameToggle, setNewGameToggle] = useState<boolean>(false)

  useEffect(() => {
    function doFirstComputerPlay(): void {
      if (playerSign !== cellTypes.FIRST_PLAYER) {
        const moves: legalMoves = getRandomCoordinateObject(legalMoves)
        changeCell(moves.row, moves.col, cellTypes.FIRST_PLAYER)
      }
    }

    doFirstComputerPlay()
  }, [newGameToggle])

  const [legalMoves, setLegalMoves] = useState<Array<legalMoves>>(
    createLegalMoves(boardLength)
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

  function removeFromLegalMoves(move: legalMoves): void {
    setLegalMoves((prev) =>
      prev.filter(
        (legalMove) => legalMove.col !== move.col || legalMove.row !== move.row
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
      if (waitingTime !== gifWaitingTimeMillis.off && legalMoves.length !== 1) {
        setPauseScreenOpen(true)

        setTimeout(() => {
          changeCell(moves.row, moves.col, computerSign)

          setPauseScreenOpen(false)
        }, waitingTime)
      } else {
        changeCell(moves.row, moves.col, computerSign)
      }
    }
  }

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

  const [pauseScreenOpen, setPauseScreenOpen] = useState(false)

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

  function isThereAWinner(): boolean {
    const isGameWon: boolean =
      checkSlashes(boardLength, tempBoard, setWinnerMessage) ||
      checkRowsCols(boardLength, tempBoard, setWinnerMessage)
    if (!isGameWon && isBoardFull(legalMoves)) {
      setGameStateMessage(gameStateMessages.DRAW_MESSAGE)
    }

    return isGameWon
  }

  useEffect(() => {
    const MINIMUM_MOVES_REQUIRED_TO_WIN: number = boardLength * 2 - 1

    if (movesMade.length >= MINIMUM_MOVES_REQUIRED_TO_WIN) {
      isThereAWinner()
    }
  }, [board])

  const [currentTurnSign, setCurrentTurnSign] = useState<cellTypes>(
    cellTypes.EMPTY
  )

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

  function startNewGame(): void {
    handleGameStatePauseClose()
    setHintsText(getRandomHint())
    setGameStateMessage(gameStateMessages.GAME_ONGOING)

    setBoard(createEmptyBoard(boardLength))
    tempBoard = board.map((arr) => arr.slice())

    setLegalMoves(createLegalMoves(boardLength))
    setMovesMade([])

    setPlayerSign(getRandomPlayerSign())
    setNewGameToggle((prev) => !prev)
  }

  function popFromMovesMade(): legalMoves {
    const move: legalMoves = movesMade[movesMade.length - 1]
    setMovesMade((prev) =>
      prev.filter(
        (moveMade) => moveMade.col !== move.col || moveMade.row !== move.row
      )
    )
    return move
  }

  function rewindTurn(): void {
    const move: legalMoves = popFromMovesMade()
    setLegalMoves((prev) => [...prev, move])

    const rewoundTurnSign = tempBoard[move.row][move.col]
    setCurrentTurnSign(rewoundTurnSign)

    tempBoard[move.row][move.col] = cellTypes.EMPTY
    setBoard(tempBoard)

    if (rewoundTurnSign !== playerSign) {
      setRewindPauseOpen(true)
    }
  }

  return (
    <Container>
      <Grid container sx={gridCenterSX}>
        <Typography variant="h2" sx={gameHintsSX}>
          {hintsText}
        </Typography>
      </Grid>

      <Board board={board} playTurn={playTurn} />

      <GameAlterPanel
        movesMade={movesMade}
        gameStateMessage={gameStateMessage}
        rewindPauseOpen={rewindPauseOpen}
        gameStatePauseOpen={gameStatePauseOpen}
        startNewGame={startNewGame}
        handleRewindPauseClose={handleRewindPauseClose}
        handleGameStatePauseClose={handleGameStatePauseClose}
        rewindTurn={rewindTurn}
      />

      <WaitingScreen open={pauseScreenOpen} waitingTime={waitingTime} />
    </Container>
  )
}
