import { SxProps } from "@mui/material"

import { DEFAULT_FONT_WEIGHT, fonts, colors } from "../../style.consts"

const boardLengthContainerSX: SxProps = {
  marginTop: "1.5vh",
}

const stackSx: SxProps = {
  marginTop: "1vh",
}

const numberInputSx: SxProps = {
  color: colors.MAIN,
  borderTopLeftRadius: "15px 255px",
  borderTopRightRadius: "225px 15px",
  borderBottomRightRadius: "15px 225px",
  borderBottomLeftRadius: "255px 15px",
  border: "0.3vh solid",
  marginRight: "1vh",
  width: "20vh",

  "& fieldset": { border: "none" },
}

const numberInputPropStyle = {
  fontFamily: fonts.MAIN || fonts.SECONDARY,
  fontWeight: DEFAULT_FONT_WEIGHT,
  color: colors.MAIN,
  fontSize: "3vh",
  height: "4vh",
}

const setButtonsSx: SxProps = {
  fontFamily: fonts.MAIN || fonts.SECONDARY,
  fontWeight: DEFAULT_FONT_WEIGHT,
  color: colors.MAIN,
  userSelect: "none",
  fontSize: "3.5vh",
  cursor: "pointer",
  padding: "0 !important",
  marginLeft: "1vh",
  textAlign: "center",
  fontVariant: "small-caps",

  "&:hover": {
    textShadow: "2px 2px #b3b3b3",
  },
}

export {
  boardLengthContainerSX,
  stackSx,
  numberInputSx,
  numberInputPropStyle,
  setButtonsSx,
}
