import { SxProps } from "@mui/material"

const boardCellSX: SxProps = {
  height: "15vh",
  width: "15vh",
  background: "transparent",
  padding: "0.5rem 0.5rem",
  margin: "0 0.5rem",
  marginBottom: "1rem",
  color: "#302c2c",
  borderTopLeftRadius: "255px 15px",
  borderTopRightRadius: "15px 225px",
  borderBottomRightRadius: "225px 15px",
  borderBottomLeftRadius: "15px 255px",
  border: "solid 0.5vh",
  cursor: "crosshair",
  float: "center",
}

const signSX: SxProps = {
  textAlign: "center",
  lineHeight: "10vh",
  margin: "auto",
  color: "#302c2c",
  fontFamily: "Permanent Marker" || "sans-serif",
  fontSize: "5vw",
}

export { boardCellSX, signSX }
