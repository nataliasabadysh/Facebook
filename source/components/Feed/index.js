// Core
import React, { Component } from 'react';

import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import { fromTo } from 'gsap';

//Components
import { withProfile } from 'components/HOC/withProfile';
import Catcher from 'components/Catcher';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';
import Postman from 'components/Postman';
import Counter from 'components/Counter';
//import Autors from 'components/Autors';

// Instruments
import Styles from './styles.m.css';
import { api, TOKEN, GROUP_ID } from 'config/api';
import { socket } from 'socket/init';

@withProfile
export default class Feed extends Component {
    state = {
        posts:[],
        isPostFetching: false,
       // authors: [],
    };

     componentDidMount() {
         const { currentUserFirstName, currentUserLastName } = this.props;
          this._fetchPosts();

          socket.emit('join', GROUP_ID);
          socket.on('create', (postJSON)=>{
             const {data: createdPost, meta} = JSON.parse(postJSON);

             if(
                 `${currentUserFirstName} ${currentUserLastName}` !==
                 `${meta.autorFirstName} ${meta.autorLastName}`
             ) {
                 this.setState(({ posts }) => ({
                     post: [createdPost, ...posts ],

                 }))
             }
         });
         socket.on('remove', (postJSON)=>{
             const {data: removedPost, meta} = JSON.parse(postJSON);
             if(
                 `${currentUserFirstName} ${currentUserLastName}` !==
                 `${meta.autorFirstName} ${meta.autorLastName}`
             ) {
                 this.setState(({ posts }) => ({
                     post: posts.filter(post =>post.id !== removedPost.id),

                 }))
             }
         });
    }
     componentWillUnmount() {
         socket.removeListener('create');
         socket.removeListener('remove');
    }
    _setPostsFetchingState = (state) =>{
        this.setState({
            isPostFetching: state,
        });

    };
    _fetchPosts = async () => {
        this._setPostsFetchingState(true);
        const response  = await fetch(api, {
            method: 'GET',
        });
        const { data: posts } = await response.json();

        // const authors = posts.map(post => post.firstName && post.avatar);

        //console.log(authors);
        this.setState({
            posts,
           // authors,
            isPostFetching: false,
        });

    };

     _createPost = async(comment) => {
        this._setPostsFetchingState(true);
         const response  = await fetch(api, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 Authorization : TOKEN,
             },
             body: JSON.stringify({ comment })
         });
        const { data: post } = await response.json();

        this.setState(({ posts})=>({
            posts:[post, ...posts],
            isPostFetching: false,
        }));

    };
     _likePosts = async(id)  => {
        this._setPostsFetchingState(true);

         const response  = await fetch((`${api}/${id}`), {
             method: 'PUT',
             headers: {
                 Authorization : TOKEN,
             },
         });
        const { data: likedPost } = await response.json();

        this.setState(({ posts}) =>({
             posts: posts.map( post => post.id === likedPost.id ? likedPost : post),
             isPostFetching: false,

         }));
     };
    _removePost = async(id) => {
        this._setPostsFetchingState(true);
         await fetch((`${api}/${id}`), {
            method: 'DELETE',
            headers: {
                Authorization : TOKEN,
            },
        });
        this.setState(({ posts})=>({
            posts: posts.filter((post) => post.id !== id),
            isPostFetching: false,
        }));
    };
    _aniateComposerEnter = ( composer ) =>{
        fromTo(composer , 1, {opacity: 0, rotationX:50 }, {opacity: 1, rotationX:0});
    };

    render () {
        const { posts, isPostFetching } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <CSSTransition
                    classNames = {{ enter: Styles.postInStart, enterActive: Styles.postInEnd }}
                    key = { post.id }
                    timeout = {{ enter: 500,  exit: 400, }}>

                    <Catcher>
                        <Post { ...post }  _likePosts = {this._likePosts} _removePost = {this._removePost} />
                    </Catcher>
                </CSSTransition>
            )
        });
        return (
            <section className = { Styles.feed }>

                {/*<Autors authors = { authors } />*/}

                <Spinner isSpinner={isPostFetching} />
                <StatusBar />

                <Transition  appear  in  timeout = { 4000 }  onEnter = { this._aniateComposerEnter } >
                    <Composer _createPost = { this._createPost } />
                </Transition>
                <Postman />
                <Counter count={postsJSX.length} />

                <TransitionGroup> {postsJSX}</TransitionGroup>

            </section>
        )
    }
}


/*
 <TransitionGroup> {postsJSX}</TransitionGroup>
 */
