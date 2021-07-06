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
    ActivityIndicator
} from 'react-native'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";


function Splash(props){
    StatusBar.setBackgroundColor(props.app.colors.statusBar)

    return(
        <>
            <View style={{
                flex: 1,
                backgroundColor: props.app.colors.statusBar,
                justifyContent: "center",
                alignItems: "center"

            }}>

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

export default connect(mapStateToProps, mapDispatchToProps)(Splash)
