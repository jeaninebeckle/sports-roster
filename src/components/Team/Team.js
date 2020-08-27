import React from 'react';
import PropTypes from 'prop-types';
import Player from '../Player/Player';
import PlayerForm from '../PlayerForm/PlayerForm';
import playersData from '../../helpers/data/playersData';
import authData from '../../helpers/data/authData';

class Team extends React.Component {
  state = {
    players: [],
    addForm: false,
    editPlayer: {},
  }

  getPlayers = () => {
    playersData.getPlayersByUid(authData.getUid())
      .then((players) => this.setState({ players }))
      .catch((err) => console.error('get players broke', err));
  }

  componentDidMount() {
    this.getPlayers();
  }

  deletePlayer = (playerId) => {
    playersData.deletePlayer(playerId)
      .then(() => {
        this.getPlayers();
      })
      .catch((err) => console.error('delete player failed', err));
  }

  createPlayer = (newPlayer) => {
    playersData.createPlayer(newPlayer)
      .then(() => {
        this.getPlayers();
        this.setState({ addForm: false });
      })
      .catch((err) => console.error('create player broke', err));
  }

  editAPlayer = (playerToEdit) => {
    this.setState({ })
  }

  render() {
    const { players, addForm } = this.state;

    const playerCards = players.map((player) => <Player key={player.id} player={player} deletePlayer={this.deletePlayer}/>);

    return (
      <div>
        <h2>Chicago Blackhawks</h2>
        <button className="btn btn-outline-light m-3" onClick = {() => { this.setState({ addForm: !addForm }); }}>Add A Player</button>
        { addForm ? <PlayerForm createPlayer={this.createPlayer}/> : '' }
        <div className="card-columns">
        { playerCards }
        </div>
      </div>
    );
  }
}

export default Team;
