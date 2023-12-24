import { SxProps } from "@mui/material"

import { DEFAULT_FONT_WEIGHT, fonts, colors } from "../../data.styles"

const pauseTextSX: SxProps = {
  fontFamily: fonts.MAIN || fonts.SECONDARY,
  fontWeight: DEFAULT_FONT_WEIGHT,
  color: colors.SECONDARY,
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
