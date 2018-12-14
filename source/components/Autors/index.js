// Core
import React, { Component } from 'react';


export default class Autors extends Component{

    render() {

        const autorsJSX = this.props.authors.map((author) => {

            return (
                <li>
                     <span>{ ...author}</span>
                </li>
            );
        });

        return <ul>{ autorsJSX }</ul>
    }
};

