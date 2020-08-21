import React from 'react';
import Player from '../Player/Player';
import playersData from '../../helpers/data/playersData';
import authData from '../../helpers/data/authData';

class Team extends React.Component {
  state = {
    players: [],
  }

  componentDidMount() {
    playersData.getPlayersByUid(authData.getUid())
      .then((players) => this.setState({ players }))
      .catch((err) => console.error('get players broke', err));
  }

  render() {
    const { players } = this.state;

    const playerCards = players.map((player) => <Player key={player.id} player={player} />);

    return (
      <div>
        <h2>Chicago Blackhawks</h2>
        <div className="card-columns">
        { playerCards }
        </div>
      </div>
    );
  }
}

export default Team;
