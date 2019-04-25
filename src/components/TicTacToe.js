import React, { useState } from "react";
import classNames from "classnames";
import "./TicTacToe.css";

function Square({ value, onClick }) {
  return (
    <button className="Square" onClick={onClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let winner = lines.reduce((memo, [a, b, c]) => {
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      memo = squares[a];
    }
    return memo;
  }, "");
  if (!winner && squares.every(s => s)) {
    winner = "tie";
  }
  return winner;
}

function Board({ squares, onClick }) {
  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  }

  return (
    <div className="Board">
      <div>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Stats({ isXNext, playerX = 0, ties = 0, playerO = 0 }) {
  const classes = classNames("Stats", {
    "Stats--playerX": isXNext,
    "Stats--playerO": !isXNext
  });
  return (
    <div className={classes}>
      <div className="Stats-stat Stats-playerX">
        <div>Player X</div>
        <div>{playerX}</div>
      </div>
      <div className="Stats-stat Stats-ties">
        <div>Ties</div>
        <div>{ties}</div>
      </div>
      <div className="Stats-stat Stats-playerO">
        <div>Player O</div>
        <div>{playerO}</div>
      </div>
    </div>
  );
}

function Status({ winner, onStart }) {
  return (
    <div className="Status">
      <div>Winner: {winner}</div>
      <button onClick={onStart}>Start</button>
    </div>
  );
}

export function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [stats, setStats] = useState({ playerX: 0, ties: 0, playerO: 0 });
  const [winner, setWinner] = useState("");

  function handleClick(i) {
    const moves = [...squares];
    moves[i] = isXNext ? "X" : "O";
    setSquares(moves);
    setIsXNext(!isXNext);
    const winner = calculateWinner(moves);
    if (winner) {
      setStats(stats => {
        if (winner === "X") {
          stats.playerX++;
        } else if (winner === "O") {
          stats.playerO++;
        } else {
          stats.ties++;
        }
        return { ...stats };
      });
      setWinner(winner);
    }
  }
  function handleStart() {
    setSquares(Array(9).fill(null));
    setWinner(null);
  }

  return (
    <div className="Game">
      <Board squares={squares} onClick={handleClick} />
      {winner ? (
        <Status winner={winner} onStart={handleStart} />
      ) : (
        <Stats {...stats} isXNext={isXNext} />
      )}
    </div>
  );
}
