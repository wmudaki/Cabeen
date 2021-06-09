/**
 * The file creates a login screen for the application
 */

import * as React from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    TextInput
} from 'react-native'

import {
    HalfWidthButton
} from "../components/Buttons";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class Login extends React.PureComponent{
    render(){
        return(
            <>
                <View style={{
                    flex:1
                }}>
                    <Text style={{
                        color: this.props.app.colors.primaryText,
                        fontSize: 30,
                        fontWeight: 'bold'
                    }}>
                        Login
                    </Text>
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <TextInput
                                placeholder={'Username'}
                                style={{
                                    height: 50,
                                    borderRadius: 10,
                                    borderWidth: 2,
                                    borderColor: this.props.app.colors.background
                                }}
                            />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <TextInput
                                placeholder={'Password'}
                                style={{
                                    height: 50,
                                    borderRadius: 10,
                                    borderWidth: 2,
                                    borderColor: this.props.app.colors.background
                                }}
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
