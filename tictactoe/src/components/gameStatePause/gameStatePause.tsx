import PauseScreenModal from "../pauseScreenModal/pauseScreenModal"

import { gameStateMessages } from "../../data.consts"

import { pauseTextSX, pauseSubextSX } from "./gameStatePauseStyle"

type props = {
  open: boolean
  handleClose: () => void
  showRewindHint: boolean
  mainText: gameStateMessages
}

export default function GameStatePause({
  open,
  handleClose,
  showRewindHint,
  mainText,
}: props) {
  return (
    <PauseScreenModal
      open={open}
      handleClose={handleClose}
      showRewindHint={showRewindHint}
      mainText={mainText}
      mainTextStyle={pauseTextSX}
      secondaryText="to start a new game click ^ this"
      secondaryTextStyle={pauseSubextSX}
    />
  )
}
