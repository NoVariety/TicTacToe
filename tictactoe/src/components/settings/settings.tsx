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
import { getToggleContainerSX } from "../settingsTurnTimer/settingsTurnTimerStyle"

type props = {
  boardLength: number
  setBoardLength: Dispatch<SetStateAction<number>>
  waitingTime: gifWaitingTimeMillis
  setWaitingTime: Dispatch<SetStateAction<gifWaitingTimeMillis>>
  isWaitingTimeEnabled: boolean
  toggleWaitingTime: () => void
}

export default function Settings({
  waitingTime,
  setWaitingTime,
  isWaitingTimeEnabled,
  toggleWaitingTime,
}: props) {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false)

  return (
    <Container>
      <Stack direction="row" spacing={0}>
        <Container
          sx={{ ...getConfigureButtonToggleSX(isSettingsOpen) }}
          onClick={() => {
            setIsSettingsOpen((prev) => !prev)
          }}
        ></Container>

        <Typography
          variant="h4"
          sx={{ ...getPauseSubTextToggleSX(isSettingsOpen) }}
        >
          {`< ${isSettingsOpen ? "close" : "open"} game settings`}
        </Typography>
      </Stack>

      <Modal open={isSettingsOpen} sx={configModalSX}>
        <Slide direction="right" in={isSettingsOpen} mountOnEnter unmountOnExit>
          <Container sx={configContainerSX}>
            <SettingsTurnTimer
              waitingTime={waitingTime}
              setWaitingTime={setWaitingTime}
              isWaitingTimeEnabled={isWaitingTimeEnabled}
              toggleWaitingTime={toggleWaitingTime}
            />
          </Container>
        </Slide>
      </Modal>
    </Container>
  )
}
