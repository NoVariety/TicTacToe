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

type props = {
  waitingTime: gifWaitingTimeMillis
  setWaitingTime: Dispatch<SetStateAction<gifWaitingTimeMillis>>
  tempWaitingTime: gifWaitingTimeMillis
  setTempWaitingTime: Dispatch<SetStateAction<gifWaitingTimeMillis>>
}

type waitingTimeDisplay = {
  waitingTimeName: string
  waitingTimeValue: gifWaitingTimeMillis
}

export default function SettingsTurnTimer({
  waitingTime,
  setWaitingTime,
  tempWaitingTime,
  setTempWaitingTime,
}: props) {
  const waitingTimes: Array<waitingTimeDisplay> = [
    { waitingTimeName: "off", waitingTimeValue: gifWaitingTimeMillis.off },
    { waitingTimeName: "min", waitingTimeValue: gifWaitingTimeMillis.min },
    { waitingTimeName: "mid", waitingTimeValue: gifWaitingTimeMillis.mid },
    { waitingTimeName: "max", waitingTimeValue: gifWaitingTimeMillis.max },
  ]

  const [isWaitingTimeEnabled, setIsWaitingTimeEnabled] =
    useState<boolean>(true)
  const [waitingTimeArrIndex, setWaitingTimeArrIndex] = useState<number>(
    waitingTimes.findIndex((item) => item.waitingTimeValue === waitingTime)
  )

  const toggleWaitingTime = (): void => {
    setTempWaitingTime(waitingTime)
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

  //! fix bug in which playing turn after offing waiting time resets it back to prev =>
  //!   bug happens because component re-renders on close
  //!   possible fix to try: moving the tempWaitingTime, isWaitingTimeEnabled and the useEffect up to App to prevent reset on re-render
  useEffect(() => {
    console.log("twt " + tempWaitingTime)
    console.log("wait " + waitingTime)
    console.log(isWaitingTimeEnabled)

    if (isWaitingTimeEnabled) {
      setWaitingTime(tempWaitingTime)
    } else {
      setWaitingTime(gifWaitingTimeMillis.off)
    }
  }, [isWaitingTimeEnabled, setWaitingTime])

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
