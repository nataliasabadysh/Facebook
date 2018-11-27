// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Components
import { Consumer } from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

export default class Composer extends Component {
    static propTypes = {
        _createPost: PropTypes.func.isRequire,
    };
    constructor(){
        super();
        this._updateComment = this._updateComment.bind(this);
        this._submitComment = this._submitComment.bind(this);
        this._submitOnEnter = this._submitOnEnter.bind(this);
        this._handelFormSubmit = this._handelFormSubmit.bind(this);

    };
    state ={
        comment:'',
    };
    _updateComment (event) {
        this.setState({
            comment: event.target.value,
        })
    }
    _handelFormSubmit(event){
        event.preventDefault();
        this._submitComment()
    }

    _submitComment () {
        // event.preventDefault();

        const { comment } = this.state;

        if(!comment){ return null; }

        this.props._createPost(comment);

        this.setState({  comment:''})
    }

    _submitOnEnter (event) {
        const enterKey = event.key === 'Enter';

        if (enterKey) {
            event.preventDefault();
           this._submitComment();
        }

    }

    render () {
        const { comment } = this.state;
        return (
            <Consumer>
                {(context) => (
                    <section className={ Styles.composer }>
                        <img src={ context.avatar } alt="avatar" />
                        <form onSubmit={this._handelFormSubmit}>

                            <textarea
                                placeholder={` What is on your mind, ${context.currentUserFirstName}?` }
                                value={ comment}
                                onChange={this._updateComment}
                                onKeyPress={this._submitOnEnter}
                            />

                            <input type="submit" value="Post" />
                        </form>
                    </section>
                )}
            </Consumer>
        )
    }
}
