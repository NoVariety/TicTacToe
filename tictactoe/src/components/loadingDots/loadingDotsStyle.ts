import { SxProps } from "@mui/material"

import { colors } from "../../style.consts"

const stackMarginSX: SxProps = {
  marginLeft: "0.8vh",
}

const loadingDotsSX: SxProps = {
  position: "relative",
  left: "-9999px",
  width: "10px",
  height: "10px",
  borderRadius: "5px",
  backgroundColor: "#9880ff",
  color: colors.SECONDARY,
  boxShadow: "9999px 0 0 -5px",
  animation: "1s infinite linear",
  zIndex: "100",

  "&::before, &::after": {
    content: '""',
    display: "inline-block",
    position: "absolute",
    top: "0",
    width: "10px",
    height: "10px",
    borderRadius: "5px",
    backgroundColor: "#9880ff",
    color: colors.SECONDARY,
  },
  "&::before": {
    boxShadow: "9984px 0 0 -5px",
    animation: "dotPulseBefore 1.5s",
  },
  "&::after": {
    boxShadow: "10014px 0 0 -5px",
    animation: "dotPulseAfter 1.5s",
    animationDelay: "0.3s",
  },

  "@keyframes dotPulseBefore": {
    "0%": {
      boxShadow: "9984px 0 0 -5px",
    },
    "30%": {
      boxShadow: "9984px 0 0 2px",
    },
    "60%, 100%": {
      boxShadow: "9984px 0 0 -5px",
    },
  },
  "@keyframes dotPulseAfter": {
    "0%": {
      boxShadow: "10014px 0 0 -5px",
    },
    "30%": {
      boxShadow: "10014px 0 0 2px",
    },
    "60%, 100%": {
      boxShadow: "10014px 0 0 -5px",
    },
  },
}

function createLoadingDotsSX(
  beforeTimestamp: number,
  afterTimestamp: number
): SxProps {
  return {
    ...loadingDotsSX,
    "&::before": {
      boxShadow: "9984px 0 0 -5px",
      animation: "dotPulseBefore 1.5s",
      animationDelay: `${beforeTimestamp}s`,
    },
    "&::after": {
      boxShadow: "10014px 0 0 -5px",
      animation: "dotPulseAfter 1.5s",
      animationDelay: `${afterTimestamp}s`,
    },
  }
}

export { stackMarginSX, createLoadingDotsSX }
