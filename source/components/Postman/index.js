// Core
import React, { Component } from 'react';

import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

// Instruments
import Styles from './styles.m.css';

//Components
import { withProfile } from 'components/HOC/withProfile';

const Postman = (props) => {

    const  _aniatePostmanEnter = (postman) => {
        fromTo(postman, 1, {x:400}, {x:0})
    };
    const  _aniatePostmanEntered = (postman) => {
        fromTo(postman, 1, {x:0}, {x:400})
    };

    return(
        <Transition
            appear
            in
            timeout = { 5000 }
            onEnter = { _aniatePostmanEnter }
            onEntered = { _aniatePostmanEntered }
        >

            <section className = { Styles.postman }>
                <img src={props.avatar} />
                <span>Welcom online { props.currentUserFirstName}</span>
            </section>
        </Transition>
    )
};
export default withProfile(Postman);
