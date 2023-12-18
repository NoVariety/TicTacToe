import { SxProps } from "@mui/material"

const gameHintsSX: SxProps = {
  fontFamily: "Caveat" || "sans-serif",
  cursor: "vertical-text",
  marginBottom: "2rem",
  maxWidth: "65vh",
  height: "6vh",
  fontSize: "3.3vh",
  textAlign: "center",
  wordWrap: "break-word",
  fontWeight: "600",
}

const newGameButtonSX: SxProps = {
  fontFamily: "Caveat" || "sans-serif",
  width: "15rem",
  background: "transparent",
  padding: "1rem 2rem",
  margin: "1rem",
  fontSize: "2rem",
  fontWeight: "600",

  borderTopLeftRadius: "255px 15px",
  borderTopRightRadius: "15px 225px",
  borderBottomRightRadius: "225px 15px",
  borderBottomLeftRadius: "15px 255px",
  border: "solid 0.4vh",
  lineHeight: "4vh",
  cursor: "pointer",
  color: "#302c2c",
  borderRightColor: "black",
  textShadow: "0 3px 5px rgba(#000, 0.25)",
  backgroundImage:
    "url(https://web.archive.org/web/20160312084140im_/http://splatoon.nintendo.com/assets/img/nav-bg-fill-blue.png?1443460871)",
  backgroundRepeat: "repeat-x",
  backgroundPosition: "0 -100%",
  transition: "1.25s ease",
  filter: "brightness(0.5) saturate(0%)",

  "&:hover": {
    borderColor: "#302c2c",
    backgroundPosition: "500% 100%",
    color: "rgb(255, 255, 255)",
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

  "&:hover": {
    borderColor: "#302c2c",
    boxShadow: "3px 6px 5px -6px hsla(0, 0%, 0%, 0.5)",
  },

  "&:active": {
    backgroundPosition: "50% 50%",
    transition: "0.3s",
  },

  "&:disabled": {
    filter: "invert(80%)",
  },
}

export { gameHintsSX, newGameButtonSX, rewindButtonSX }
