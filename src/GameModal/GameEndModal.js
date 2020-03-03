import React from 'react';
import ReactModal from 'react-modal';
import './GameEndModal.css';

const GameEndModal = ({ gameEnd, tieGame, winner, resetGameBoard}) => {
  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={gameEnd}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.65)",
        },
        content: {}
      }}
      contentLabel="Sign In"
      className="SignInModal"
      overlayClassName="SignInOverlay"
    >
      <section className='game-end'>
        <div className='game-end-status'>
          <h1 className='game-over-title'>GAME OVER</h1>
          {tieGame &&
            <h2 className='tie-game'>Tie Game!</h2>
          }
          {winner && 
            <h2 className='winner-is'>{winner} is the winner!</h2>
          }
          <button onClick={resetGameBoard}>Play again!</button>
        </div>
      </section>
    </ReactModal>
  );
}

export default GameEndModal;