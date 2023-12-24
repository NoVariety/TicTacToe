import { SxProps } from "@mui/material"

import { gifWaitingTimeMillis } from "../../data.consts"

import waitingGifShort from "../../images/bocchiWalk.gif"
import waitingGifAverage from "../../images/bocchiTrash.gif"
import waitingGifLong from "../../images/bocchiWait.gif"

const gifPlayerSX: SxProps = {
  backgroundImage: `url(${waitingGifShort})`,
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

const dotsContainerSX: SxProps = {
  position: "absolute",
  top: "77%",
  left: "auto",
  right: "auto",
  marginLeft: "-2.5vh",
}

function getGifPlayerSX(waitingTime: gifWaitingTimeMillis): SxProps {
  return {
    ...gifPlayerSX,
    ...(waitingTime === gifWaitingTimeMillis.MID && {
      backgroundImage: `url(${waitingGifAverage})`,
    }),
    ...(waitingTime === gifWaitingTimeMillis.MAX && {
      backgroundImage: `url(${waitingGifLong})`,
    }),
  }
}

export {
  gifPlayerSX,
  gifContainerSX,
  waitingModalSX,
  dotsContainerSX,
  getGifPlayerSX,
}
