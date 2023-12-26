import { SxProps } from "@mui/material"

import { colors } from "../../style.consts"

const boardCellSX: SxProps = {
  background: "transparent",
  color: colors.MAIN,
  borderTopLeftRadius: "255px 15px",
  borderTopRightRadius: "15px 225px",
  borderBottomRightRadius: "225px 15px",
  borderBottomLeftRadius: "15px 255px",
  cursor: "crosshair",

  "&:hover": {
    boxShadow: "2px 8px 4px -6px hsla(0, 0%, 0%, 0.3)",
  },
}

const signSX: SxProps = {
  fontFamily: "Permanent Marker" || "sans-serif",
  textAlign: "center",
  margin: "auto",
  color: colors.MAIN,
}

function getBoardCellSX(boardLength: number): SxProps {
  return {
    ...boardCellSX,
    height: `${45 / boardLength}vh`,
    width: `${45 / boardLength}vh`,
    padding: `${3 / boardLength}vh ${3 / boardLength}vh`,
    margin: `0 ${2.25 / boardLength}vh ${4.5 / boardLength}vh`,
    border: `solid ${1.5 / boardLength}vh`,
  }
}

function getSignSX(boardLength: number): SxProps {
  return {
    ...signSX,
    fontSize: `${30 / boardLength}vh`,
    lineHeight: `${28 / boardLength}vh`,
  }
}

export { getBoardCellSX, getSignSX }
