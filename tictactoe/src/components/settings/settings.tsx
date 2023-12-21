import { Dispatch, SetStateAction, useEffect, useState } from "react"

import {
  configContainerSX,
  configModalSX,
  waitingContainerSX,
  waitingTextSX,
  propertyTitleSX,
  getWaitingButtonsSX,
  getToggleContainerSX,
  getPauseSubTextToggleSX,
  getConfigureButtonToggleSX,
} from "./settingsStyle"

import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import Slide from "@mui/material/Slide"

import { gifWaitingTimeMillis } from "../../data.consts"

type props = {
  boardLength: number
  setBoardLength: Dispatch<SetStateAction<number>>
  waitingTime: gifWaitingTimeMillis
  setWaitingTime: Dispatch<SetStateAction<gifWaitingTimeMillis>>
}

type waitingTimeDisplay = {
  waitingTimeName: string
  waitingTimeValue: gifWaitingTimeMillis
}

export default function Settings({
  boardLength,
  setBoardLength,
  waitingTime,
  setWaitingTime,
}: props) {
  const waitingTimes: Array<waitingTimeDisplay> = [
    { waitingTimeName: "off", waitingTimeValue: gifWaitingTimeMillis.off },
    { waitingTimeName: "min", waitingTimeValue: gifWaitingTimeMillis.min },
    { waitingTimeName: "mid", waitingTimeValue: gifWaitingTimeMillis.mid },
    { waitingTimeName: "max", waitingTimeValue: gifWaitingTimeMillis.max },
  ]

  const [isWaitingTimeEnabled, setIsWaitingTimeEnabled] =
    useState<boolean>(true)
  const [tempWaitingTime, setTempWaitingTime] =
    useState<gifWaitingTimeMillis>(waitingTime)
  const [waitingTimeArrIndex, setWaitingTimeArrIndex] = useState<number>(
    waitingTimes.findIndex((item) => item.waitingTimeValue === waitingTime)
  )

  const toggleWaitingTime = (): void => {
    setIsWaitingTimeEnabled((prev) => !prev)
  }
  const incrementWaitingTime = (): void => {
    setWaitingTimeArrIndex((prev) => prev + 1)
  }
  const decrementWaitingTime = (): void => {
    setWaitingTimeArrIndex((prev) => prev - 1)
  }

  useEffect(() => {
    setWaitingTime(waitingTimes[waitingTimeArrIndex].waitingTimeValue)
  }, [waitingTimeArrIndex])

  useEffect(() => {
    setTempWaitingTime(waitingTime)

    setWaitingTime(
      isWaitingTimeEnabled ? tempWaitingTime : gifWaitingTimeMillis.off
    )
  }, [isWaitingTimeEnabled, setWaitingTime])

  function getWaitingTimeDisplayName(): string {
    return (
      waitingTimes.find((item) => item.waitingTimeValue === waitingTime)
        ?.waitingTimeName || "OFF"
    )
  }

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
            <Container sx={waitingContainerSX}>
              <Typography sx={propertyTitleSX}>
                {"< Computer Turn Time >"}
              </Typography>
              <Stack direction="row">
                <Container
                  onClick={toggleWaitingTime}
                  sx={{
                    ...getToggleContainerSX(
                      waitingTime === gifWaitingTimeMillis.off
                    ),
                  }}
                  disableGutters
                ></Container>

                <Stack direction="row" spacing={0}>
                  <Container
                    onClick={decrementWaitingTime}
                    sx={{
                      ...getWaitingButtonsSX(
                        waitingTimeArrIndex <= 1 || !isWaitingTimeEnabled
                      ),
                    }}
                  >
                    -
                  </Container>
                  <Typography sx={waitingTextSX}>
                    {getWaitingTimeDisplayName()}
                  </Typography>
                  <Container
                    onClick={incrementWaitingTime}
                    sx={{
                      ...getWaitingButtonsSX(
                        waitingTimeArrIndex === waitingTimes.length - 1 ||
                          !isWaitingTimeEnabled
                      ),
                    }}
                  >
                    +
                  </Container>
                </Stack>
              </Stack>
            </Container>
          </Container>
        </Slide>
      </Modal>
    </Container>
  )
}
