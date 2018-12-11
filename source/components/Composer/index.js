// Core

import React, { Component } from 'react';
import { func } from 'prop-types';

//Components
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

class Composer extends Component {
    static propTypes = {
        _createPost: func.isRequired,
    };
    state ={
        comment:'',
    };
    _updateComment = (event)=> {
        this.setState({
            comment: event.target.value,
        })
    };
    _handelFormSubmit = (event) => {
        event.preventDefault();
        this._submitComment()
    };

    _submitComment =  () => {
        // event.preventDefault();

        const { comment } = this.state;

        if(!comment){ return null; }

        this.props._createPost(comment);

        this.setState({  comment:''})
    };

    _submitOnEnter = (event) => {
        const enterKey = event.key === 'Enter';

        if (enterKey) {
            event.preventDefault();
           this._submitComment();
        }

    };

    render () {
        const { comment } = this.state;
        const { avatar, currentUserFirstName } = this.props;
        return (
            <section className={ Styles.composer }>
                <img src={ avatar } alt="avatar" />
                <form onSubmit={this._handelFormSubmit}>

                    <textarea
                        placeholder={` What is on your mind, ${currentUserFirstName}?` }
                        value={ comment}
                        onChange={this._updateComment}
                        onKeyPress={this._submitOnEnter}
                    />

                    <input type="submit" value="Post" />
                </form>
            </section>
        )
    }
}

export default withProfile(Composer);
