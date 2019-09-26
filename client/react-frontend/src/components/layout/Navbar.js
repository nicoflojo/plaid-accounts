import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav classname="z-depth-0">
          <div className="nav-wrapper white">
            <Link to="/"
              className="col s5 brand-logo center black-text nav-link">
              <i className="material-icons">code</i>
            </Link>
            MERN
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;