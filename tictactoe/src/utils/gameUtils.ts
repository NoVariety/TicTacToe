import { cellTypes, hintTextOptions, legalMovesObj } from "../data.consts"

function getRandomPlayerSign(): cellTypes {
  return Math.random() < 0.5 ? cellTypes.FIRST_PLAYER : cellTypes.SECOND_PLAYER
}

function getRandomCoordinate(boardLength: number): number {
  return Math.floor(Math.random() * boardLength)
}

function getRandomHint(): string {
  const index = Math.floor(Math.random() * hintTextOptions.length)
  return hintTextOptions[index]
}

function createEmptyBoard(boardLength: number): cellTypes[][] {
  return Array(boardLength).fill(new Array(boardLength).fill(cellTypes.EMPTY))
}
function isBoardFull(board: cellTypes[][]): boolean {
  return board.every((row) => row.every((col) => col !== cellTypes.EMPTY))
}

function createLegalMoves(boardLength: number): Array<legalMovesObj> {
  let legalMovesArr: Array<legalMovesObj> = []
  for (let row: number = 0; row < boardLength; row++) {
    for (let col: number = 0; col < boardLength; col++) {
      legalMovesArr.push({ row: row, col: col })
    }
  }

  return legalMovesArr
}

function getRandomCoordinateObject(
  legalMovesArr: Array<legalMovesObj>
): legalMovesObj {
  return legalMovesArr[Math.floor(Math.random() * legalMovesArr.length)]
}

export {
  getRandomPlayerSign,
  getRandomCoordinate,
  getRandomHint,
  createEmptyBoard,
  isBoardFull,
  createLegalMoves,
  getRandomCoordinateObject,
}
