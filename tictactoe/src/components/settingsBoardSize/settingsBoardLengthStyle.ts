import { SxProps } from "@mui/material"

import liquidFill from "../../images/liquidFill.png"

import { DEFAULT_FONT_WEIGHT, fonts, colors } from "../../style.consts"

const stackSx: SxProps = {
  marginTop: "2vh",
}

const numberInputSx: SxProps = {
  color: colors.MAIN,
  borderTopLeftRadius: "15px 255px",
  borderTopRightRadius: "225px 15px",
  borderBottomRightRadius: "15px 225px",
  borderBottomLeftRadius: "255px 15px",
  border: "0.3vh solid",
  marginRight: "1vh",

  "& fieldset": { border: "none" },
}

const numberInputPropStyle = {
  fontFamily: fonts.MAIN || fonts.SECONDARY,
  fontWeight: DEFAULT_FONT_WEIGHT,
  color: colors.MAIN,
  fontSize: "3vh",
  padding: "0",
  height: "5vh",
}

const setButtonsSx: SxProps = {
  // fontFamily: fonts.MAIN || fonts.SECONDARY,
  // fontWeight: DEFAULT_FONT_WEIGHT,
  // color: colors.MAIN,
  // borderTopLeftRadius: "255px 15px",
  // borderTopRightRadius: "15px 225px",
  // borderBottomRightRadius: "225px 15px",
  // borderBottomLeftRadius: "15px 255px",
  // border: "0.3vh solid",
  //!
  // fontFamily: fonts.MAIN || fonts.SECONDARY,
  // background: "transparent",
  // fontSize: "3vh",
  // fontWeight: DEFAULT_FONT_WEIGHT,
  // userSelect: "none",
  // borderTopLeftRadius: "255px 15px",
  // borderTopRightRadius: "15px 225px",
  // borderBottomRightRadius: "225px 15px",
  // borderBottomLeftRadius: "15px 255px",
  // border: "solid 0.3vh",
  // lineHeight: "4vh",
  // cursor: "pointer",
  // color: colors.MAIN,
  // textShadow: "0 3px 5px rgba(#000, 0.25)",
  // backgroundImage: `url(${liquidFill})`,
  // backgroundRepeat: "repeat-x",
  // backgroundPosition: "0 -100%",
  // transition: "0.5s ease",
  // borderColor: colors.MAIN,
  // "&:hover": {
  //   backgroundPosition: "200% 100%",
  //   color: colors.SECONDARY,
  //   boxShadow: "2px 8px 4px -6px hsla(0, 0%, 0%, 0.3)",
  //   transition: "1.25s ease",
  // },
  fontFamily: fonts.MAIN || fonts.SECONDARY,
  fontWeight: DEFAULT_FONT_WEIGHT,
  color: colors.MAIN,
  userSelect: "none",
  fontSize: "3vh",
  cursor: "pointer",
  padding: "0 !important",
  marginLeft: "1vh",
  marginTop: "0.5vh",

  "&:hover": {
    textShadow: "2px 2px #b3b3b3",
  },
}

export { stackSx, numberInputSx, numberInputPropStyle, setButtonsSx }
