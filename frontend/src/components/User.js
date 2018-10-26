import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentUser } from '../actions/authActions';

class User extends Component {
    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
        this.props.getCurrentUser();
    }

    render() {
        const { user } = this.props.auth;
        return (
            <div className="section">
                <h1 className="title">{user.name}</h1>
                <h2 className="subtitle">{user.email}</h2>
            </div>
        );
    }
}

User.propTypes = {
    getCurrentUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { getCurrentUser })(User);