import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div className="container valign-wrapper landing-wrapper__div">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <p>Hello, {user.name.split('')[0]}, you are logged in</p>
            </h4>
            <buttton className="nav-button btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={this.onLogoutClick}>
              Logout
            </buttton>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.usRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
