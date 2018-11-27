// Core
import React, { Component } from 'react';
import moment from 'moment'; // Библиотека for <time>


//Components
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';


// Instruments
import Styles from './styles.m.css';
import { getUniqueID, delay} from 'instruments';

export default class Feed extends Component {

    constructor(){
        super();

        this._createPost = this._createPost.bind(this);
        this._setPostsFetchingState = this._setPostsFetchingState.bind(this);
        this._likePosts = this._likePosts.bind(this);
    }

    state = {
        posts:[
                {id: 123, comment: ' 🤓 Hey new comment', created: 1543307245,  likes:[]  },
                {id: 1234, comment: 'Hi and one more comment 👨',  created: 1538396305,  likes:[] },
        ],
        isPostFetching: false,
    };

    _setPostsFetchingState(state){
        this.setState({
            isPostFetching: state,
        });

    }

    async _createPost(comment) {
        this._setPostsFetchingState(true);

        const post ={
            id: getUniqueID(),
            created: moment.utc(),
            likes: [],
            comment
        };

        await delay(1200);
        this.setState(({ posts})=>({
            posts:[post, ...posts],
            isPostFetching: false,
        }));
    }
    async _likePosts (id) {

        const { currentUserFirstName, currentUserLastName} = this.props;

        this._setPostsFetchingState(true);

        await delay(1200);

        const newPosts = this.state.posts.map(post=>{
            if(post.id === id){
                return {
                    ...post,
                    likes: [
                        {
                        id:  getUniqueID(),
                        firstName: currentUserFirstName,
                        lastName: currentUserLastName,
                    }],
                }
            }
            return post;
        });
        this.setState({
            posts: newPosts,
            isPostFetching: false,
        })
    }

    render () {
        const { posts, isPostFetching } =this.state;
        const postsJSX = posts.map((post) => {
            return <Post key = { post.id }{ ...post } _likePosts = {this._likePosts}/>
        });


        return (
            <section className = { Styles.feed }>
                <Spinner isSpinner={isPostFetching} />
                <StatusBar />
                <Composer _createPost={this._createPost}/>
                {postsJSX}
            </section>
        )
    }
}
