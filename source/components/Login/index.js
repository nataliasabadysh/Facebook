//Core
import React, { Component } from 'react';

//Components
import { withProfile } from 'components/HOC/withProfile'; 
//Instruments
import Styles from './styles.m.css';

@withProfile
export default class Login extends Component {
    
    _logIn = () => {
        this.props._login();
    };

    render () {
        const { currentUserFirstName, currentUserLastName } = this.props;

        return (
            <section className = { Styles.login }>
                <h1>  You have been sing in as 😊 {currentUserFirstName}  {currentUserLastName}</h1>
                <button className = { Styles.button} onClick = { this._login } > Sing out</button>
            </section>
        );
    }
}


/*
          // Войти как : { currentUserFirstName } { currentUserLastName } 
*/
