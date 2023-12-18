import { cellTypes, hintTextOptions, legalMoves } from "../data.consts"

function getRandomPlayerSign(): cellTypes {
  return Math.random() < 0.5 ? cellTypes.FIRST_PLAYER : cellTypes.SECOND_PLAYER
}

function getRandomHint(): string {
  const index = Math.floor(Math.random() * hintTextOptions.length)
  return hintTextOptions[index]
}

function createEmptyBoard(boardLength: number): cellTypes[][] {
  return Array(boardLength).fill(new Array(boardLength).fill(cellTypes.EMPTY))
}

function isBoardFull(legalMoves: legalMoves[]): boolean {
  return legalMoves.length === 0
}

function createLegalMoves(boardLength: number): Array<legalMoves> {
  let legalMovesArr: Array<legalMoves> = []
  for (let row: number = 0; row < boardLength; row++) {
    for (let col: number = 0; col < boardLength; col++) {
      legalMovesArr.push({ row, col })
    }
  }

  return legalMovesArr
}

function getRandomCoordinateObject(
  legalMovesArr: Array<legalMoves>
): legalMoves {
  return legalMovesArr[Math.floor(Math.random() * legalMovesArr.length)]
}

export {
  getRandomPlayerSign,
  getRandomHint,
  createEmptyBoard,
  isBoardFull,
  createLegalMoves,
  getRandomCoordinateObject,
}
