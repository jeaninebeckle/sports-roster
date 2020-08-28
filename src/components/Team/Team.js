import React from 'react';
import Player from '../Player/Player';
import PlayerForm from '../PlayerForm/PlayerForm';
import playersData from '../../helpers/data/playersData';
import authData from '../../helpers/data/authData';

class Team extends React.Component {
  state = {
    players: [],
    showForm: false,
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
        this.setState({ showForm: false });
      })
      .catch((err) => console.error('create player broke', err));
  }

  editAPlayer = (playerToEdit) => {
    this.setState({ showForm: true, editPlayer: playerToEdit });
  }

  updatePlayer = (playerId, editedPlayer) => {
    playersData.updatePlayer(playerId, editedPlayer)
      .then(() => {
        this.getPlayers();
        this.setState({ showForm: false, editPlayer: {} });
      })
      .catch((err) => console.error('update player ain\'t happenin', err));
  }

  render() {
    const { players, showForm, editPlayer } = this.state;

    const playerCards = players.map((player) => <Player key={player.id} player={player} deletePlayer={this.deletePlayer} editAPlayer={this.editAPlayer}/>);

    return (
      <div>
        <h2>Chicago Blackhawks</h2>
        <button className="btn btn-outline-light m-3" onClick = {() => { this.setState({ showForm: !showForm }); }}>Add A Player</button>
        { showForm ? <PlayerForm createPlayer={this.createPlayer} editingPlayer={editPlayer} updatePlayer={this.updatePlayer}/> : '' }
        <div className="card-columns">
        { playerCards }
        </div>
      </div>
    );
  }
}

export default Team;
