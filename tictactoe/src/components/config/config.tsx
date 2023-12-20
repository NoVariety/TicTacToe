import { useState } from "react"

import {
  configContainerSX,
  getPauseSubTextToggleSX,
  getConfigureButtonToggleSX,
} from "./configStyle"

import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import Slide from "@mui/material/Slide"

export default function Config() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  return (
    <Container>
      <Stack direction="row" spacing={0}>
        <Container
          sx={{ ...getConfigureButtonToggleSX(drawerOpen) }}
          onClick={() => {
            setDrawerOpen((prev) => !prev)
          }}
        ></Container>

        <Typography
          variant="h4"
          sx={{ ...getPauseSubTextToggleSX(drawerOpen) }}
        >
          {`< ${drawerOpen ? "close" : "open"} configuration`}
        </Typography>
      </Stack>

      <Modal
        open={drawerOpen}
        sx={{
          backdropFilter: "blur(4px)",
          backgroundColor: "rgb(255, 255, 250, 0.5)",
        }}
      >
        <Slide direction="right" in={drawerOpen} mountOnEnter unmountOnExit>
          <Container sx={configContainerSX}></Container>
        </Slide>
      </Modal>
    </Container>
  )
}
