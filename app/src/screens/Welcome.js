/**
 *
 * The  file creates the welcome into screen on app load
 *
 * Directs the user either to the signup screen or the login screen
 *
 */

import * as React from 'react'
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator, Alert, BackHandler
} from 'react-native'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    HalfWidthButton
} from "../components/Buttons";
import { Actions } from "react-native-router-flux";
import CabeenAddModal from "../modals/CabeenAddModal";


function Welcome(props){
    StatusBar.setBackgroundColor(props.app.colors.statusBar)

    React.useEffect(() => {
        if (!props.app.currentUser.isActive){
            Actions.replace('login')
        } else {
            Actions.discover()
        }
    })

    return(
        <>
            <View style={{
                flex: 1,
                backgroundColor: props.app.colors.background,
                alignItems: "center",
                justifyContent: "center"

            }}>
                <Text style={{
                    fontWeight: 'bold',
                    color: props.app.colors.primaryText,
                    fontSize: 70,
                    // marginTop: 70,
                    // margin: 20,
                    alignSelf: 'center'
                }}>
                    Cabeen
                </Text>
                {/*<ActivityIndicator size={"large"} color={props.app.colors.statusBar}/>*/}
            </View>
        </>
    )
}

const mapStateToProps = state => {
    const {app} = state;
    return {app}
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({

    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
