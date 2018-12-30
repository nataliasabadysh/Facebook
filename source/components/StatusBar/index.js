// Core
import React, { Component } from 'react';
import cx from 'classnames';

//Components
import { withProfile } from 'components/HOC/withProfile';


// Instruments
import Styles from './styles.m.css';
import { socket } from 'socket/init';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';
import { Link } from 'react-router-dom';

@withProfile

class StatusBar extends Component {
    state = {
        online: true,
    };

    componentDidMount() {
        socket.on( 'connect', () =>{
            this.setState({
                online: true,
            })
        });
        socket.on( 'disconnect', () =>{
            this.setState({
                online: false,
            })
        })
    }

    componentWillMount() {
        socket.removeListener('connect');
        socket.removeListener('disconnect');
    }

    _aniateStatusBarEnter = (StatusBar) => {
        fromTo( StatusBar, 2, { opacity:0 }, { opacity:1 });
    };

    render () {
        const { avatar, currentUserFirstName } = this.props;

        const { online } = this.state;

        const statusStyle = cx(Styles.status , {
            [Styles.online]: online,
            [Styles.offline]: !online,
            }
        );
        const statusMessage = online ? 'Online' : 'Offline';

        return (

            <Transition
                appear
                in
                timeout = { 1000 }
                onEnter = { this._aniateStatusBarEnter } >

                <section className = {Styles.statusBar} >
                    <div className={ statusStyle }>
                        <div> { statusMessage } </div>
                        <span />
                    </div>

                    <Link to = '/profile'>
                        <img src = { avatar } />
                        <span>{ currentUserFirstName }</span>
                        &nbsp;
    
                    </Link>
                    <Link to = '/feed'> Feed </Link>
                    <Link to = '/login'> Login </Link>
                </section>
            </Transition>

        );
    }
}
export default withProfile(StatusBar);
