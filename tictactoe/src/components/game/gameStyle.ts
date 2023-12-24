import { SxProps } from "@mui/material"

import { DEFAULT_FONT_WEIGHT, fonts, colors } from "../../data.styles"

const gameHintsSX: SxProps = {
  fontFamily: fonts.MAIN || fonts.SECONDARY,
  pointerEvents: "none",
  marginBottom: "2rem",
  maxWidth: "65vh",
  height: "6vh",
  fontSize: "3.3vh",
  textAlign: "center",
  wordWrap: "break-word",
  fontWeight: DEFAULT_FONT_WEIGHT,
  userSelect: "none",
  color: colors.MAIN,
}

const gridCenterSX: SxProps = {
  justifyContent: "center",
}

export { gameHintsSX, gridCenterSX }
