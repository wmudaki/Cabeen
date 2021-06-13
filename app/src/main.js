/*
* The file contains the main configuration for the application
*
* This is the main entrance to the application.
*
* */

import * as React from 'react'
import {
    Router,
    Scene,
    Lightbox,
    Tabs} from 'react-native-router-flux'
import {Provider} from 'react-redux'
import  {createStore} from 'redux'
import rootReducer from './state/Index'
import {
    LogBox
} from "react-native";

import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { CustomTabBar } from "./components/NavBars";
import Home from "./screens/Home";

const store = createStore(rootReducer);

LogBox.ignoreLogs(['Deprecation in \'createStackNavigator\':\n' +
'\'transitionConfig\' is removed in favor of the new animation APIs', 'Deprecation in \'navigationOptions\':\n' +
'- \'header: null\' will be removed in a future version. Use \'headerShown: false\' instead',
'If you want to use Reanimated 2 then go through our installation steps ' +
'https://docs.swmansion.com/react-native-reanimated/docs/installation'])

export default class App extends React.PureComponent{
    render(){
        return(
            <Provider store={store}>
                <Router>
                    <Lightbox>
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
                            <Tabs
                                key={'tabBar'}
                                tabBarComponent={CustomTabBar}
                                hideNavBar
                                lazy
                            >
                                <Scene
                                    component={Home}
                                    key={'discover'}
                                    hideNavBar
                                />
                                <Scene
                                    component={Home}
                                    key={'home'}
                                    hideNavBar
                                />
                                <Scene
                                    component={Home}
                                    key={'notifications'}
                                    hideNavBar
                                />

                            </Tabs>
                        </Scene>

                    </Lightbox>
                </Router>
            </Provider>
        )
    }
}
