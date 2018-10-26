import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';

class Navbar extends Component {
    onLogout(event) {
        event.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const authLink = (
            <div className="navbar-end">
                <Link className="navbar-item" to="/user">{user.name}</Link>
                <div className="navbar-item">
                    <button className="button is-primary" onClick={this.onLogout.bind(this)}>Logout</button>
                </div>
            </div>
        );
        const guestLink = (
            <div className="navbar-end">
                <Link className="navbar-item" to="/register">Register</Link>
                <Link className="navbar-item" to="/login">Login</Link>
            </div>
        );
        return (
            <nav className="navbar is-transparent">
                <div className="container">
                    <div className="navbar-brand">
                        <div className="navbar-item">
                            <Link to='/'>JWT Auth</Link>
                        </div>
                    </div>
                    <div className="navbar-menu">
                        {isAuthenticated ? authLink : guestLink}
                    </div>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));