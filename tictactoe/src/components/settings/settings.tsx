import { Dispatch, SetStateAction, useEffect, useState } from "react"

import {
  configContainerSX,
  configModalSX,
  getPauseSubTextToggleSX,
  getConfigureButtonToggleSX,
  settingsTitleSX,
} from "./settingsStyle"

import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import Slide from "@mui/material/Slide"

import { gifWaitingTimeMillis } from "../../data.consts"
import SettingsTurnTimer from "../settingsTurnTimer/settingsTurnTimer"
import SettingsBoardLength from "../settingsBoardSize/settingsBoardLength"

type props = {
  boardLength: number
  setBoardLength: Dispatch<SetStateAction<number>>
  waitingTime: gifWaitingTimeMillis
  setWaitingTime: Dispatch<SetStateAction<gifWaitingTimeMillis>>
  isWaitingTimeEnabled: boolean
  setIsWaitingTimeEnabled: Dispatch<SetStateAction<boolean>>
  tempWaitingTime: gifWaitingTimeMillis
  setTempWaitingTime: Dispatch<SetStateAction<gifWaitingTimeMillis>>
}

export default function Settings({
  boardLength,
  setBoardLength,
  waitingTime,
  setWaitingTime,
  isWaitingTimeEnabled,
  setIsWaitingTimeEnabled,
  tempWaitingTime,
  setTempWaitingTime,
}: props) {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false)
  const [tempBoardLength, setTempBoardLength] = useState<number>(boardLength)

  function saveWaitingTimeToTemp() {
    if (
      waitingTime !== gifWaitingTimeMillis.OFF ||
      tempWaitingTime !== gifWaitingTimeMillis.OFF
    ) {
      setTempWaitingTime(waitingTime)
    }
  }

  //! fix bug in which changing board size resets waiting time
  useEffect(() => {
    saveWaitingTimeToTemp()
  }, [waitingTime])

  //! try moving this to the child setting
  const toggleWaitingTime = (): void => {
    saveWaitingTimeToTemp()

    setIsWaitingTimeEnabled((prev) => !prev)
  }

  //! maybe this too - check if possible
  useEffect(() => {
    if (isWaitingTimeEnabled) {
      setWaitingTime(tempWaitingTime)
    } else {
      setWaitingTime(gifWaitingTimeMillis.OFF)
    }
  }, [isWaitingTimeEnabled, setWaitingTime])

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
            <Typography variant="h2" sx={settingsTitleSX}>
              {"< Settings >"}
            </Typography>

            <SettingsTurnTimer
              waitingTime={waitingTime}
              setWaitingTime={setWaitingTime}
              isWaitingTimeEnabled={isWaitingTimeEnabled}
              toggleWaitingTime={toggleWaitingTime}
              tempWaitingTime={tempWaitingTime}
            />

            <SettingsBoardLength
              boardLength={boardLength}
              setBoardLength={setBoardLength}
              tempBoardLength={tempBoardLength}
              setTempBoardLength={setTempBoardLength}
            />
          </Container>
        </Slide>
      </Modal>
    </Container>
  )
}
