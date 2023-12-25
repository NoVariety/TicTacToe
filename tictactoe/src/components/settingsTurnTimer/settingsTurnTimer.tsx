import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react"

import {
  waitingContainerSX,
  waitingTextSX,
  getWaitingButtonsSX,
  getToggleContainerSX,
} from "./settingsTurnTimerStyle"

import { propertyTitleSX, infoTextSx } from "../settings/settingsStyle"

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
  tempWaitingTime: gifWaitingTimeMillis
  tempWaitingTimeRef: MutableRefObject<gifWaitingTimeMillis>
}

export default function SettingsTurnTimer({
  waitingTime,
  setWaitingTime,
  isWaitingTimeEnabled,
  toggleWaitingTime,
  tempWaitingTime,
  tempWaitingTimeRef,
}: props) {
  const waitingTimes: Array<waitingTimeDisplay> = [
    { waitingTimeName: "off", waitingTimeValue: gifWaitingTimeMillis.OFF },
    { waitingTimeName: "min", waitingTimeValue: gifWaitingTimeMillis.MIN },
    { waitingTimeName: "mid", waitingTimeValue: gifWaitingTimeMillis.MID },
    { waitingTimeName: "max", waitingTimeValue: gifWaitingTimeMillis.MAX },
  ]

  const [waitingTimeArrIndex, setWaitingTimeArrIndex] = useState<number>(
    waitingTimes.findIndex(
      (item) =>
        item.waitingTimeValue ===
        (tempWaitingTime === gifWaitingTimeMillis.OFF
          ? tempWaitingTimeRef.current
          : tempWaitingTime)
    )
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
    return isWaitingTimeEnabled
      ? waitingTimes.find((item) => item.waitingTimeValue === waitingTime)
          ?.waitingTimeName || "off"
      : "off"
  }

  return (
    <Container sx={waitingContainerSX}>
      <Typography sx={propertyTitleSX}>{"< Computer Turn Time />"}</Typography>
      <Container sx={infoTextSx}>{`can be turned On / Off too`}</Container>
      <Stack direction="row">
        <Container
          onClick={toggleWaitingTime}
          sx={{
            ...getToggleContainerSX(!isWaitingTimeEnabled),
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
