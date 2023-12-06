import React from "react"
import "./App.css"
import Grid from "@mui/material/Grid"

import Game from "./components/game"

function App() {
  return (
    <main>
      <div className="app">
        <Grid container justifyContent="center" sx={{ height: "20vh" }}>
          <h1 className="app-title">Tic Tac Toe</h1>
        </Grid>
        <Game />
      </div>
    </main>
  )
}

export default App
