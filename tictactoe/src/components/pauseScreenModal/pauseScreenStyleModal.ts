import { SxProps } from "@mui/material"

const pauseTextSX: SxProps = {
  fontFamily: "Caveat" || "sans-serif",
  fontWeight: "600",
  color: "white",
  textAlign: "center",
  marginTop: "44vh",
  textShadow:
    "-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000",
  cursor: "default",
  pointerEvents: "none",
}

const pauseSubextSX: SxProps = {
  fontFamily: "Caveat" || "sans-serif",
  fontWeight: "600",
  color: "white",
  textAlign: "center",
  marginTop: "37vh",
  marginRight: "1.5vw",
  textShadow:
    "-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000",
  cursor: "default",
  pointerEvents: "none",
}

const containerSX: SxProps = {
  pointerEvents: "none",
}

const modalSX: SxProps = {
  zIndex: "auto",
}

export { pauseTextSX, pauseSubextSX, modalSX, containerSX }
