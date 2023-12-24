import { Dispatch, SetStateAction, useEffect, useState } from "react"

import {
  waitingTextSX,
  getWaitingButtonsSX,
  getToggleContainerSX,
} from "./settingsBoardLengthStyle"

import { waitingContainerSX, propertyTitleSX } from "../settings/settingsStyle"

import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import { gifWaitingTimeMillis } from "../../data.consts"
import { TextField } from "@mui/material"

type props = {
  boardLength: gifWaitingTimeMillis
  setBoardLength: Dispatch<SetStateAction<gifWaitingTimeMillis>>
}

export default function SettingsBoardLength({
  boardLength,
  setBoardLength,
}: props) {
  return (
    <Container sx={waitingContainerSX}>
      <Typography sx={propertyTitleSX}>{"< Board Length />"}</Typography>
      <Stack direction="row">
        <Stack direction="row" spacing={0}>
          <TextField>-</TextField>

          <Container>+</Container>
        </Stack>
      </Stack>
    </Container>
  )
}
