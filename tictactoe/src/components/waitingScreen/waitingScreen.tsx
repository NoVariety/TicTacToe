import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"

import {
  gifPlayerSX,
  waitingTextSX,
  gifContainerSX,
  waitingModalSX,
} from "./waitingScreenStyle"

import { SxProps } from "@mui/material"

import waitingGif from "../../images/bocchiWaitShort.gif"
import LoadingDots from "../loadingDots/loadingDots"

type props = {
  open: boolean
}

export default function WaitingScreen({ open }: props) {
  return (
    <Modal open={open} sx={waitingModalSX}>
      <Container sx={gifContainerSX}>
        <Container
          sx={
            { ...gifPlayerSX, backgroundImage: `url(${waitingGif})` } as SxProps
          }
        ></Container>
        <LoadingDots />
      </Container>
    </Modal>
  )
}
