import React from 'react';
import playerShape from '../../helpers/props/playerShape';
import './Player.scss';

class Player extends React.Component {
  static propTypes = {
    player: playerShape.playerShape,
  }

  render() {
    const { player } = this.props;
    return (
     <div>
       <div className="card">
      <img className="card-img-top" src={player.imageUrl} alt="Card cap" />
      <div className="card-body">
        <h5 className="card-title">{player.name}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{player.position}</li>
      </ul>
    </div>
     </div>
    );
  }
}

export default Player;
