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
    TouchableOpacity
} from 'react-native'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    HalfWidthButton
} from "../components/Buttons";
import { Actions } from "react-native-router-flux";

class Welcome extends React.PureComponent{
    componentDidMount() {
        StatusBar.setBackgroundColor(this.props.app.colors.statusBar)
    }

    render(){
        return(
            <>
                <View style={{
                    flex: 1,
                    backgroundColor: this.props.app.colors.background

                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        color: this.props.app.colors.primaryText,
                        fontSize: 70,
                        marginTop: 70,
                        margin: 20,
                        alignSelf: 'center'
                    }}>
                        Cabeen
                    </Text>
                    <View style={{flex: 1}}/>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        bottom: 70
                    }}>
                        <TouchableOpacity
                            onPress={() => Actions.signup()}
                            style={{
                                flex: 0.5,
                            alignItems: 'center',
                            justifyContent:'center'
                        }}>
                            <HalfWidthButton
                                name={'Signup'}
                                isSecondary={true}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => Actions.login()}
                            style={{
                                flex: 0.5,
                                alignItems: 'center',
                                justifyContent:'center'
                            }}>
                            <HalfWidthButton
                                name={'Login'}
                            />
                        </TouchableOpacity>
                    </View>

                </View>
            </>
        )
    }
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
