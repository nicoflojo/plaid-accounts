import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import classnames from 'classnames';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  // Added last
  componentDidMount() {
    if (this.props.auth.isAuthenicated) {
      this.props.history.push('/dashboard');
    }
  }

  // Added last

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };


  render() {

    console.log(this.state);
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="materials-icon left">
              </i>
              Home
              </Link>
            <div className="col s12 nav-register">
              <h4>
                Register Below
              </h4>
              <p className="grey-text text-darken-1 register-login">
                Already have an account?
                <Link to="/login">Login</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames('', {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  errors={errors.email}
                  id="email"
                  type="email"
                  className={classnames('', {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames('', {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password2">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames('', {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span>{errors.password2}</span>
              </div>
              <div className="col s12 nav-register">
                <button
                  className="nav-button btn btn-large waves-effect waves-light hoverable blue accent-3"
                  type="submit"
                >SignUp</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propsTypes = {
  registerUser: PropType.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropType.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});



export default connect(mapStateToProps, { registerUser })(withRouter(Register)); 