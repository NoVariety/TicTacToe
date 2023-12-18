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

//! change props - split them instead of using props.something
export default function PauseScreenModal(props: props) {
  return (
    <Modal open={props.open} onClose={props.handleClose} sx={modalSX}>
      <Container sx={containerSX}>
        <Typography variant="h2" sx={pauseTextSX}>
          CLICK ANYWHERE TO CONTINUE
        </Typography>
        {props.showRewindHint && (
          <Typography variant="h4" sx={pauseSubextSX}>
            click ^ this to rewind more turns
          </Typography>
        )}
      </Container>
    </Modal>
  )
}
