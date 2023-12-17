import { rewindButtonSX } from "./rewindStyle"

import Button from "@mui/material/Button"

type props = {
  isRewindDisabled: Function
}

export default function Rewind(props: props) {
  return (
    <Button disabled={props.isRewindDisabled()} sx={rewindButtonSX}></Button>
  )
}
