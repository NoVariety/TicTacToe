import Container from "@mui/material/Container"
import Modal from "@mui/material/Modal"

import {
  gifContainerSX,
  waitingModalSX,
  getGifPlayerSX,
} from "./waitingScreenStyle"

import LoadingDots from "../loadingDots/loadingDots"

import { gifWaitingTimeMillis } from "../../data.consts"

type props = {
  open: boolean
  waitingTime: gifWaitingTimeMillis
}

export default function WaitingScreen({ open, waitingTime }: props) {
  return (
    <Modal open={open} sx={waitingModalSX}>
      <Container sx={gifContainerSX}>
        <Container sx={{ ...getGifPlayerSX(waitingTime) }}></Container>
        <LoadingDots waitingTime={waitingTime} />
      </Container>
    </Modal>
  )
}
