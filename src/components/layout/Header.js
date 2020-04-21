import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    var userRole = "";
    var adminManager = null;
    if (user != null) {
      if (user.is_anonymous_active) {
        user.username = "Anonymous";
      } else if (user.is_administrator) {
        adminManager = (
          <li className="nav-item">
            <Link to="/manage" className="nav-link">
              Manage
            </Link>
          </li>
        );
        userRole = <strong>(Administrator)</strong>;
      } else if (user.is_moderator) {
        userRole = <strong>(Moderator)</strong>;
      }
    }

    const authLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <span className="navbar-text text-warning mr-5">
          <strong>
            {user ? `Welcome ${user.username}` : ""} {userRole}{" "}
          </strong>
        </span>
        <li className="nav-item">
          <button
            onClick={this.props.logout}
            className="nav-link btn btn-link btn-lg text-info"
          >
            LOGOUT
          </button>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link to="/" className="navbar-brand">
          GlobaltraQs
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/faq" className="nav-link">
                Faq{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/About" className="nav-link">
                About Us{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/support" className="nav-link">
                Support Us{" "}
              </Link>
            </li>
            {adminManager ? adminManager : ""}
          </ul>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);