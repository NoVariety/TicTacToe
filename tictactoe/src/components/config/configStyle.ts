import { SxProps } from "@mui/material"
import background from "../../images/configBG.png"
import backImage from "../../images/backImageColoerd.png"

const BUTTON_LEFT_DISTANCE: number = 39.5
const BUTTON_BOTTOM_DISTANCE: number = 1.5

const pauseSubTextSX: SxProps = {
  fontFamily: "Caveat" || "sans-serif",
  fontWeight: "600",
  fontSize: "3vh",
  color: "white",
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
}

const configContainerSX: SxProps = {
  height: "50vh",
  width: "18vw",
  borderTopLeftRadius: "15px 100px",
  borderTopRightRadius: "100px 15px",
  borderBottomRightRadius: "15px 100px",
  borderBottomLeftRadius: "100px 15px",
  border: "solid 0.1vh",
  outline: "#1d1d1d",
  outlineStyle: "dashed",
  outlineWidth: "0.5vh",
  color: "white",
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
  backgroundImage: `url(https://cdn-icons-png.flaticon.com/128/5553/5553521.png)`,
  position: "absolute",
  bottom: `${BUTTON_BOTTOM_DISTANCE}vh`,
  left: "1.5vh",
  transition: "0.2s",

  "&:hover": {
    borderColor: "#1d1d1d",
    boxShadow: "3px 6px 5px -6px hsla(0, 0%, 0%, 0.5)",
  },

  "&:disabled": {
    filter: "invert(80%)",
  },
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
      backgroundImage: `url(${backImage})`,
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
  pauseSubTextSX,
  configContainerSX,
  configureButtonSX,
  getPauseSubTextToggleSX,
  getConfigureButtonToggleSX,
}
