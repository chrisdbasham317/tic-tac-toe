import React, { Component } from 'react';
import './App.css';
import Game from '../Game/Game';
import InfoBar from '../InfoBar/InfoBar';
import SignInModal from '../GameModal/SignInModal';
import GameEndModal from '../GameModal/GameEndModal';

class App extends Component {
  constructor() {
    super();
    this.state = {
      player1: 'Player 1',
      player1Score: 0,
      player2: 'Player 2',
      player2Score: 0,
      boardStatus: ['', '', '', '', '', '', '', '', ''],
      currentPlayer: 'X',
      gameEnd: false,
      tieGame: false,
      winner: ''
    }
  }

  updatePlayerNames = (p1, p2) => {
    this.setState({
      player1: p1,
      player2: p2
    })
  }

  handleClick = async (i) => {
    const { boardStatus, currentPlayer } = this.state;
    const boardUpdate = boardStatus.slice();
    if (boardUpdate[i] === '') {
      boardUpdate.splice(i, 1, currentPlayer);
      await this.setState({ boardStatus: boardUpdate });
      this.updateCurrentPlayer();
      this.checkBoard();
    }
  }

  updateCurrentPlayer = () => {
    const { currentPlayer } = this.state;
    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
    this.setState({ currentPlayer: nextPlayer });
  }

  checkBoard = () => {
    const winPaths = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    const pathCheck = winPaths.map(path => {
      return path.map(square => this.state.boardStatus[square]);
    });
    this.updateStatus(pathCheck);
  }

  updateStatus = (paths) => {
    let { player1, player2, player1Score, player2Score } = this.state;
    paths.forEach(async path => {
      if (path.every(square => square === 'X')) {
        await this.setState({
          winner: player1,
          player1Score: player1Score += 100,
          gameEnd: true,
        });
      } else if (path.every(square => square === 'O')) {
        await this.setState({
          winner: player2,
          player2Score: player2Score += 100,
          gameEnd: true,
        });
      }
    });
    this.checkForTie();
  };

  checkForTie = () => {
    let { winner, boardStatus, player1Score, player2Score } = this.state;
    if (winner === '' && boardStatus.every(square => square !== '')) {
      this.setState({
        player1Score: player1Score += 50,
        player2Score: player2Score += 50,
        tieGame: true,
        gameEnd: true,
      })
    }
  }

  resetGameBoard = (e) => {
    e.preventDefault();
    this.setState({
      boardStatus: ['', '', '', '', '', '', '', '', ''],
      tieGame: false,
      winner: '',
      gameEnd: false,
    });
  }

  render() {
    let { boardStatus, player1, player1Score, player2, player2Score, currentPlayer, gameEnd, tieGame, winner } = this.state;
    return (
      <div className="App">
        <SignInModal
          updatePlayerNames={this.updatePlayerNames}
        />
        <GameEndModal
          gameEnd={gameEnd}
          tieGame={tieGame}
          winner={winner}
          resetGameBoard={this.resetGameBoard}
        />
        <header>
          <h1>
            <span className='tic'>Tic</span>
            <span className='dash'>-</span>
            <span className='tac'>Tac</span>
            <span className='neon'> Neon</span>
          </h1>
        </header>
        <aside>
          <InfoBar
            player1={player1}
            player1Score={player1Score}
            player2={player2}
            player2Score={player2Score}
            currentPlayer={currentPlayer}
            resetGameBoard={this.resetGameBoard}
          />
        </aside>
        <main>
          <Game
            boardStatus={boardStatus}
            currentPlayer={currentPlayer}
            handleClick={this.handleClick}
          />
        </main>
      </div>  
    )
  }
}

export default App;
