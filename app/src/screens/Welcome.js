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
    TouchableOpacity
} from 'react-native'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    HalfWidthButton
} from "../components/Buttons";

class Welcome extends React.PureComponent{

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
                        fontSize: 30
                    }}>
                        Karibu Cabeen
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <TouchableOpacity
                            onPress={''}
                            style={{
                            alignItems: 'center',
                            justifyContent:'center'
                        }}>
                            <HalfWidthButton
                                name={'Signup'}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={''}
                            style={{
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
    return app
}

const mapDispatchToProps = dispatch => {
    bindActionCreators({

    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
