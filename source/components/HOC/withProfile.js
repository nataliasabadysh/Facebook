// Core
import  React, { Component, createContext } from 'react';

export const { Provider, Consumer } = createContext();

const withProfile = (Enhanceable)=> {

    return class WidthProfile extends Component {
        render(){
            return(
                <Consumer>
                    { ( context)  =>  <Enhanceable {...context} {...this.props} /> }
                </Consumer>
            )
        }
    }
};
 export {  withProfile }



 // export { Provider ,Consumer ,  withProfile };

