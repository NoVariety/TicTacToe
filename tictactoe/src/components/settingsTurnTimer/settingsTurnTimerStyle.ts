import { SxProps } from "@mui/material"

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
  height: "2vh",
  width: "2vh",
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

function getToggleContainerSX(isDisabled: boolean): SxProps {
  return {
    ...toggleContainerSX,
    ...(isDisabled && {
      backgroundColor: "transparent",
    }),
  }
}

export {
  waitingContainerSX,
  propertyTitleSX,
  waitingTextSX,
  getWaitingButtonsSX,
  getToggleContainerSX,
}
