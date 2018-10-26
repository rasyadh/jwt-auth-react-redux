import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../actions/authActions';

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

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
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
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(user);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/');
        }
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    render() {
        const { email, password, errors } = this.state;
        return (
            <div className="section">
                <h2 className="subtitle">Login</h2>
                <form onSubmit={this.handleSubmit.bind(this)}>
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
                    <button className="button is-primary" type="submit">Login</button>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = ({ errors, auth }) => ({ errors, auth });

export default connect(mapStateToProps, { loginUser })(Login);