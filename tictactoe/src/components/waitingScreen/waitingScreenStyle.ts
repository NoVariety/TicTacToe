import { SxProps } from "@mui/material"

import waitingGif from "../../images/bocchiWaitShort.gif"
import waitingGif2 from "../../images/bocchiWalk.gif"

const gifPlayerSX: SxProps = {
  backgroundImage: `url(${waitingGif})`,
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "100%",
  boxShadow: "0 0 .5rem .5rem #777777 inset",
}

const gifContainerSX: SxProps = {
  alignItems: "center",
  justifyContent: "center",
  marginTop: "20vh",
  width: "60vh",
  height: "60vh",
  zIndex: "100",
  outline: "none !important",
}

const waitingModalSX: SxProps = {
  outline: "none !important",
  border: "none !important",
}

export { gifPlayerSX, gifContainerSX, waitingModalSX }
