import { useState } from 'react'
import { calculateWinner } from './utils.js'

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={() => onClick()}>
      {value}
    </button>
  )
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    const newSquares = squares.slice()
    newSquares[i] = xIsNext ? 'X' : 'O'
    onPlay(newSquares)
  }

  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />
  }

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [stepNumber, setStepNumber] = useState(0)
  const xIsNext = stepNumber % 2 === 0
  const currentSquares = history[stepNumber]

  function handlePlay(newSquares) {
    let newHistory = history.slice(0, stepNumber + 1).concat([newSquares])
    setHistory(newHistory)
    setStepNumber(newHistory.length - 1)
  }

  function jumpTo(step) {
    setStepNumber(step)
  }

  const moves = history.map((step, move) => {
    const description = move > 0 ? `Go to move #${move}` : 'Go to game start'
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
