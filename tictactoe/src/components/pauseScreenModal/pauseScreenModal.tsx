import { Container, Modal, SxProps } from "@mui/material"

import { modalSX, containerSX } from "./pauseScreenStyleModal"

import Typography from "@mui/material/Typography"

type props = {
  open: boolean
  handleClose: () => void
  showRewindHint: boolean
  mainText: string
  mainTextStyle: SxProps
  secondaryText: string
  secondaryTextStyle: SxProps
}

export default function PauseScreenModal({
  open,
  handleClose,
  showRewindHint,
  mainText,
  mainTextStyle,
  secondaryText,
  secondaryTextStyle,
}: props) {
  return (
    <Modal open={open} onClose={handleClose} sx={modalSX}>
      <Container sx={containerSX}>
        <Typography variant="h2" sx={mainTextStyle}>
          {mainText}
        </Typography>
        {showRewindHint && (
          <Typography variant="h4" sx={secondaryTextStyle}>
            {secondaryText}
          </Typography>
        )}
      </Container>
    </Modal>
  )
}
