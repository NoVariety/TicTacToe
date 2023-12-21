import { SxProps } from "@mui/material"

const pauseTextSX: SxProps = {
  fontFamily: "Caveat" || "sans-serif",
  fontWeight: "600",
  color: "#eeeeee",
  textAlign: "center",
  marginTop: "44vh",
  textShadow:
    "-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000",
  cursor: "default",
  pointerEvents: "none",
}

const pauseSubextSX: SxProps = {
  ...pauseTextSX,
  marginTop: "38vh",
}

export { pauseTextSX, pauseSubextSX }
