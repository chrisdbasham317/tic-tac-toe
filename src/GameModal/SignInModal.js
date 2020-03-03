import React, { Component } from 'react';
import ReactModal from 'react-modal';
import './SignInModal.css';


class SignInModal extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: true,
      p1Name: '',
      p2Name: '',
      error: ''
    }
  }
  handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { p1Name, p2Name } = this.state;
    if (p1Name !== p2Name) {
      this.props.updatePlayerNames(p1Name, p2Name);
      this.setState({modalOpen: false})
    } else {
      this.setState({error: 'Names must be unique'})
    }
  }

  render() {
    let { modalOpen, error } = this.state;
    return (
      <ReactModal
        ariaHideApp={false}
        isOpen={modalOpen}
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
        <section className='player-names-section'>
          <form className='player-names-form'>
            <h4 className='form-title'>Input Player Names</h4>
            <label className='player-1-name' htmlFor="player1">Player 1:</label>
            <input
              type="text"
              id="player1"
              name="p1Name"
              onChange={this.handleChange}
            />
            <label className='player-2-name' htmlFor="player2">Player 2:</label>
            <input
              type="text"
              id="player2"
              name="p2Name"
              onChange={this.handleChange}
            />
            <button
              className='submit-btn'
              onClick={this.handleSubmit}
            >
              Start!
            </button>
            {error && <p className='pname-error-msg'>Player names must be different!</p>}
          </form>
        </section>
      </ReactModal>      
    )
  }
}

export default SignInModal;