import { Dispatch, SetStateAction } from "react"

import {
  boardLengthContainerSX,
  numberInputPropStyle,
  numberInputSx,
  setButtonsSx,
  stackSx,
} from "./settingsBoardLengthStyle"

import { propertyTitleSX, infoTextSx } from "../settings/settingsStyle"

import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import { boardLengths } from "../../data.consts"
import { TextField } from "@mui/material"

type props = {
  boardLength: number
  setBoardLength: Dispatch<SetStateAction<number>>
  tempBoardLength: number
  setTempBoardLength: Dispatch<SetStateAction<number>>
}

export default function SettingsBoardLength({
  boardLength,
  setBoardLength,
  tempBoardLength,
  setTempBoardLength,
}: props) {
  function onTextFieldChange(event: React.ChangeEvent<HTMLInputElement>): void {
    if (Number(event.target.value) || event.target.value === "") {
      setTempBoardLength(+event.target.value)
    }
  }

  function onUpdateClick(): void {
    if (
      tempBoardLength >= boardLengths.MIN_LENGTH &&
      tempBoardLength <= boardLengths.MAX_LENGTH
    ) {
      setBoardLength(tempBoardLength)
    }
  }

  function onDefaultClick(): void {
    setTempBoardLength(boardLengths.DEFAULT_LENGTH)
    setBoardLength(boardLengths.DEFAULT_LENGTH)
  }

  return (
    <Container sx={boardLengthContainerSX}>
      <Typography sx={propertyTitleSX}>{"< Board Length />"}</Typography>
      <Container sx={infoTextSx}>
        {`must be a natural number between ${boardLengths.MIN_LENGTH} and ${boardLengths.MAX_LENGTH}`}
      </Container>
      <Stack direction="row" spacing={0} sx={stackSx}>
        <TextField
          value={tempBoardLength}
          onChange={onTextFieldChange}
          sx={numberInputSx}
          InputProps={{ style: numberInputPropStyle }}
        ></TextField>

        <Container sx={setButtonsSx} onClick={onUpdateClick}>
          update
        </Container>

        <Container sx={setButtonsSx} onClick={onDefaultClick}>
          default
        </Container>
      </Stack>
    </Container>
  )
}
