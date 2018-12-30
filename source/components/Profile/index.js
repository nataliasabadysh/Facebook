// Core
import React, { Component } from 'react';

//Components
import { withProfile } from 'components/HOC/withProfile'; 


// Instruments
import Styles from './styles.m.css';

@withProfile
export default class Feed extends Component {

    render () {
        const { currentUserFirstName, currentUserLastName, avatar } = this.props;

        return (
            <section className = { Styles.profile }>
                <img src = { avatar } />
                <h1> Welcome, { currentUserFirstName } { currentUserLastName } </h1>
            </section>
        );
    }
}
