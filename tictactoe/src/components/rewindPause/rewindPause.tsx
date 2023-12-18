import PauseScreenModal from "../pauseScreenModal/pauseScreenModal"

import { pauseTextSX, pauseSubextSX } from "./rewindPauseStyle"

type props = {
  open: boolean
  handleClose: () => void
  showRewindHint: boolean
}

export default function RewindPause({
  open,
  handleClose,
  showRewindHint,
}: props) {
  return (
    <PauseScreenModal
      open={open}
      handleClose={handleClose}
      showRewindHint={showRewindHint}
      mainText="CLICK ANYWHERE TO CONTINUE"
      mainTextStyle={pauseTextSX}
      secondaryText="click ^ this to rewind more turns"
      secondaryTextStyle={pauseSubextSX}
    />
  )
}
