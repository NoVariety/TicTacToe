import {
  stackMarginSX,
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
    //!dynamically assign times instead of different stylings
    <Stack direction="row" spacing={2} sx={stackMarginSX}>
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
