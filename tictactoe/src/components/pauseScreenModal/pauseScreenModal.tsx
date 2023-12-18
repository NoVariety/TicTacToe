import { Container, Modal } from "@mui/material"

import {
  pauseTextSX,
  pauseSubextSX,
  modalSX,
  containerSX,
} from "./pauseScreenStyleModal"

import Typography from "@mui/material/Typography"

type props = {
  open: boolean
  handleClose: () => void
  showRewindHint: boolean
}

export default function PauseScreenModal({
  open,
  handleClose,
  showRewindHint,
}: props) {
  return (
    <Modal open={open} onClose={handleClose} sx={modalSX}>
      <Container sx={containerSX}>
        <Typography variant="h2" sx={pauseTextSX}>
          CLICK ANYWHERE TO CONTINUE
        </Typography>
        {showRewindHint && (
          <Typography variant="h4" sx={pauseSubextSX}>
            click ^ this to rewind more turns
          </Typography>
        )}
      </Container>
    </Modal>
  )
}
