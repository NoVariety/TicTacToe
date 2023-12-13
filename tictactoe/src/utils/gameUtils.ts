import { cellTypes, hintTextOptions, BOARD_LENGTH } from "../data.consts"

function getRandomPlayerSign(): cellTypes {
  return Math.random() < 0.5 ? cellTypes.FIRST_PLAYER : cellTypes.SECOND_PLAYER
}

function getRandomCoordinate(): number {
  return Math.floor(Math.random() * BOARD_LENGTH)
}

function getRandomHint(): string {
  const index = Math.floor(Math.random() * hintTextOptions.length)
  return hintTextOptions[index]
}

function createEmptyBoard(): cellTypes[][] {
  return Array(BOARD_LENGTH).fill(new Array(BOARD_LENGTH).fill(cellTypes.EMPTY))
}
function isBoardFull(board: cellTypes[][]): boolean {
  // for (let rowIndex: number = 0; rowIndex < BOARD_LENGTH; rowIndex++) {
  //   for (let colIndex: number = 0; colIndex < BOARD_LENGTH; colIndex++) {
  //     if (tempBoard[rowIndex][colIndex] === cellTypes.EMPTY) {
  //       return false
  //     }
  //   }
  // }

  // return true
  return board.every((row) => row.every((col) => col !== cellTypes.EMPTY))
}

export {
  getRandomPlayerSign,
  getRandomCoordinate,
  getRandomHint,
  createEmptyBoard,
  isBoardFull,
}
