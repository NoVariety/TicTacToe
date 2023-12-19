import Container from "@mui/material/Container"
import Modal from "@mui/material/Modal"

import {
  gifPlayerSX,
  gifContainerSX,
  waitingModalSX,
} from "./waitingScreenStyle"

import LoadingDots from "../loadingDots/loadingDots"

type props = {
  open: boolean
}

export default function WaitingScreen({ open }: props) {
  return (
    <Modal open={open} sx={waitingModalSX}>
      <Container sx={gifContainerSX}>
        <Container sx={gifPlayerSX}></Container>
        <LoadingDots />
      </Container>
    </Modal>
  )
}
