import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { registerUser } from '../actions/authActions';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            errors: {}
        }
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirm_password: this.state.confirm_password
        }
        this.props.registerUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/');
        }
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        const { name, email, password, confirm_password, errors } = this.state;
        const Field = props => {
            const { label, type, name, value, handleInputChange, errors } = props;
            const classNameInput = `input ${errors[name] ? 'is-danger' : ''}`;
            return (
                <div className="field">
                    <label className="label">{label}</label>
                    <div className="control">
                        <input
                            className={classNameInput}
                            type={type}
                            name={name}
                            onChange={handleInputChange}
                            value={value} />
                    </div>
                    {errors[name] && (<p className="help is-danger">{errors[name]}</p>)}
                </div>
            );
        }
        return (
            <div className="section">
                <h2 className="subtitle">Registration</h2>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <Field
                        label="Name"
                        type="text"
                        name="name"
                        handleInputChange={this.handleInputChange.bind(this)}
                        value={name}
                        errors={errors} />
                    <Field
                        label="Email"
                        type="email"
                        name="email"
                        handleInputChange={this.handleInputChange.bind(this)}
                        value={email}
                        errors={errors} />
                    <Field
                        label="Password"
                        type="password"
                        name="password"
                        handleInputChange={this.handleInputChange.bind(this)}
                        value={password}
                        errors={errors} />
                    <Field
                        label="Confirm Password"
                        type="password"
                        name="confirm_password"
                        handleInputChange={this.handleInputChange.bind(this)}
                        value={confirm_password}
                        errors={errors} />
                    <button className="button is-primary" type="submit">Register</button>
                </form>
            </div >
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired
}

const mapStateToProps = ({ errors, auth }) => ({ errors, auth });

export default connect(mapStateToProps, { registerUser })(withRouter(Register));