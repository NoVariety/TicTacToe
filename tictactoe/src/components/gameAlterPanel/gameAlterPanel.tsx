import {
  newGameButtonSX,
  rewindButtonSX,
  actionButtonsGridSX,
  newGameContainerSX,
  getGameStateProps,
  getRewindDisabledProps,
} from "./gameAlterPanelStyle"

import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import { SxProps } from "@mui/material"

import RewindPause from "../rewindPause/rewindPause"
import GameStatePause from "../gameStatePause/gameStatePause"

import { gameStateMessages, legalMoves } from "../../data.consts"
import { toggleOffRewind } from "../../utils/gameAlterPanelUtils"

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
              sx={
                {
                  ...rewindButtonSX,
                  ...getRewindDisabledProps(
                    gameStatePauseOpen,
                    rewindPauseOpen,
                    movesMade.length
                  ),
                } as SxProps
              }
            ></Button>
          </Container>

          <Container
            disableGutters
            sx={
              {
                ...newGameContainerSX,
                ...getGameStateProps(gameStatePauseOpen),
              } as SxProps
            }
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
