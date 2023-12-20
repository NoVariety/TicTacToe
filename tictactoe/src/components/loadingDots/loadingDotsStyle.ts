import { SxProps } from "@mui/material"

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
  color: "white",
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
    color: "white",
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

const loadingDotsSecondSX: SxProps = {
  ...loadingDotsSX,
  "&::before": {
    boxShadow: "9984px 0 0 -5px",
    animation: "dotPulseBefore 1.5s",
    animationDelay: "0.6s",
  },
  "&::after": {
    boxShadow: "10014px 0 0 -5px",
    animation: "dotPulseAfter 1.5s",
    animationDelay: "0.9s",
  },
}

const loadingDotsThirdSX: SxProps = {
  ...loadingDotsSX,
  "&::before": {
    boxShadow: "9984px 0 0 -5px",
    animation: "dotPulseBefore 1.5s",
    animationDelay: "1.2s",
  },
  "&::after": {
    boxShadow: "10014px 0 0 -5px",
    animation: "dotPulseAfter 1.5s",
    animationDelay: "1.5s",
  },
}

const loadingDotsFourthSX: SxProps = {
  ...loadingDotsSX,
  "&::before": {
    boxShadow: "9984px 0 0 -5px",
    animation: "dotPulseBefore 1.5s",
    animationDelay: "1.8s",
  },
  "&::after": {
    boxShadow: "10014px 0 0 -5px",
    animation: "dotPulseAfter 1.5s",
    animationDelay: "2.1s",
  },
}

const loadingDotsFifthSX: SxProps = {
  ...loadingDotsSX,
  "&::before": {
    boxShadow: "9984px 0 0 -5px",
    animation: "dotPulseBefore 1.5s",
    animationDelay: "2.4s",
  },
  "&::after": {
    boxShadow: "10014px 0 0 -5px",
    animation: "dotPulseAfter 1.5s",
    animationDelay: "2.7s",
  },
}

const loadingDotsSixthSX: SxProps = {
  ...loadingDotsSX,
  "&::before": {
    boxShadow: "9984px 0 0 -5px",
    animation: "dotPulseBefore 1.5s",
    animationDelay: "3s",
  },
  "&::after": {
    boxShadow: "10014px 0 0 -5px",
    animation: "dotPulseAfter 1.5s",
    animationDelay: "3.3s",
  },
}

const loadingDotsSeventhSX: SxProps = {
  ...loadingDotsSX,
  "&::before": {
    boxShadow: "9984px 0 0 -5px",
    animation: "dotPulseBefore 1.5s",
    animationDelay: "3.6s",
  },
  "&::after": {
    boxShadow: "10014px 0 0 -5px",
    animation: "dotPulseAfter 1.5s",
    animationDelay: "3.9s",
  },
}

const loadingDotsEighthSX: SxProps = {
  ...loadingDotsSX,
  "&::before": {
    boxShadow: "9984px 0 0 -5px",
    animation: "dotPulseBefore 1.5s",
    animationDelay: "4.2s",
  },
  "&::after": {
    boxShadow: "10014px 0 0 -5px",
    animation: "dotPulseAfter 1.5s",
    animationDelay: "4.5s",
  },
}

export {
  stackMarginSX,
  loadingDotsSX,
  createLoadingDotsSX,
  loadingDotsSecondSX,
  loadingDotsThirdSX,
  loadingDotsFourthSX,
  loadingDotsFifthSX,
  loadingDotsSixthSX,
  loadingDotsSeventhSX,
  loadingDotsEighthSX,
}
