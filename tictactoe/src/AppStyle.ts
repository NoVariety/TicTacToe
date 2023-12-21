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
  fontFamily: "Caveat" || "sans-serif",
  fontSize: "10vh",
  marginBottom: "2rem",
  textAlign: "center",
  wordWrap: "break-word",
  fontWeight: "700",
  marginTop: "3vh",
  userSelect: "none",
}

const bottomTextSX: SxProps = {
  fontFamily: "Caveat" || "sans-serif",
  fontSize: "2.5vh",
  cursor: "pointer",
  wordWrap: "break-word",
  fontWeight: "600",
  position: "absolute",
  right: "1vh",
  bottom: "0vh",
  color: "#1d1d1d",
  userSelect: "none",
}

const appGridSX: SxProps = {
  height: "20vh",
  justifyContent: "center",
}

export { appTitleSX, bottomTextSX, appGridSX, appSX }
