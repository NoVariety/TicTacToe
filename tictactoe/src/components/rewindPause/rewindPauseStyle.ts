import { SxProps } from "@mui/material"

import { DEFAULT_FONT_WEIGHT, fonts, colors } from "../../style.consts"

const pauseTextSX: SxProps = {
  fontFamily: fonts.MAIN || fonts.SECONDARY,
  fontWeight: DEFAULT_FONT_WEIGHT,
  color: colors.SECONDARY,
  textAlign: "center",
  marginTop: "44vh",
  textShadow: `-1px 1px 0 ${colors.MAIN}, 1px 1px 0 ${colors.MAIN}, 1px -1px 0 ${colors.MAIN}, -1px -1px 0 ${colors.MAIN}`,
  cursor: "default",
  pointerEvents: "none",
}

const pauseSubextSX: SxProps = {
  ...pauseTextSX,
  marginTop: "37vh",
  marginRight: "1vh",
}

export { pauseTextSX, pauseSubextSX }
