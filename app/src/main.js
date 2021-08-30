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
    Modal,
    Tabs} from 'react-native-router-flux'
import {Provider} from 'react-redux'
import  {createStore} from 'redux'
import {persistStore, persistReducer} from "redux-persist";
import rootReducer from './state/Index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    LogBox
} from "react-native";
import {PersistGate} from "redux-persist/integration/react";

import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { CustomTabBar } from "./components/NavBars";
import Discover from "./screens/Discover";
import Home from "./screens/Home";
import Notification from "./screens/Notification";
import Cabeen from "./screens/Cabeen";
import Account from "./screens/Account";
import ProfileEdit from "./screens/ProfileEdit";
import CabeenAdd from "./screens/CabeenAdd";
import CabeenManagement from "./screens/CabeenManagement";
import Search from "./screens/Search";
import Splash from "./screens/Splash";
import Find from "./screens/Find";
import Privacy from "./screens/Privacy";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import {
    ApolloProvider,
    ApolloClient,
    createHttpLink,
    InMemoryCache
} from "@apollo/client";
import {createUploadLink} from "apollo-upload-client";

LogBox.ignoreLogs(['Deprecation in \'createStackNavigator\':\n' +
'\'transitionConfig\' is removed in favor of the new animation APIs', 'Deprecation in \'navigationOptions\':\n' +
'- \'header: null\' will be removed in a future version. Use \'headerShown: false\' instead',
'If you want to use Reanimated 2 then go through our installation steps ' +
'https://docs.swmansion.com/react-native-reanimated/docs/installation'])

export default function App (){

    const persistConfig = {
        key: 'root',
        storage: AsyncStorage,
        stateReconciler: autoMergeLevel2,
    }

    const persistedReducer = persistReducer(persistConfig, rootReducer)

    const store = createStore(persistedReducer)

    const persistor = persistStore(store)

// const store = createStore(rootReducer);

    const httpLink = createUploadLink({
        uri: "http://192.168.0.25:4000/graphql"
    })

    const client = new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache()
    })

    return(
        <ApolloProvider client={client}>
            <Provider store={store}>
                <PersistGate loading={<Splash/>} persistor={persistor}>
                    <Router backAndroidHandler={() => {return false}}>
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
                                        component={Find}
                                        key={'find'}
                                        hideNavBar
                                    />
                                    <Scene
                                        component={Discover}
                                        key={'home'}
                                        hideNavBar
                                    />

                                </Tabs>
                                <Scene
                                    component={Cabeen}
                                    key={'cabeen'}
                                    hideNavBar
                                />
                                <Scene
                                    component={Account}
                                    key={'account'}
                                    hideNavBar
                                />
                                <Scene
                                    component={ProfileEdit}
                                    key={'profileEdit'}
                                    hideNavBar
                                />
                                <Scene
                                    component={CabeenAdd}
                                    key={'cabeenAdd'}
                                    hideNavBar
                                />
                                <Scene
                                    component={CabeenManagement}
                                    key={'cabeenManagement'}
                                    hideNavBar
                                />
                                <Scene
                                    component={Search}
                                    key={'search'}
                                    hideNavBar
                                />
                                <Scene
                                    component={Privacy}
                                    key={'privacy'}
                                    hideNavBar
                                />
                            </Scene>
                        </Lightbox>
                    </Router>
                </PersistGate>
            </Provider>
        </ApolloProvider>
    )
}
