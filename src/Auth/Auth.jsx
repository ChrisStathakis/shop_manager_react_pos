import React, {Component} from 'react';
import LoginForm from '../Auth/LoginView';


class AuthView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loginView: true, 
            token: localStorage.getItem('token') ? true : false
        }
    }


    render() {
        const {loginView} = this.state;
        return (
            <LoginForm />
        )
    }
}

  

export default AuthView;