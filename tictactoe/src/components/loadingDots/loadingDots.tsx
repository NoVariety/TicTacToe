import {
  loadingDotsSX,
  loadingDotsSecondSX,
  loadingDotsThirdSX,
  loadingDotsFourthSX,
  loadingDotsFifthSX,
  loadingDotsSixthSX,
  loadingDotsSeventhSX,
  loadingDotsEighthSX,
} from "./loadingDotsStyle"

import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"

export default function LoadingDots() {
  return (
    <Stack direction="row" spacing={2} sx={{ marginLeft: "0.8vh" }}>
      <Container sx={loadingDotsSX}></Container>
      <Container sx={loadingDotsSecondSX}></Container>
      <Container sx={loadingDotsThirdSX}></Container>
      <Container sx={loadingDotsFourthSX}></Container>
      <Container sx={loadingDotsFifthSX}></Container>
      <Container sx={loadingDotsSixthSX}></Container>
      <Container sx={loadingDotsSeventhSX}></Container>
      <Container sx={loadingDotsEighthSX}></Container>
    </Stack>
  )
}
