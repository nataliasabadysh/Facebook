// Core
import React, { Component } from 'react';


//Components
import { object } from 'prop-types';

// Instruments
import Styles from './styles.m.css';


export default class Catcher extends Component {

    static propoTypes ={
        children: object.isRequired,
    };

    state = {
        error: false,
    };

    componentDidCatch(error, stack) {
        console.log('Error', error);
        console.log('Stacktrace', stack.componentStack);

        this.setState({
            error: true,
        })
    }

    render() {
        console.log('Catch');

        if(this.state.error){
            return (
                <section className={ Styles.catcher }>
                    <span>  A mysterius 🎃 error 📛 occured . </span>
                    <p>Our space engineers 🕵🏼 fixing that already ! </p>
                </section>
            )
        }
              
        return this.props.children;
    }

}
