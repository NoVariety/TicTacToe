import { useState } from "react"

import { appTitleSX, bottomTextSX, appGridSX, appSX } from "./AppStyle"

import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Link from "@mui/material/Link"

import { gifWaitingTimeMillis, githubLink, boardLengths } from "./data.consts"

import Game from "./components/game/game"
import Settings from "./components/settings/settings"

export default function App() {
  const [waitingTime, setWaitingTime] = useState<gifWaitingTimeMillis>(
    gifWaitingTimeMillis.MID
  )
  const [isWaitingTimeEnabled, setIsWaitingTimeEnabled] =
    useState<boolean>(true)

  const [boardLength, setBoardLength] = useState<number>(
    boardLengths.DEFAULT_LENGTH
  )
  const [tempBoardLength, setTempBoardLength] = useState<number>(boardLength)

  return (
    <Container sx={appSX}>
      <Grid container sx={appGridSX}>
        <Typography variant="h2" sx={appTitleSX}>
          Tic Tac Toe
        </Typography>
      </Grid>

      <Game
        isWaitingTimeEnabled={isWaitingTimeEnabled}
        waitingTime={waitingTime}
        boardLength={boardLength}
      />

      <Settings
        waitingTime={waitingTime}
        setWaitingTime={setWaitingTime}
        isWaitingTimeEnabled={isWaitingTimeEnabled}
        setIsWaitingTimeEnabled={setIsWaitingTimeEnabled}
        setBoardLength={setBoardLength}
        tempBoardLength={tempBoardLength}
        setTempBoardLength={setTempBoardLength}
      />

      <Link
        variant="body1"
        underline="none"
        href={githubLink}
        sx={bottomTextSX}
      >
        nova productions. © no rights reserved
      </Link>
    </Container>
  )
}
