import {
  cellTypes,
  gameStateMessages,
  hintTextOptions,
  legalMoves,
} from "../data.consts"

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

function isGameStillOngoing(gameStateMessage: gameStateMessages): boolean {
  return (
    gameStateMessage === gameStateMessages.DRAW_MESSAGE ||
    gameStateMessage === gameStateMessages.WIN_MESSAGE ||
    gameStateMessage === gameStateMessages.LOSS_MESSAGE
  )
}

function checkRowsCols(
  boardLength: number,
  tempBoard: cellTypes[][],
  setWinnerMessage: Function
): boolean {
  const FIRST_CELL_INDEX: number = 0

  let countSameRowSign: number = 0
  let countSameColSign: number = 0

  for (
    let initialIndex: number = 0;
    initialIndex < boardLength;
    initialIndex++
  ) {
    const rowSign: cellTypes = tempBoard[initialIndex][FIRST_CELL_INDEX]
    const colSign: cellTypes = tempBoard[FIRST_CELL_INDEX][initialIndex]

    for (let runIndex: number = 0; runIndex < boardLength; runIndex++) {
      if (tempBoard[initialIndex][runIndex] === rowSign) {
        countSameRowSign++
      }
      if (tempBoard[runIndex][initialIndex] === colSign) {
        countSameColSign++
      }
    }

    if (countSameRowSign === boardLength && rowSign !== cellTypes.EMPTY) {
      setWinnerMessage(rowSign)
      return true
    }
    if (countSameColSign === boardLength && colSign !== cellTypes.EMPTY) {
      setWinnerMessage(colSign)
      return true
    }

    countSameRowSign = 0
    countSameColSign = 0
  }

  return false
}

function checkSlashes(
  boardLength: number,
  tempBoard: cellTypes[][],
  setWinnerMessage: Function
): boolean {
  let countSlashSign: number = 0
  let countReverseSlashSign: number = 0

  const slashSign: cellTypes = tempBoard[0][0]
  const reverseSlashSign: cellTypes = tempBoard[boardLength - 1][0]

  let reverseIndex: number = boardLength - 1

  for (let rowColIndex: number = 0; rowColIndex < boardLength; rowColIndex++) {
    if (tempBoard[rowColIndex][rowColIndex] === slashSign) {
      countSlashSign++
    }
    if (tempBoard[rowColIndex][reverseIndex] === reverseSlashSign) {
      countReverseSlashSign++
    }
    reverseIndex--
  }

  if (countSlashSign === boardLength && slashSign !== cellTypes.EMPTY) {
    setWinnerMessage(slashSign)
    return true
  }
  if (
    countReverseSlashSign === boardLength &&
    reverseSlashSign !== cellTypes.EMPTY
  ) {
    setWinnerMessage(reverseSlashSign)
    return true
  }

  return false
}

export {
  getRandomPlayerSign,
  getRandomHint,
  createEmptyBoard,
  isBoardFull,
  createLegalMoves,
  getRandomCoordinateObject,
  isGameStillOngoing,
  checkRowsCols,
  checkSlashes,
}
