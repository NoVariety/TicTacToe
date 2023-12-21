import { SxProps } from "@mui/material"
import background from "../../images/configBG.png"
import backwardsImage from "../../images/backwardsArrowColoerd.png"
import forwardImage from "../../images/forwardArrow.png"

const BUTTON_LEFT_DISTANCE: number = 39.5
const BUTTON_BOTTOM_DISTANCE: number = 1.5

const pauseSubTextSX: SxProps = {
  fontFamily: "Caveat" || "sans-serif",
  fontWeight: "600",
  fontSize: "3vh",
  color: "#eeeeee",
  textAlign: "center",
  textShadow:
    "-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000",
  cursor: "default",
  zIndex: "10000",
  pointerEvents: "none",
  position: "absolute",
  bottom: `${BUTTON_BOTTOM_DISTANCE}vh`,
  left: `${BUTTON_LEFT_DISTANCE + 6.5}vh`,
  transition: "0.2s",
  userSelect: "none",
}

const configContainerSX: SxProps = {
  height: "50vh",
  width: "36vh",
  borderTopLeftRadius: "15px 100px",
  borderTopRightRadius: "100px 15px",
  borderBottomRightRadius: "15px 100px",
  borderBottomLeftRadius: "100px 15px",
  border: "solid 0.1vh",
  outline: "#1d1d1d",
  outlineStyle: "dashed",
  outlineWidth: "0.5vh",
  color: "#eeeeee",
  marginTop: "48.5vh",
  marginLeft: "1.5vh",
  backgroundImage: `url(${background})`,
}

const configureButtonSX: SxProps = {
  cursor: "pointer",
  height: "5.5vh",
  width: "5.5vh",
  borderRadius: "45%",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${forwardImage})`,
  position: "absolute",
  bottom: `${BUTTON_BOTTOM_DISTANCE}vh`,
  left: "1.5vh",
  transition: "0.2s",

  "&:hover": {
    borderColor: "#1d1d1d",
    boxShadow: "3px 6px 5px -6px hsla(0, 0%, 0%, 0.5)",
  },
}

const configModalSX: SxProps = {
  backdropFilter: "blur(4px)",
  backgroundColor: "rgb(255, 255, 250, 0.5)",
}

const waitingContainerSX: SxProps = {
  marginTop: "3vh",
}

const propertyTitleSX: SxProps = {
  fontFamily: "Caveat" || "sans-serif",
  fontWeight: "600",
  fontSize: "3vh",
  color: "#1d1d1d",
  textAlign: "center",
  userSelect: "none",
}

const waitingTextSX: SxProps = {
  fontFamily: "Caveat" || "sans-serif",
  fontWeight: "600",
  fontSize: "4vh",
  color: "#1d1d1d",
  userSelect: "none",
  width: "5vh",
}

const waitingTextButtonsSX: SxProps = {
  fontFamily: "Caveat" || "sans-serif",
  fontWeight: "600",
  color: "#1d1d1d",
  userSelect: "none",
  fontSize: "4.5vh",
  cursor: "pointer",
}

const toggleContainerSX: SxProps = {
  marginTop: "2vh",
  marginLeft: "1vh",
  height: "2.2vh",
  width: "2.2vh",
  maxHeight: "2.2vh",
  minHeight: "2.2vh",
  outline: "#1d1d1d",
  outlineStyle: "solid",
  outlineWidth: "0.4vh",
  borderTopLeftRadius: "15px 100px",
  borderTopRightRadius: "100px 15px",
  borderBottomRightRadius: "15px 100px",
  borderBottomLeftRadius: "100px 15px",
  color: "#1d1d1d",
  backgroundColor: "#1d1d1d",
  border: "0.2vh solid #eeeeee ",
  cursor: "pointer",
}

function getWaitingButtonsSX(isDisabled: boolean): SxProps {
  return {
    ...waitingTextButtonsSX,
    ...(isDisabled && {
      pointerEvents: "none",
      color: "#cccccc",
    }),
  }
}

function getToggleContainerSX(isDisabled: boolean): SxProps {
  return {
    ...toggleContainerSX,
    ...(isDisabled && {
      backgroundColor: "transparent",
    }),
  }
}

function getPauseSubTextToggleSX(drawerOpen: boolean): SxProps {
  return {
    ...pauseSubTextSX,
    ...(!drawerOpen && {
      color: "#1d1d1d",
      textShadow: "none",
      fontSize: "3vh",
      fontWeight: "bold",
      left: `${8}vh`,
      transition: "0.2s",
    }),
  }
}

function getConfigureButtonToggleSX(drawerOpen: boolean): SxProps {
  return {
    ...configureButtonSX,
    ...(drawerOpen && {
      backgroundImage: `url(${backwardsImage})`,
      backgroundRepeat: "no-repeat, repeat-y",
      left: `${BUTTON_LEFT_DISTANCE}vh`,
      zIndex: "10000",
      outline: "4px dashed #555",
      borderRadius: "4vh",
      outlineColor: "#eeeeee",
      transition: "0.2s",

      "&:hover": {
        transition: "0.2s",
        outlineColor: "transparent",
      },
    }),
  }
}

export {
  configContainerSX,
  configModalSX,
  waitingContainerSX,
  propertyTitleSX,
  waitingTextSX,
  getWaitingButtonsSX,
  getToggleContainerSX,
  getPauseSubTextToggleSX,
  getConfigureButtonToggleSX,
}
