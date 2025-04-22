import { Dispatch, SetStateAction, useState } from "react";

import {
  configContainerSX,
  configModalSX,
  getPauseSubTextToggleSX,
  getConfigureButtonToggleSX,
  settingsTitleSX,
} from "./settingsStyle";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";

import { gifWaitingTimeMillis } from "../../data.consts";
import SettingsTurnTimer from "../settingsTurnTimer/settingsTurnTimer";
import SettingsBoardLength from "../settingsBoardSize/settingsBoardLength";

type props = {
  waitingTime: gifWaitingTimeMillis;
  setWaitingTime: Dispatch<SetStateAction<gifWaitingTimeMillis>>;
  isWaitingTimeEnabled: boolean;
  setIsWaitingTimeEnabled: Dispatch<SetStateAction<boolean>>;
  setBoardLength: Dispatch<SetStateAction<number>>;
  tempBoardLength: number;
  setTempBoardLength: Dispatch<SetStateAction<number>>;
};

export default function Settings({
  waitingTime,
  setWaitingTime,
  isWaitingTimeEnabled,
  setIsWaitingTimeEnabled,
  setBoardLength,
  tempBoardLength,
  setTempBoardLength,
}: props) {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  return (
    <Container>
      <Stack direction="row" spacing={0}>
        <Container
          sx={{ ...getConfigureButtonToggleSX(isSettingsOpen) }}
          onClick={() => {
            setIsSettingsOpen((prev) => !prev);
          }}
        ></Container>

        <Typography
          variant="h4"
          sx={{ ...getPauseSubTextToggleSX(isSettingsOpen) }}
        >
          {`< ${isSettingsOpen ? "close" : "open"} game settings`}
        </Typography>
      </Stack>

      <Modal open={isSettingsOpen} sx={configModalSX}>
        <Slide direction="right" in={isSettingsOpen} mountOnEnter unmountOnExit>
          <Container sx={configContainerSX}>
            <Typography variant="h2" sx={settingsTitleSX}>
              {"< Settings >"}
            </Typography>

            <SettingsTurnTimer
              waitingTime={waitingTime}
              setWaitingTime={setWaitingTime}
              isWaitingTimeEnabled={isWaitingTimeEnabled}
              setIsWaitingTimeEnabled={setIsWaitingTimeEnabled}
            />

            <SettingsBoardLength
              setBoardLength={setBoardLength}
              tempBoardLength={tempBoardLength}
              setTempBoardLength={setTempBoardLength}
            />
          </Container>
        </Slide>
      </Modal>
    </Container>
  );
}
