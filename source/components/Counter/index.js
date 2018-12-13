// Core
import React from 'react';
import { number} from 'prop-types';

// Instruments
import Styles from './styles.m.css';

const Counter = ({ count }) => (
    <section className={Styles.counter}>
        Post Count: { count }
    </section>
);
Counter.protoType = {
    count: number.isRequired,
};

Counter.defaultProps= {
    count: 0,
};

export default Counter;


