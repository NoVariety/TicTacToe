import { useEffect, useRef, useState } from "react"

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
  const tempWaitingTimeRef = useRef<gifWaitingTimeMillis>(tempWaitingTime)

  function saveWaitingTimeToTemp() {
    if (waitingTime !== gifWaitingTimeMillis.OFF) {
      tempWaitingTimeRef.current = tempWaitingTime
    }
    setTempWaitingTime(waitingTime)
  }

  useEffect(() => {
    saveWaitingTimeToTemp()

    if (
      waitingTime === gifWaitingTimeMillis.OFF &&
      tempWaitingTime === gifWaitingTimeMillis.OFF
    ) {
      setWaitingTime(tempWaitingTimeRef.current)
    }
  }, [waitingTime])

  const toggleWaitingTime = (): void => {
    saveWaitingTimeToTemp()

    setIsWaitingTimeEnabled((prev) => !prev)
  }

  useEffect(() => {
    if (isWaitingTimeEnabled) {
      setWaitingTime(tempWaitingTimeRef.current)
    } else {
      setWaitingTime(gifWaitingTimeMillis.OFF)
    }
  }, [isWaitingTimeEnabled, setWaitingTime])

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

      <Game boardLength={boardLength} waitingTime={waitingTime} />

      <Settings
        waitingTime={waitingTime}
        setBoardLength={setBoardLength}
        isWaitingTimeEnabled={isWaitingTimeEnabled}
        setWaitingTime={setWaitingTime}
        tempWaitingTime={tempWaitingTime}
        tempWaitingTimeRef={tempWaitingTimeRef}
        toggleWaitingTime={toggleWaitingTime}
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
