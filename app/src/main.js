/*
* The file contains the main configuration for the application
*
* This is the main entrance to the application.
*
* */

import * as React from 'react'
import {Router, Scene} from 'react-native-router-flux'
import {Provider} from 'react-redux'
import  {createStore} from 'redux'
import rootReducer from './state/Index'

import Welcome from "./screens/Welcome";

const store = createStore(rootReducer);

export default class App extends React.PureComponent{
    render(){
        return(
            <Provider store={store}>
                <Router>
                    <Scene key={'root'}>
                        <Scene
                            component={Welcome}
                            key={'welcome'}
                            hideNavBar
                        />
                    </Scene>
                </Router>
            </Provider>
        )
    }
}