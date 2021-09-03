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
    ActivityIndicator, Alert, BackHandler, Image
} from 'react-native'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    HalfWidthButton
} from "../components/Buttons";
import { Actions } from "react-native-router-flux";
import CabeenAddModal from "../modals/CabeenAddModal";
import {updateUrls} from "../state/AppActions";


function Welcome(props){
    StatusBar.setBackgroundColor(props.app.colors.statusBar)

    React.useEffect(() => {
        if (!props.app.currentUser.isActive){
            props.updateUrls('cabeens', 'https://app.cabeen.culturol.com/cabeens/')
            props.updateUrls('avatars', 'https://app.cabeen.culturol.com/avatars/')
            Actions.replace('login')
        } else {
            props.updateUrls('cabeens', 'https://app.cabeen.culturol.com/cabeens/')
            props.updateUrls('avatars', 'https://app.cabeen.culturol.com/avatars/')
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
                <Image
                    source={require('../../assets/image/cabeen.png')}
                    style={{
                        height: 170,
                        width: 170
                    }}
                />
                <Text style={{
                    fontWeight: 'bold',
                    color: props.app.colors.primaryText,
                    fontSize: 35,
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
        updateUrls
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
