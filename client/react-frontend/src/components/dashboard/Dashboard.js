import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { getAccounts, addAccount } from '../../actions/accountActions';
import Accounts from './Accounts';
import Spinner from './Spinner';


class Dashboard extends Component {
  componentDidMount() {
    this.props.getAccounts();
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  handleOnSuccess = (token, metadata) => {
    const plaidData = {
      public_token: token,
      metadata: metadata
    }
    this.props.addAccount(plaidData);
  }

  render() {
    const { user } = this.props.auth;
    const { accounts, accountsLoading } = this.props.plaid;

    let dashboardContent;

    if (accounts == null || accountsLoading) {
      dashboardContent = <Spinner />;
    } else if (accounts.length > 0) {
      dashboardContent = <Accounts user={user} accounts={accounts} />;
    } else {
      dashboardContent = (
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              Welcome, {user.name.split(' ')[0]}
            </h4>
            <p className="flow-text grey-text text-darken-1">
              To get started, link your first bank account below
            </p>
            <div>
              <PlaidLinkButton
                buttonProps={{
                  className:
                    "btn btn-large waves-effect waves-light hoverable blue accent-3 main-btn"
                }}
                plaidLinkProps={{
                  clientName: 'Global-App',
                  key: '0a2dc4a9dccd73640877d238453a57',
                  env: 'sandbox',
                  product: ['transactions'],
                  onSuccess: this.handleOnSuccess
                }}
                onScriptLoad={() => this.setState({ loaded: true })}
              >
                Link Account
          </PlaidLinkButton>
            </div>
            <button
              onClick={this.logoutClick}
              className="btn btn-large waves-effect waves-light hoverable red accent-3 main-btn"
            >
              Logout
        </button>
          </div>
        </div>
      );
    }

    return <div className="container">{dashboardContent}</div>
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  addAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequred,
  plaid: PropTypes.objet.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  plaid: state.plaid
});

export default connect(mapStateToProps, { logoutUser, getAccounts, AddAccount })(Dashboard);
