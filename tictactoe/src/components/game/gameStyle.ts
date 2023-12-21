import { SxProps } from "@mui/material"

const gameHintsSX: SxProps = {
  fontFamily: "Caveat" || "sans-serif",
  pointerEvents: "none",
  marginBottom: "2rem",
  maxWidth: "65vh",
  height: "6vh",
  fontSize: "3.3vh",
  textAlign: "center",
  wordWrap: "break-word",
  fontWeight: "600",
  userSelect: "none",
}

const gridCenterSX: SxProps = {
  justifyContent: "center",
}

export { gameHintsSX, gridCenterSX }
