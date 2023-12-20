import { SxProps } from "@mui/material"
import background from "./images/paperBackground.jpg"

const appSX: SxProps = {
  backgroundImage: `url(${background})`,
  backgroundRepeat: "no-repeat",
  width: "100vw",
  minWidth: "100%",
  height: "100vh",
  spacing: 0,
  justify: "space-around",
}

const appTitleSX: SxProps = {
  fontSize: "10vh",
  cursor: "vertical-text",
  fontFamily: "Caveat" || "sans-serif",
  marginBottom: "2rem",
  textAlign: "center",
  wordWrap: "break-word",
  fontWeight: "700",
  marginTop: "3vh",
}

const bottomTextSX: SxProps = {
  fontSize: "2vh",
  cursor: "vertical-text",
  fontFamily: "Caveat" || "sans-serif",
  wordWrap: "break-word",
  fontWeight: "600",
  position: "absolute",
  right: "1vh",
  bottom: "0vh",
  pointerEvents: "none",
}

const appGridSX: SxProps = {
  height: "20vh",
  justifyContent: "center",
}

export { appTitleSX, bottomTextSX, appGridSX, appSX }
