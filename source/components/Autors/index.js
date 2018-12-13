// Core
import React, { Component } from 'react';


export default class Autors extends Component{
    render() {
        const authors = this.state.posts.map(post => post.author);

        const autorsJSX = authors.map((author) => {

            return (
                <li key = { author.id } >

                    <div>

                        <span>{post.firstName}</span>
                        <span>{post.lastName}</span>
                        <span>{post.avatar}</span>

                    </div>

                </li>
            );
        });

        return <ul>{ autorsJSX }</ul>
    }
};

