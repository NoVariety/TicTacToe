import { SxProps } from "@mui/material"

const rewindButtonSX: SxProps = {
  cursor: "pointer",
  height: "7vh",
  width: "7vh",
  borderRadius: "45%",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(https://cdn-icons-png.flaticon.com/128/5542/5542182.png)`,
  "&:hover": {
    borderColor: "#302c2c",
    backgroundPosition: "50% 50%",
    transition: "0.3s",
    boxShadow: "3px 6px 5px -6px hsla(0, 0%, 0%, 0.5)",
  },

  "&:disabled": {
    filter: "invert(80%)",
  },
}

export { rewindButtonSX }
