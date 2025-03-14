import { useState } from 'react'
import confetti from 'canvas-confetti'

import { TURNS } from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'

import { Square } from './components/Square.jsx'
import { WinnerModal } from './components/WinnerModal.jsx'

import { saveGameStorage, saveWinnerStorage, resetGameStorage } from './logic/storage/index.js'

function App() {
  // NO HACER ESTO YA QUE SE EJECUTA EN CADA RENDER Y ES LENTO. 
  // const savedBoard = window.localStorage.getItem('board')

  const [board, setBoard] = useState(() => {
    const savedBoard = window.localStorage.getItem('board')

    return savedBoard ? JSON.parse(savedBoard) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const savedTurn = window.localStorage.getItem('turn')

    return savedTurn ?? TURNS.X
  })

  const [winner, setWinner] = useState(() => {
    const savedWinner = window.localStorage.getItem('winner')

    if (savedWinner) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.8 },
      })
      return savedWinner
    }
    return null
  })

  const resetGame = () => {
    setBoard(Array(9).fill(null))

    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    // NO SE MODIFICAN NUNCA LAS PROPS DE UN ESTADO
    // POR NO TENER PROBLEMAS CON EL RENDERIZADO

    // si la casilla ya tiene un valor, no se puede modificar
    if (board[index] || winner) return

    // actualizar tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // comprobar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard)

    if (newWinner) {
      setWinner(newWinner) //Los renderizados en react son asincronos
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.8 },
      })

      saveWinnerStorage(newWinner)

    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }

    // cambiar de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGameStorage({ board: newBoard, turn: newTurn })
  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reiniciar</button>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })

        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>


  )
}

export default App
