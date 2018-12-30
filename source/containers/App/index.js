// Core
import React, { Component } from 'react';
import { Switch,  Route, Redirect } from 'react-router-dom';


//Components
import Catcher from 'components/Catcher';
import StatusBar from 'components/StatusBar';
import Feed from 'components/Feed';
import Login from 'components/Login';
import Profile from 'components/Profile';
import { Provider } from 'components/HOC/withProfile';

// Instruments
import avatar from 'theme/assets/user';
// import Login from '../../components/Login'


export default class App extends Component {
    constructor() {
        super();

        this.state = {
            avatar,
            isAuthenticate:       false,
            currentUserFirstName: 'Natalia',
            currentUserLastName:  'Sabadysh',
            _logout:              this._logout,
        };
    }

    _login = () => {
        this.setState({
            isAuthenticate: true,
        });
    };

    _logout = () => {
        this.setState({
            isAuthenticate: false,
        });
    };

    render() {
        const { isAuthenticate } = this.state;

        return (
            <Catcher>
                <Provider value = { this.state }>
                    <StatusBar />
                    <Switch>
                        <Route
                            path = '/login'
                            render = { (props)=> (
                                <Login
                                    _login = { this._login }
                                    { ...props }  
                                />
                            ) }
                        />
                        {isAuthenticate  &&  < Redirect to = '/login' /> }
                        <Route
                            component = { Feed }
                            path = '/feed'
                        />
                        <Route
                            component = { Profile }
                            path = '/profile'
                        />
                        <Redirect to = '/feed' />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
