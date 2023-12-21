import { Dispatch, SetStateAction, useEffect, useState } from "react"

import {
  configContainerSX,
  configModalSX,
  getPauseSubTextToggleSX,
  getConfigureButtonToggleSX,
} from "./settingsStyle"

import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import Slide from "@mui/material/Slide"

import { gifWaitingTimeMillis } from "../../data.consts"
import SettingsTurnTimer from "../settingsTurnTimer/settingsTurnTimer"

type props = {
  boardLength: number
  setBoardLength: Dispatch<SetStateAction<number>>
  waitingTime: gifWaitingTimeMillis
  setWaitingTime: Dispatch<SetStateAction<gifWaitingTimeMillis>>
  tempWaitingTime: gifWaitingTimeMillis
  setTempWaitingTime: Dispatch<SetStateAction<gifWaitingTimeMillis>>
}

export default function Settings({
  boardLength,
  setBoardLength,
  waitingTime,
  setWaitingTime,
  tempWaitingTime,
  setTempWaitingTime,
}: props) {
  const [configOpen, setConfigOpen] = useState<boolean>(false)

  return (
    <Container>
      <Stack direction="row" spacing={0}>
        <Container
          sx={{ ...getConfigureButtonToggleSX(configOpen) }}
          onClick={() => {
            setConfigOpen((prev) => !prev)
          }}
        ></Container>

        <Typography
          variant="h4"
          sx={{ ...getPauseSubTextToggleSX(configOpen) }}
        >
          {`< ${configOpen ? "close" : "open"} game settings`}
        </Typography>
      </Stack>

      <Modal open={configOpen} sx={configModalSX}>
        <Slide direction="right" in={configOpen} mountOnEnter unmountOnExit>
          <Container sx={configContainerSX}>
            <SettingsTurnTimer
              waitingTime={waitingTime}
              setWaitingTime={setWaitingTime}
              tempWaitingTime={tempWaitingTime}
              setTempWaitingTime={setTempWaitingTime}
            />
          </Container>
        </Slide>
      </Modal>
    </Container>
  )
}
