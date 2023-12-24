import { useEffect, useState } from "react"

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
  const [tempWaitingTime, setTempWaitingTime] =
    useState<gifWaitingTimeMillis>(waitingTime)
  const [isWaitingTimeEnabled, setIsWaitingTimeEnabled] = useState<boolean>(
    waitingTime !== gifWaitingTimeMillis.OFF
  )

  function saveWaitingTimeToTemp() {
    if (waitingTime !== gifWaitingTimeMillis.OFF) {
      setTempWaitingTime(waitingTime)
    }
  }

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

  //TODO: part 4 - dynamic board length
  const [boardLength, setBoardLength] = useState<number>(
    boardLengths.DEFAULT_LENGTH
  )

  return (
    <Container sx={appSX}>
      <Grid container sx={appGridSX}>
        <Typography variant="h2" sx={appTitleSX}>
          Tic Tac Toe
        </Typography>
      </Grid>

      <Game boardLength={boardLength} waitingTime={waitingTime} />

      <Settings
        boardLength={boardLength}
        setBoardLength={setBoardLength}
        waitingTime={waitingTime}
        setWaitingTime={setWaitingTime}
        isWaitingTimeEnabled={isWaitingTimeEnabled}
        toggleWaitingTime={toggleWaitingTime}
        tempWaitingTime={tempWaitingTime}
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
