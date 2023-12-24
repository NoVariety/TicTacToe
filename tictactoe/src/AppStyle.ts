import { SxProps } from "@mui/material"

import background from "./images/paperBackground.jpg"

import { DEFAULT_FONT_WEIGHT, fonts, colors } from "./data.styles"

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
  fontFamily: fonts.MAIN || fonts.SECONDARY,
  fontSize: "10vh",
  marginBottom: "2rem",
  textAlign: "center",
  wordWrap: "break-word",
  fontWeight: DEFAULT_FONT_WEIGHT,
  marginTop: "3vh",
  userSelect: "none",
  color: colors.MAIN,
}

const bottomTextSX: SxProps = {
  fontFamily: fonts.MAIN || fonts.SECONDARY,
  fontSize: "2.5vh",
  cursor: "pointer",
  wordWrap: "break-word",
  fontWeight: DEFAULT_FONT_WEIGHT,
  position: "absolute",
  right: "1vh",
  bottom: "0vh",
  color: colors.MAIN,
  userSelect: "none",
}

const appGridSX: SxProps = {
  height: "20vh",
  justifyContent: "center",
}

export { appTitleSX, bottomTextSX, appGridSX, appSX }
