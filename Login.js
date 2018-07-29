import React, {Component} from 'react';
import {Button,Input } from 'antd';
import {connect} from "react-redux";
import  './Login.css';


class Login extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    onSubmit() {
        const {username, password} = this.state;
        this.props.dispatch({type: "API_CALL_REQUEST", username: username, password: password});
    }

    render() {
        const {fetching, token} = this.props;

        if (token) {
            this.props.history.push('/home');
        }

        return (
            <div className="Login">
                <div className="login-wrap">
                    <div className="login-html">
                        <div className="login-form">
                            <div>

                                <div class="group">
                                    <label for="user" class="label">Username</label>
                                    <input id="username" type="text" class="input" onChange={this.handleChange} />
                                </div>
                                <div class="group">
                                    <label for="pass" class="label">Password</label>
                                    <input id="password" type="password" class="input" data-type="password"
                                           onChange={this.handleChange} />
                                </div>
                                <div class="group">
                                    {fetching ? (

                                        <Button type="primary">Please Wait</Button>
                                    ) : (
                                        <Button type="primary" onClick={this.onSubmit}>Sign In</Button>
                                    )}

                                </div>
                                <div className="hr"></div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );


    }
}
const mapStateToProps = state => {
    return {
        username: state.username,
        password: state.password,
        fetching: state.fetching,
        token: state.token,
        error: state.error
    };
};

 /*const mapDispatchToProps = dispatch => {
     return {
       onRequestLogin: (username,password) => dispatch({ type: "API_CALL_REQUEST",username:username,password:password })
     };
 };*/



export default connect(mapStateToProps)(Login);