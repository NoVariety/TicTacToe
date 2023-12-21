import { stackMarginSX, createLoadingDotsSX } from "./loadingDotsStyle"

import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"

import { gifWaitingTimeMillis } from "../../data.consts"
import { SxProps } from "@mui/material"

type props = {
  waitingTime: gifWaitingTimeMillis
}

export default function LoadingDots({ waitingTime }: props) {
  const TOTAL_DOT_DUOS: number = 8
  const TIMESTAMP_DIFFERENCE_SECONDS: number =
    (waitingTime - 200) / 1000 / (TOTAL_DOT_DUOS * 2)

  const dotsArray: Array<SxProps> = []
  mapDotsTimestamps()

  function mapDotsTimestamps(): Array<SxProps> {
    for (let index = 0; index < TOTAL_DOT_DUOS * 2; index += 2) {
      dotsArray.push({
        ...createLoadingDotsSX(
          TIMESTAMP_DIFFERENCE_SECONDS * index,
          TIMESTAMP_DIFFERENCE_SECONDS * (index + 1)
        ),
      } as SxProps)
    }

    return dotsArray
  }

  return (
    <Stack direction="row" spacing={2} sx={stackMarginSX}>
      {dotsArray.map((item) => (
        <Container sx={{ ...item }}></Container>
      ))}
    </Stack>
  )
}
