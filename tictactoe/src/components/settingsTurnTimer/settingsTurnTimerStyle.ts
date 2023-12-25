import { SxProps } from "@mui/material"

import { DEFAULT_FONT_WEIGHT, fonts, colors } from "../../style.consts"

const waitingTextSX: SxProps = {
  fontFamily: fonts.MAIN || fonts.SECONDARY,
  fontWeight: DEFAULT_FONT_WEIGHT,
  color: colors.MAIN,
  fontSize: "4vh",
  userSelect: "none",
  width: "5vh",
  minWidth: "5vh",
}

const waitingTextButtonsSX: SxProps = {
  fontFamily: fonts.MAIN || fonts.SECONDARY,
  fontWeight: DEFAULT_FONT_WEIGHT,
  color: colors.MAIN,
  userSelect: "none",
  fontSize: "4.5vh",
  cursor: "pointer",
}

const toggleContainerSX: SxProps = {
  marginTop: "2vh",
  marginLeft: "1vh",
  height: "2vh",
  width: "2vh",
  outline: colors.MAIN,
  outlineStyle: "solid",
  outlineWidth: "0.4vh",
  borderTopLeftRadius: "15px 100px",
  borderTopRightRadius: "100px 15px",
  borderBottomRightRadius: "15px 100px",
  borderBottomLeftRadius: "100px 15px",
  color: colors.MAIN,
  backgroundColor: colors.MAIN,
  border: "0.2vh solid",
  borderColor: colors.SECONDARY,
  cursor: "pointer",
}

function getToggleContainerSX(isDisabled: boolean): SxProps {
  return {
    ...toggleContainerSX,
    ...(isDisabled && {
      backgroundColor: "transparent",
    }),
  }
}

function getWaitingButtonsSX(isDisabled: boolean): SxProps {
  return {
    ...waitingTextButtonsSX,
    ...(isDisabled
      ? {
          pointerEvents: "none",
          color: "#cccccc",
        }
      : {
          "&:hover": {
            textShadow: "2px 2px #b3b3b3",
          },
        }),
  }
}

export { waitingTextSX, getWaitingButtonsSX, getToggleContainerSX }
