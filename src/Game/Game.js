import React from 'react';
import './Game.css';


const Game = ({ boardStatus, handleClick, currentPlayer }) => {
  const selections = boardStatus.map((selection, i) => {
    return (
      <div
        className={`square${i} ${boardStatus[i] === 'X' ? 'exes' : 'ohs'}`}
        data-index={i}
        onClick={e => handleClick(i)}
        key={`square${i}`}
      >
        {selection}
      </div>)
  })
  return (
    <section className='game-container'>
      <div className='game-board'>
        {selections}
      </div>
    </section>
  )
}

export default Game;