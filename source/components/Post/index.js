// Core
import React, { Component } from 'react';
import moment from 'moment'; // Библиотека for <time>
import {string, number, func, array } from 'prop-types';

// Instruments
import Styles from './styles.m.css';

//Components
import Like from 'components/Like';
import { Consumer } from 'components/HOC/withProfile';



export default class Post extends Component {

    static propTypes = {
        comment:    string.isRequire,
        created:    number.isRequire,
        _likePosts: func.isRequire,
        likes:       array.isRequire,
        id:         string.isRequire,
    };

    render() {

        const {comment, created, _likePosts, id, likes} = this.props;

        return (
            <Consumer>
                {(context) => (
                    <section className={Styles.post}>
                        <span className={Styles.cross}></span>
                        <img src={context.avatar} alt=""/>
                        <a> {`${context.currentUserFirstName} ${context.currentUserLastName}`} </a>
                        <time>{moment.unix(created).format('MMM D h:mm:ss a')}</time>
                        <p> {comment} </p>
                        <Like  _likePosts = {_likePosts} id = { id } likes = { likes } {...context} />
                    </section>
                )}
            </Consumer>
        )
    }
}
