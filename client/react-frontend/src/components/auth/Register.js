import React, { Component } from 'react';
import { Link } from 'react-router-dom';


// removed for ts error 
const newUser = {
  name: this.state.name,
  email: this.state.email,
  password: this.state.password,
  password2: this.state.password2
};

console.log(newUser);

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

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
  }

  render() {
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
              <p className="grey-text text-darken-1">
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
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  errors={errors.email}
                  id="email"
                  type="email"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div classname="input-field col 12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                />
                <label htmlFor="password2">Password</label>
              </div>
              <div classname="input-field col 12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                />
                <label htmlFor="password2">Confirm Password</label>
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

export default Register;