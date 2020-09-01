import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';

class PlayerForm extends React.Component {
  static propTypes = {
    createPlayer: PropTypes.func.isRequired,
    updatePlayer: PropTypes.func.isRequired,
    editingPlayer: PropTypes.object.isRequired,
    closeForm: PropTypes.func.isRequired,
  }

  state = {
    imageUrl: '',
    name: '',
    position: '',
    isEditing: false,
  }

  componentDidMount() {
    const { editingPlayer } = this.props;
    if (editingPlayer.name) {
      this.setState({
        name: editingPlayer.name,
        imageUrl: editingPlayer.imageUrl,
        position: editingPlayer.position,
        isEditing: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const prevPlayer = prevProps.editingPlayer;
    const incomingPlayer = this.props.editingPlayer;
    if (prevPlayer.name !== incomingPlayer.name) {
      this.setState({
        name: incomingPlayer.name || '',
        imageUrl: incomingPlayer.imageUrl || '',
        position: incomingPlayer.position || '',
        // eslint-disable-next-line no-unneeded-ternary
        isEditing: incomingPlayer.name ? true : false,
      });
    }
  }

  changeImgEvent = (e) => {
    e.preventDefault();
    this.setState({ imageUrl: e.target.value });
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  changePositionEvent = (e) => {
    e.preventDefault();
    this.setState({ position: e.target.value });
  }

  savePlayerEvent = (e) => {
    e.preventDefault();
    const { imageUrl, name, position } = this.state;
    const { createPlayer } = this.props;

    const newPlayer = {
      imageUrl,
      name,
      position,
      uid: authData.getUid(),
    };

    createPlayer(newPlayer);
  }

  editPlayerEvent = (e) => {
    e.preventDefault();
    const { imageUrl, name, position } = this.state;
    const { updatePlayer, editingPlayer } = this.props;

    const playerWithChanges = {
      imageUrl,
      name,
      position,
      uid: authData.getUid(),
    };

    updatePlayer(editingPlayer.id, playerWithChanges);
  }

  render() {
    const {
      imageUrl,
      name,
      position,
      isEditing,
    } = this.state;
    return (
      <form className="col-6 offset-3">
        <div className="form-group">
          <label htmlFor="playerName">Player Name</label>
          <input type="text" className="form-control" id="playerName" placeholder="Enter Player Name" value={name} onChange={this.changeNameEvent}/>
        </div>
        <div className="form-group">
          <label htmlFor="position">Player Position</label>
          <input type="text" className="form-control" id="position" placeholder="Enter Player Position" value={position} onChange={this.changePositionEvent}/>
        </div>
        <div className="form-group">
          <label htmlFor="playerImg">Player Image URL</label>
          <input type="text" className="form-control" id="playerImg" placeholder="Enter Player Image URL" value={imageUrl} onChange={this.changeImgEvent}/>
        </div>
        {
          isEditing
            ? <button className="btn btn-outline-light" onClick={this.editPlayerEvent}>Edit Player</button>
            : <button className="btn btn-outline-light" onClick={this.savePlayerEvent}>Save Player</button>
        }
      </form>

    );
  }
}

export default PlayerForm;
