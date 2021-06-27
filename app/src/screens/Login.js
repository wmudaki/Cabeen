/**
 * The file creates a login screen for the application
 */

import * as React from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    ScrollView
} from 'react-native'

import {
    HalfWidthButton
} from "../components/Buttons";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {RegularTextInput} from "../components/TextInputs";
import { Actions } from "react-native-router-flux";
import {useQuery, gql, useMutation} from "@apollo/client";
import SignUpModal from "../modals/SignUpModal";
import {updateLogin} from "../state/AppActions";

function Login(props){
    const LOGIN = gql`
        mutation LOGIN(
            $username: String,
            $password: String
        ){
            login(
                username: $username,
                password: $password,
            ){
                token,
                user{
                    username
                }
            }
        }
    
    `
    const [login] = useMutation(LOGIN)
    const [isLoginIn, setIsLoginIn] = React.useState(false)

    const userLogin = () => {
        setIsLoginIn(true)
        login({variables: {
            username: props.app.login.username,
                password: props.app.login.password
            }})
            .then((res) => {
                setIsLoginIn(false)
                console.log(res)
                updateLogin("clear", 'clear')
                Actions.home()
            })
            .catch(e => console.log("Error", e))
    }

    return(
        <>
            <ScrollView style={{
                flex:1,
                backgroundColor: props.app.colors.background
            }}>
                <Text style={{
                    color: props.app.colors.primaryText,
                    fontSize: 70,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    margin: 70
                }}>
                    Login
                </Text>
                {/*<LoginHooks/>*/}
                <View>
                    <View style={{

                    }}>
                        <RegularTextInput
                            placeholder={'Username'}
                            placeholderTextColor={props.app.colors.secondaryText}
                            textColor={props.app.colors.primaryText}
                            borderColor={props.app.colors.statusBar}
                            backgroundColor={props.app.colors.background}
                            onChangeText={(value) => props.updateLogin('username', value)}
                            secureTextEntry={false}
                            iconName={'person'}
                            iconColor={props.app.colors.statusBar}
                        />
                    </View>
                    <View style={{
                        marginTop: 30
                    }}>
                        <RegularTextInput
                            placeholder={'Password'}
                            placeholderTextColor={props.app.colors.secondaryText}
                            textColor={props.app.colors.primaryText}
                            borderColor={props.app.colors.statusBar}
                            backgroundColor={props.app.colors.background}
                            onChangeText={(value) => props.updateLogin("password", value)}
                            secureTextEntry={true}
                            iconName={'lock-closed'}
                            iconColor={props.app.colors.statusBar}
                        />
                    </View>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => userLogin()}
                        style={{
                            alignItems: 'center',
                            margin: 50
                        }}>
                        <HalfWidthButton
                            name={'Login'}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity>
                        <Text style={{
                            color: props.app.colors.primaryText,
                            fontSize: 18,
                            // fontWeight: 'bold',
                            alignSelf: 'center'
                        }}>
                            Forgot password ?
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{
                            alignSelf: 'center',
                            fontSize: 18,
                            margin: 20,
                            color: props.app.colors.secondaryText,
                            textDecorationLine: 'underline'
                        }}>
                            Privacy policy
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => Actions.signup()}
                    >
                        <Text style={{
                            fontSize: 23,
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            margin: 20,
                            color: props.app.colors.statusBar
                        }}>
                            Sign up here
                        </Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
            <SignUpModal
                modalVisible={isLoginIn}
                onRequestClose={() => {
                    setIsLoginIn(false)
                }}
            />
        </>
    )
}

class LoginH extends React.PureComponent{
    handleInput(input){
        console.log(input)
    }

    render(){
        return(
            <>
                <ScrollView style={{
                    flex:1,
                    backgroundColor: this.props.app.colors.background
                }}>
                    <Text style={{
                        color: this.props.app.colors.primaryText,
                        fontSize: 70,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        margin: 70
                    }}>
                        Login
                    </Text>
                    <LoginHooks/>
                    <View>
                        <View style={{

                        }}>
                            <RegularTextInput
                                placeholder={'Username'}
                                placeholderTextColor={this.props.app.colors.secondaryText}
                                textColor={this.props.app.colors.primaryText}
                                borderColor={this.props.app.colors.statusBar}
                                backgroundColor={this.props.app.colors.background}
                                onChangeText={this.handleInput}
                                secureTextEntry={false}
                                iconName={'person'}
                                iconColor={this.props.app.colors.statusBar}
                            />
                        </View>
                        <View style={{
                            marginTop: 30
                        }}>
                            <RegularTextInput
                                placeholder={'Password'}
                                placeholderTextColor={this.props.app.colors.secondaryText}
                                textColor={this.props.app.colors.primaryText}
                                borderColor={this.props.app.colors.statusBar}
                                backgroundColor={this.props.app.colors.background}
                                onChangeText={this.handleInput}
                                secureTextEntry={true}
                                iconName={'lock-closed'}
                                iconColor={this.props.app.colors.statusBar}
                            />
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => Actions.home()}
                            style={{
                            alignItems: 'center',
                            margin: 50
                        }}>
                            <HalfWidthButton
                                name={'Login'}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Text style={{
                                color: this.props.app.colors.primaryText,
                                fontSize: 18,
                                // fontWeight: 'bold',
                                alignSelf: 'center'
                            }}>
                                Forgot password ?
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{
                                alignSelf: 'center',
                                fontSize: 18,
                                margin: 20,
                                color: this.props.app.colors.secondaryText,
                                textDecorationLine: 'underline'
                            }}>
                                Privacy policy
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => Actions.signup()}
                        >
                            <Text style={{
                                fontSize: 23,
                                fontWeight: 'bold',
                                alignSelf: 'center',
                                margin: 20,
                                color: this.props.app.colors.statusBar
                            }}>
                                Sign up here
                            </Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
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
        updateLogin

    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Login)
