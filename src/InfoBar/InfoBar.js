import React from 'react';
import './InfoBar.css';

const InfoBar = ({player1, player1Score, player2, player2Score, currentPlayer, resetGameBoard}) => {
  return (
    <section className='players'>
      <h2 className={currentPlayer === 'X' ? 'active' : 'inactive'}>{player1}</h2>
      <h4 className={currentPlayer === 'X' ? 'active' : 'inactive'}>Score: {player1Score}</h4>
      <h3 className='vs'>VS</h3>
      <h2 className={currentPlayer === 'O' ? 'active' : 'inactive'}>{player2}</h2>
      <h4 className={currentPlayer === 'O' ? 'active' : 'inactive'}>Score: {player2Score}</h4>
      <button className='reset-btn' onClick={resetGameBoard}>Reset</button>
    </section>
  )
}

export default InfoBar;

