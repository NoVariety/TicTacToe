import { Dispatch, SetStateAction, useEffect, useState } from "react"

import {
  waitingContainerSX,
  waitingTextSX,
  propertyTitleSX,
  getWaitingButtonsSX,
  getToggleContainerSX,
} from "./settingsTurnTimerStyle"

import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import { gifWaitingTimeMillis } from "../../data.consts"

type waitingTimeDisplay = {
  waitingTimeName: string
  waitingTimeValue: gifWaitingTimeMillis
}

type props = {
  waitingTime: gifWaitingTimeMillis
  setWaitingTime: Dispatch<SetStateAction<gifWaitingTimeMillis>>
  isWaitingTimeEnabled: boolean
  toggleWaitingTime: () => void
}

export default function SettingsTurnTimer({
  waitingTime,
  setWaitingTime,
  isWaitingTimeEnabled,
  toggleWaitingTime,
}: props) {
  const waitingTimes: Array<waitingTimeDisplay> = [
    { waitingTimeName: "off", waitingTimeValue: gifWaitingTimeMillis.off },
    { waitingTimeName: "min", waitingTimeValue: gifWaitingTimeMillis.min },
    { waitingTimeName: "mid", waitingTimeValue: gifWaitingTimeMillis.mid },
    { waitingTimeName: "max", waitingTimeValue: gifWaitingTimeMillis.max },
  ]

  const [waitingTimeArrIndex, setWaitingTimeArrIndex] = useState<number>(
    waitingTimes.findIndex((item) => item.waitingTimeValue === waitingTime)
  )

  const incrementWaitingTime = (): void => {
    setWaitingTimeArrIndex((prev) => prev + 1)
  }
  const decrementWaitingTime = (): void => {
    setWaitingTimeArrIndex((prev) => prev - 1)
  }

  useEffect(() => {
    setWaitingTime(waitingTimes[waitingTimeArrIndex].waitingTimeValue)
  }, [waitingTimeArrIndex])

  function getWaitingTimeDisplayName(): string {
    return (
      waitingTimes.find((item) => item.waitingTimeValue === waitingTime)
        ?.waitingTimeName || "OFF"
    )
  }

  return (
    <Container sx={waitingContainerSX}>
      <Typography sx={propertyTitleSX}>{"< Computer Turn Time >"}</Typography>
      <Stack direction="row">
        <Container
          onClick={toggleWaitingTime}
          sx={{
            ...getToggleContainerSX(waitingTime === gifWaitingTimeMillis.off),
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
  )
}
