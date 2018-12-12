// Core
import React, { Component } from 'react';
import moment from 'moment'; // Библиотека for <time>
import { string, number, func, array } from 'prop-types';

// Instruments
import Styles from './styles.m.css';

//Components
import Like from 'components/Like';
import { withProfile } from "../HOC/withProfile";


@withProfile
class Post extends Component {

    static propTypes = {
        comment:    string.isRequired,
        created:    number.isRequired,
        _likePosts: func.isRequired,
        likes:       array.isRequired,
        id:         string.isRequired,
    };

    _removePost=() => {
        const { _removePost, id } = this.props;

        _removePost(id);
    };
    _getCross = () => {

        const { firstName , lastName, currentUserFirstName, currentUserLastName } = this.props;

        return  `${firstName} ${lastName}` ===
                `${currentUserFirstName} ${currentUserLastName}` ?
                 <span className = { Styles.cross }  onClick = { this._removePost } />
            : null;
    };

    render() {
        const { comment, created, _likePosts, id, likes, avatar, firstName, lastName } = this.props;

        const cross = this._getCross();

        return (

            <section className={Styles.post}>
                { cross }
                <img src={avatar} alt=""/>
                <a> {`${firstName} ${lastName}`} </a>
                <time>{moment.unix(created).format('MMM D h:mm:ss a')}</time>
                <p> {comment} </p>
                <Like  _likePosts = {_likePosts} id = { id } likes = { likes } />
            </section>
        )
    }
}
export default withProfile(Post);
