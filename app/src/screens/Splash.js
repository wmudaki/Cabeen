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
    ActivityIndicator, Image
} from 'react-native'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";


function Splash(props){
    StatusBar.setBackgroundColor(props.app.colors.statusBar)

    return(
        <>
            <View style={{
                flex: 1,
                backgroundColor: props.app.colors.background,
                justifyContent: "center",
                alignItems: "center"

            }}>
                <Image
                    source={require('../../assets/image/cabeen.png')}
                    style={{
                        height: 150,
                        width: 150
                    }}
                />

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
