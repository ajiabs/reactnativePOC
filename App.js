import React, {Component} from 'react';

import {BackgroundWrapper} from './src/components';

import { Register} from './src/pages';

export default class App extends Component {
    render(){
        return <BackgroundWrapper paddingTop={0}>
            <Router getSceneStyle={getScenceStyle}>
                <Scene key="home" component={Register} initial hideNavBar/>
            </Router>
        </BackgroundWrapper>
    }
}