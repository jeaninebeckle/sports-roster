import React from 'react';
import PropTypes from 'prop-types';
import playerShape from '../../helpers/props/playerShape';
import './Player.scss';

class Player extends React.Component {
  static propTypes = {
    player: playerShape.playerShape,
    deletePlayer: PropTypes.func.isRequired,
  }

  deletePlayerEvent = (e) => {
    e.preventDefault();
    const { player, deletePlayer } = this.props;
    deletePlayer(player.id);
  }

  editPlayerEvent = (e) => {
    e.preventDefault();
    const { editAPlayer, player } = this.props;
    editAPlayer(player);
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
        <li className="list-group-item">
        <button className="btn btn-outline-danger m-1" onClick={this.editPlayerEvent}>Edit</button>
        <button className="btn btn-outline-danger" onClick={this.deletePlayerEvent}>Delete</button>
        </li>
      </ul>
    </div>
     </div>
    );
  }
}

export default Player;
