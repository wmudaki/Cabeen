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
import {
    LogBox
} from "react-native";

import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import Signup from "./screens/Signup";

const store = createStore(rootReducer);

LogBox.ignoreLogs(['Deprecation in \'createStackNavigator\':\n' +
'\'transitionConfig\' is removed in favor of the new animation APIs', 'Deprecation in \'navigationOptions\':\n' +
'- \'header: null\' will be removed in a future version. Use \'headerShown: false\' instead'])

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
                        <Scene
                          component={Login}
                          key={'login'}
                          hideNavBar
                        />
                        <Scene
                            component={Signup}
                            key={'signup'}
                            hideNavBar
                        />
                    </Scene>
                </Router>
            </Provider>
        )
    }
}
