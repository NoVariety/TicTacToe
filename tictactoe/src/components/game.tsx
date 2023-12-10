import React from "react"
import "./game.css"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"

import Cell from "./cell"

import { cellTypes, hintTextOptions } from "../data"

function Game() {
  const BOARD_LENGTH: number = 3

  const [playerSign, setPlayerSign] = React.useState<cellTypes>(
    Math.random() < 0.5 ? cellTypes.FIRST_PLAYER : cellTypes.SECOND_PLAYER
  )

  function getRandomHint(): string {
    const index = Math.floor(Math.random() * hintTextOptions.length)
    return hintTextOptions[index]
  }

  const [hintsText, setHintsText] = React.useState<string>(getRandomHint())

  function initializeBoard(): cellTypes[][] {
    return Array(BOARD_LENGTH)
      .fill(cellTypes.EMPTY)
      .map((row) => new Array(BOARD_LENGTH).fill(cellTypes.EMPTY))
  }

  const [board, setBoard] = React.useState<cellTypes[][]>(
    // [[cellTypes.EMPTY, cellTypes.EMPTY, cellTypes.EMPTY],
    // [cellTypes.EMPTY, cellTypes.FIRST_PLAYER, cellTypes.EMPTY],
    // [cellTypes.EMPTY, cellTypes.EMPTY, cellTypes.EMPTY],]
    initializeBoard()
  )

  function mapBoard(): React.ReactElement {
    return (
      <div>
        <Grid container item justifyContent="center" alignItems="center">
          {board.map((row, rowIndex) => {
            return (
              <Box gridRow="span 3">
                {Array.from(row).map((_, colIndex) => (
                  <Cell
                    sign={row[colIndex]}
                    index={colIndex}
                    playTurn={() => playTurn(rowIndex, colIndex)}
                  />
                ))}
              </Box>
            )
          })}
        </Grid>
      </div>
    )
  }

  // let computerTurnFlag: boolean =
  //   playerSign === cellTypes.FIRST_PLAYER ? false : true
  // console.log("f " + computerTurnFlag)

  let computerTurnFlag: boolean =
    playerSign === cellTypes.FIRST_PLAYER ? false : true

  let tempBoard: cellTypes[][] = board.map((arr) => {
    return arr.slice()
  })

  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0)

  React.useEffect(() => {
    console.log(computerTurnFlag)
    if (computerTurnFlag) {
      computerTurnFlag = false

      console.log("aa")

      tempBoard[getRandomCoordinate()][getRandomCoordinate()] =
        cellTypes.FIRST_PLAYER
      setBoard(tempBoard)
    }
    forceUpdate()
  }, [])

  function changeSign(cellSign: cellTypes, playSign: cellTypes): cellTypes {
    if (cellSign === cellTypes.EMPTY) {
      computerTurnFlag = false
      // setDrawCounter((prevDrawCounter) => prevDrawCounter + 1)

      return playSign
    } else {
      return cellSign
    }
  }

  // function changeCell(
  //   rowIndex: number,
  //   colIndex: number,
  //   playSign: cellTypes
  // ): void {
  //   setBoard((prevBoard) => {
  //     return prevBoard.map((row, rIndex) => {
  //       return row.map((cell, cIndex) => {
  //         if (rIndex === rowIndex && cIndex === colIndex) {
  //           // console.log("curr turn: " + playSign)
  //           // console.log("rIndex = " + rIndex)
  //           // console.log("rowIndex = " + rowIndex)
  //           // console.log("cIndex = " + cIndex)
  //           // console.log("colIndex = " + colIndex)
  //           return changeSign(cell, playSign)
  //         }
  //         return cell
  //         // return rIndex === rowIndex && cIndex === colIndex
  //         //   ? changeSign(prevCell, playSign)
  //         //   : prevCell
  //       })
  //     })
  //   })
  // }

  function changeCell(
    rowIndex: number,
    colIndex: number,
    playSign: cellTypes
  ): void {
    tempBoard[rowIndex][colIndex] = playSign
    setBoard(tempBoard)
    mapBoard()
  }

  // const [drawCounter, setDrawCounter] = React.useState<number>(0) // ! remove later if not needed

  function isBoardFull(): boolean {
    for (let rowIndex = 0; rowIndex < BOARD_LENGTH; rowIndex++) {
      for (let colIndex = 0; colIndex < BOARD_LENGTH; colIndex++) {
        if (tempBoard[rowIndex][colIndex] === cellTypes.EMPTY) {
          return false
        }
      }
    }

    return true
  }

  function computerTurn(): void {
    const computerSign: cellTypes =
      playerSign === cellTypes.FIRST_PLAYER
        ? cellTypes.SECOND_PLAYER
        : cellTypes.FIRST_PLAYER
    let rowIndex: number = getRandomCoordinate()
    let colIndex: number = getRandomCoordinate()
    let sign: cellTypes = cellTypes.EMPTY

    // while (computerTurnFlag && drawCounter < MAX_TURNS) {
    // TODO: check board if full as a condition for the while
    while (computerTurnFlag) {
      rowIndex = getRandomCoordinate()
      colIndex = getRandomCoordinate()
      sign = changeSign(tempBoard[rowIndex][colIndex], computerSign)
    }

    changeCell(rowIndex, colIndex, sign) //! problem: board doesnt update fast enough. possible solution: temp board for all the stuff and useeffect to update board
  }

  function playTurn(rowIndex: number, colIndex: number): void {
    if (isBoardFull()) {
      alert("Board is full!") // TODO: change to html element
    } else {
      if (tempBoard[rowIndex][colIndex] !== cellTypes.EMPTY) {
        alert("The cell you clicked is already filled!") // TODO: change to html element
      } else {
        setHintsText(getRandomHint())

        changeCell(rowIndex, colIndex, playerSign)
        // setComputerTurnFlag(true)
        computerTurnFlag = true

        if (!isBoardFull()) {
          computerTurn()
        }

        // setDrawCounter((prevDrawCounter) => prevDrawCounter + 1)
      }
    }
  }

  function getRandomCoordinate(): number {
    return Math.floor(Math.random() * (BOARD_LENGTH - 0))
  }

  return (
    <div className="board">
      <main className="board-main">
        <Grid container justifyContent="center">
          <h2 className="game-hints">{hintsText}</h2>
        </Grid>

        {mapBoard()}

        <Grid container justifyContent="center">
          <button className="replay-button">NEW GAME</button>
        </Grid>
      </main>
    </div>
  )
}

export default Game
