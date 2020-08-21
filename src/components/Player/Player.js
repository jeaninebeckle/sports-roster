import React from 'react';
// import PropTypes from 'prop-types';
import playerShape from '../../helpers/props/playerShape';

class Player extends React.Component {
  static propTypes = {
    player: playerShape.playerShape,
  }

  render() {
    const { player } = this.props;
    return (
      <div className="card text-center">
        <div className="card-header"><h5>{player.name}</h5></div>
          <div className="card-body">
          </div>
        <div className="card-footer text-muted"></div>
      </div>
    );
  }
}

export default Player;
