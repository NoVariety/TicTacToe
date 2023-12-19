import { SxProps } from "@mui/material"

import waitingGif from "../../images/bocchiWait.gif"

const gifPlayerSX: SxProps = {
  backgroundImage: `url(${waitingGif})`,
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "100%",
  borderRadius: "1%",
  boxShadow: "0 0 8px 8px #777777 inset",
  padding: "none !important",
}

const gifContainerSX: SxProps = {
  alignItems: "center",
  justifyContent: "center",
  marginTop: "20vh",
  width: "60vh",
  height: "60vh",
  zIndex: "100",
  outline: "none !important",
  border: "0",
  borderColor: "transparent",
  outlineColor: "transparent",
  padding: "none !important",
}

const waitingModalSX: SxProps = {
  outline: "none !important",
  border: "none !important",
  borderColor: "transparent",
  outlineColor: "transparent",
}

const waitingTextSX: SxProps = {}

export { gifPlayerSX, waitingTextSX, gifContainerSX, waitingModalSX }
