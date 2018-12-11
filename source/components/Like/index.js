// Core
import React, { Component } from 'react';
import { string, number, func, arrayOf, array,  shape } from 'prop-types';
import cx from 'classnames'; // библиотека определяет CSS CLASS  от набора условия

// Instruments
import Styles from './styles.m.css';

//Components
import { withProfile } from 'components/HOC/withProfile';

@withProfile
export default class Like extends Component {

    static propTypes = {
            _likePosts: func.isRequired,
            id:         string.isRequired,
            likes:      arrayOf(
                        shape({
                            id: string.isRequired,
                            firstName: string.isRequired,
                            lastName: string.isRequired,
                        }),
            ).isRequired,
    };
    state = {
        showLikers: false
    };

    _showLikeds = () => {
        this.setState({
            showLikers: true
        })
    };

    _hideLikeds = () => {
        this.setState({
            showLikers: false
        })
    };

    _likePosts = () => {
        const { _likePosts, id} = this.props;

        _likePosts(id);
     };

    _getLikeByMe = () => {                                                         // return true / false
        const { currentUserFirstName, currentUserLastName, likes} = this.props;
        return likes.some(( { firstName, lastName } )=> {                   /* метод some переберает массив и возвращает булевое значение   */
            return( `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}`);
        })
    };

    _getLikeStyles = () => {
        const likedByMe = this._getLikeByMe();

        return cx(Styles.icon, {
            [Styles.liked]: likedByMe,
        });
    };

    _getLikesDescriptions = () => {
        const { currentUserFirstName, currentUserLastName, likes} = this.props;

        const likedByMe = this._getLikeByMe();
        if(likes.length === 1 && likedByMe) {
            return `${currentUserFirstName} ${currentUserLastName}`
        } else if(likes.length === 2 && likedByMe ){
            return `You and  ${likes.length -1} other`;
        }else if( likedByMe ){
            return `You and  ${likes.length -1} other`;
        }
        return likes.length;

    };

    _getLikesList = () => {
        const { showLikers } = this.state;
        const { likes } = this.props;

        const likesJSX  = likes.map( ({ firstName, lastName, id }) => (
            <li key = { id }> {`${firstName} ${lastName}`}  </li>
        ));
        return likes.length && showLikers ? <ul>{ likesJSX }</ul> : null;
    };

    render() {
        const likeStyles = this._getLikeStyles();
        const likersList = this._getLikesList();
        const likesDescriptions = this._getLikesDescriptions();

        return(
            <section className = { Styles.like } >
                <span className = { likeStyles } onClick = {this._likePosts}>like</span>
                <div> { likersList }
                    <span
                        onMouseEnter = {this._showLikeds}
                        onMouseLeave = {this._hideLikeds} >
                        {likesDescriptions}
                    </span>
                </div>
            </section>
        );
    }
}
