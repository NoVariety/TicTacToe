import { SxProps } from "@mui/material"

import liquidFill from "../../images/liquidFill.png"

const newGameButtonSX: SxProps = {
  fontFamily: "Caveat" || "sans-serif",
  width: "15rem",
  background: "transparent",
  padding: "1rem 2rem",
  fontSize: "2rem",
  fontWeight: "600",

  borderTopLeftRadius: "255px 15px",
  borderTopRightRadius: "15px 225px",
  borderBottomRightRadius: "225px 15px",
  borderBottomLeftRadius: "15px 255px",
  border: "solid 0.4vh",
  lineHeight: "4vh",
  cursor: "pointer",
  color: "#1d1d1d",
  borderRightColor: "black",
  textShadow: "0 3px 5px rgba(#000, 0.25)",
  backgroundImage: `url(${liquidFill})`,
  backgroundRepeat: "repeat-x",
  backgroundPosition: "0 -100%",
  transition: "0.5s ease",
  borderColor: "#1d1d1d",

  "&:hover": {
    backgroundPosition: "500% 100%",
    color: "white",
    boxShadow: "2px 8px 4px -6px hsla(0, 0%, 0%, 0.3)",
    transition: "1.25s ease",
  },
}

const rewindButtonSX: SxProps = {
  cursor: "pointer",
  height: "7vh",
  width: "7vh",
  borderRadius: "45%",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(https://cdn-icons-png.flaticon.com/128/5542/5542182.png)`,
  zIndex: "100",
  marginTop: "2vh",

  "&:hover": {
    borderColor: "#1d1d1d",
    boxShadow: "3px 6px 5px -6px hsla(0, 0%, 0%, 0.5)",
  },

  "&:disabled": {
    filter: "invert(80%)",
  },
}

const newGameContainerSX: SxProps = {
  marginTop: "1.4vh",
  marginLeft: "1vh",
}

const actionButtonsGridSX: SxProps = {
  direction: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "none",
}

function getGameStateProps(gameStatePauseOpen: boolean): SxProps {
  return {
    ...newGameContainerSX,
    ...(gameStatePauseOpen && {
      outline: "5px dashed #555",
      outlineColor: "white",
      zIndex: "100",
      transition: "0.2s",

      "&:hover": {
        transition: "0.2s",
        outlineColor: "transparent",
      },
    }),
  }
}

function getRewindDisabledProps(
  gameStatePauseOpen: boolean,
  rewindPauseOpen: boolean,
  movesMadeLength: number
): SxProps {
  return {
    ...rewindButtonSX,
    ...(rewindPauseOpen && { filter: "none !important" }),
    ...(gameStatePauseOpen && { filter: "none !important" }),
    ...(rewindPauseOpen &&
      movesMadeLength >= 1 && {
        outline: "5px dashed #555",
        borderRadius: "4vh",
        outlineColor: "white",
        transition: "0.2s",

        "&:hover": {
          transition: "0.2s",
          outlineColor: "transparent",
        },
      }),
  } as SxProps
}

export {
  newGameButtonSX,
  rewindButtonSX,
  actionButtonsGridSX,
  newGameContainerSX,
  getGameStateProps,
  getRewindDisabledProps,
}
