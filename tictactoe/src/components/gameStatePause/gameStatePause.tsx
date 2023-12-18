import PauseScreenModal from "../pauseScreenModal/pauseScreenModal"

import { gameStateMessages } from "../../data.consts"

import { pauseTextSX, pauseSubextSX } from "./gameStatePauseStyle"

type props = {
  open: boolean
  handleClose: () => void
  mainText: gameStateMessages
}

export default function GameStatePause({ open, handleClose, mainText }: props) {
  return (
    <PauseScreenModal
      open={open}
      handleClose={handleClose}
      showRewindHint={true}
      mainText={mainText}
      mainTextStyle={pauseTextSX}
      secondaryText="to start a new game click ^ this"
      secondaryTextStyle={pauseSubextSX}
    />
  )
}
