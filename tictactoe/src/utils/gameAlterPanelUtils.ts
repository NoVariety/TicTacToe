import { gameStateMessages } from "../data.consts"
import { isGameStillOngoing } from "./gameUtils"

function toggleOffRewind(
  movesMadeLengh: number,
  gameStateMessage: gameStateMessages
): boolean {
  return movesMadeLengh <= 0 || isGameStillOngoing(gameStateMessage)
}

export { toggleOffRewind }
