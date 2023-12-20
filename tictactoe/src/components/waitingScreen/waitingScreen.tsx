import Container from "@mui/material/Container"
import Modal from "@mui/material/Modal"

import {
  gifPlayerSX,
  gifContainerSX,
  waitingModalSX,
} from "./waitingScreenStyle"

import LoadingDots from "../loadingDots/loadingDots"

import { waitingTimeGifMillis } from "../../data.consts"

type props = {
  open: boolean
  waitingTime: waitingTimeGifMillis
}

export default function WaitingScreen({ open, waitingTime }: props) {
  return (
    <Modal open={open} sx={waitingModalSX}>
      <Container sx={gifContainerSX}>
        <Container sx={gifPlayerSX}></Container>
        <LoadingDots waitingTime={waitingTime} />
      </Container>
    </Modal>
  )
}
