import React from 'react';
import firebase from 'firebase/app';
import Auth from '../Auth/Auth';
import 'firebase/auth';
import './Navbar.scss';

class Navbar extends React.Component {
  logoutClickEvent = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1"><img src="https://logos-world.net/wp-content/uploads/2020/05/Chicago-Blackhawks-Logo-1989-1996.png" alt="chicago blackhawks logo" /></span>
          <div className="navbar-nav ml-auto">
        {
          authed ? (
            <button id="navbar-logout-button" type="button" className="navbar btn btn-outline-danger" onClick={this.logoutClickEvent}>Log Out</button>
          ) : (
            <Auth />
          )
        }
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
