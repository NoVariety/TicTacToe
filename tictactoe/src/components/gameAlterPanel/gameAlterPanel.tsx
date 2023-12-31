import {
  newGameButtonSX,
  actionButtonsGridSX,
  getGameStateProps,
  getRewindDisabledProps,
} from "./gameAlterPanelStyle"

import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"

import RewindPause from "../rewindPause/rewindPause"
import GameStatePause from "../gameStatePause/gameStatePause"

import { gameStateMessages, legalMoves } from "../../data.consts"
import { isGameStillOngoing } from "../../utils/gameUtils"

type Props = {
  movesMade: Array<legalMoves>
  gameStateMessage: gameStateMessages
  rewindPauseOpen: boolean
  gameStatePauseOpen: boolean
  startNewGame: () => void
  handleRewindPauseClose: () => void
  handleGameStatePauseClose: () => void
  rewindTurn: () => void
}

export default function GameAlterPanel({
  movesMade,
  gameStateMessage,
  rewindPauseOpen,
  gameStatePauseOpen,
  startNewGame,
  handleRewindPauseClose,
  handleGameStatePauseClose,
  rewindTurn,
}: Props) {
  function toggleOffRewind(
    movesMadeLengh: number,
    gameStateMessage: gameStateMessages
  ): boolean {
    return movesMadeLengh <= 0 || isGameStillOngoing(gameStateMessage)
  }

  return (
    <Container>
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

      <Grid container sx={actionButtonsGridSX}>
        <Stack direction="row">
          <Container disableGutters>
            <Button
              disabled={toggleOffRewind(movesMade.length, gameStateMessage)}
              onClick={rewindTurn}
              sx={{
                ...getRewindDisabledProps(
                  gameStatePauseOpen,
                  rewindPauseOpen,
                  movesMade.length
                ),
              }}
            ></Button>
          </Container>

          <Container
            disableGutters
            sx={{ ...getGameStateProps(gameStatePauseOpen) }}
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
