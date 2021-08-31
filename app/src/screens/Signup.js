/**
 * The file creates a  signup screen for new users
 *
 * */

import * as React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from "react-native";
import {RegularTextInput} from "../components/TextInputs";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { HalfWidthButton } from "../components/Buttons";
import { Actions } from "react-native-router-flux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { agreeToTerms, updateSignIn } from "../state/AppActions";
import {useQuery, useMutation, gql} from "@apollo/client";
import SignUpModal from "../modals/PleaseWaitModal";
import {authenticate} from "../state/AppActions";
import PrivacyModal from "../modals/PrivacyModal";


function Signup(props) {
    const CREATE_USER = gql`
        mutation CREATE_USER(
            $username: String,
            $fullName: String,
            $phone: String,
            $password: String,
            $email: String
        ){
            createUser(
                input:{
                    username: $username,
                    fullName: $fullName,
                    phone: $phone,
                    password: $password,
                    email: $email
                }
            ){
                token,
                user{
                    _id,
                    email,
                    fullName,
                    phone,
                }
                
            }
        }
    `

    const [createUser] = useMutation(CREATE_USER)
    const [isSigningIn, setIsSigningIn] = React.useState(false)
    const [type, setType] = React.useState('loading')
    const [isPrivacyModal, setIsPrivacyModal] = React.useState(false)

    const signIn = () => {
        setIsSigningIn(true)
        setType('loading')
        createUser({variables:{
            username: props.app.signIn.username,
                fullName: props.app.signIn.fullName,
                phone: props.app.signIn.phone,
                password: props.app.signIn.password,
                email: props.app.signIn.email
            }})
            .then((res) => {
                props.authenticate('activate', true)
                props.authenticate('token', res.data.createUser.token)
                props.authenticate('user', res.data.createUser.user)
                props.updateSignIn('clear', 'clear')
                setType('signupSuccess')
            })
            .catch(e => {
                setType('signupError')
            })
    }

    function verifyFields(){
        if (props.app.signIn.fullName.length < 5){
            return false
        }
        else if (props.app.signIn.phone.length < 5){
            return false
        }
        else if (props.app.signIn.email.length < 5){
            return false
        }
        else if (props.app.signIn.password.length < 5){
            return false
        }
        else if (!props.app.termsAgree){
            return false
        }
        return true
    }

    return(
        <>
            <ScrollView style={{
                flex: 1,
                backgroundColor: props.app.colors.whiteText
            }}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 50,
                    margin: 50,
                    alignSelf:'center',
                    color: props.app.colors.primaryText
                }}>
                    Signup
                </Text>
                <View>
                    <View style={{
                        marginTop: 0

                    }}>
                        <RegularTextInput
                            placeholder={'Name'}
                            placeholderTextColor={props.app.colors.secondaryText}
                            textColor={props.app.colors.primaryText}
                            borderColor={props.app.colors.statusBar}
                            backgroundColor={props.app.colors.background}
                            onChangeText={(value) => props.updateSignIn('fullName', value)}
                            secureTextEntry={false}
                            iconName={'person'}
                            iconColor={props.app.colors.statusBar}
                        />
                    </View>
                    <View style={{
                        marginTop: 30

                    }}>
                        <RegularTextInput
                            placeholder={'Email'}
                            placeholderTextColor={props.app.colors.secondaryText}
                            textColor={props.app.colors.primaryText}
                            borderColor={props.app.colors.statusBar}
                            backgroundColor={props.app.colors.background}
                            onChangeText={(value) => props.updateSignIn('email', value)}
                            secureTextEntry={false}
                            iconName={'mail'}
                            iconColor={props.app.colors.statusBar}
                        />
                    </View>
                    <View style={{
                        marginTop: 30

                    }}>
                        <RegularTextInput
                            placeholder={'Phone'}
                            placeholderTextColor={props.app.colors.secondaryText}
                            textColor={props.app.colors.primaryText}
                            borderColor={props.app.colors.statusBar}
                            backgroundColor={props.app.colors.background}
                            onChangeText={(value) => props.updateSignIn('phone', value)}
                            secureTextEntry={false}
                            iconName={'call'}
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
                            onChangeText={(value) => props.updateSignIn('password', value)}
                            secureTextEntry={true}
                            iconName={'lock-closed'}
                            iconColor={props.app.colors.statusBar}
                        />
                    </View>
                </View>
                <View style={{
                    flexDirection:'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 30
                }}>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={() =>props.agreeToTerms() }
                    >
                        <MaterialCommunityIcons
                            name={props.app.termsAgree ?
                                "checkbox-marked-circle-outline":
                                "checkbox-blank-circle-outline"
                            }
                            size={30}
                            color={props.app.colors.statusBar}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 10
                    }}>
                        <Text style={{
                            color: props.app.colors.primaryText,
                            fontSize: 18,
                            // marginTop: 30,
                            // fontWeight: 'bold',
                            alignSelf: 'center'
                        }}>
                            I agree to the Terms of use
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => verifyFields() ? signIn(): null}
                        style={{
                        alignItems: 'center',
                        margin: 50
                    }}>
                        <HalfWidthButton
                            name={'Signup'}
                            disabled={!verifyFields()}
                        />
                    </TouchableOpacity>
                </View>
                <View>

                    <TouchableOpacity onPress={() => setIsPrivacyModal(true)}>
                        <Text style={{
                            alignSelf: 'center',
                            fontSize: 18,
                            margin: 10,
                            color: props.app.colors.secondaryText,
                            textDecorationLine: 'underline'
                        }}>
                            Privacy policy
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => Actions.login()}
                    >
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            margin: 10,
                            color: props.app.colors.statusBar
                        }}>
                            Have an account ? Login here
                        </Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
            <SignUpModal
                modalVisible={isSigningIn}
                onRequestClose={() => {
                    setIsSigningIn(false)
                }}
                type={type}
                onCancel={() => {
                    setIsSigningIn(false)
                }}
                onError={() => {
                    setIsSigningIn(false)
                }}
                onSuccessfully={() => {
                    Actions.discover({initial: true})
                    setIsSigningIn(false)
                }}
            />
            <PrivacyModal
                modalVisible={isPrivacyModal}
                onRequestClose={() => {
                    setIsPrivacyModal(false)
                }}
                onOK={() => {
                    setIsPrivacyModal(false)
                }}
            />
        </>
    )

}

class SignupAlpha extends React.PureComponent{
    render(){
        return(
            <>
                <ScrollView style={{
                    flex: 1,
                    backgroundColor: this.props.app.colors.background
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 50,
                        margin: 50,
                        alignSelf:'center',
                        color: this.props.app.colors.primaryText
                    }}>
                        Signup
                    </Text>
                    <View>
                        <View style={{
                            marginTop: 0

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
                                placeholder={'Full Name'}
                                placeholderTextColor={this.props.app.colors.secondaryText}
                                textColor={this.props.app.colors.primaryText}
                                borderColor={this.props.app.colors.statusBar}
                                backgroundColor={this.props.app.colors.background}
                                onChangeText={this.handleInput}
                                secureTextEntry={false}
                                iconName={'person-circle'}
                                iconColor={this.props.app.colors.statusBar}
                            />
                        </View>
                        <View style={{
                            marginTop: 30

                        }}>
                            <RegularTextInput
                                placeholder={'Phone'}
                                placeholderTextColor={this.props.app.colors.secondaryText}
                                textColor={this.props.app.colors.primaryText}
                                borderColor={this.props.app.colors.statusBar}
                                backgroundColor={this.props.app.colors.background}
                                onChangeText={this.handleInput}
                                secureTextEntry={false}
                                iconName={'call'}
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
                    <View style={{
                        flexDirection:'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 30
                    }}>
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={() =>this.props.agreeToTerms() }
                        >
                            <MaterialCommunityIcons
                                name={this.props.app.termsAgree ?
                                    "checkbox-marked-circle-outline":
                                    "checkbox-blank-circle-outline"
                                }
                                size={30}
                                color={this.props.app.colors.statusBar}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 10
                        }}>
                            <Text style={{
                                color: this.props.app.colors.primaryText,
                                fontSize: 18,
                                // marginTop: 30,
                                // fontWeight: 'bold',
                                alignSelf: 'center'
                            }}>
                                I agree to the Terms of use
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={{
                            alignItems: 'center',
                            margin: 50
                        }}>
                            <HalfWidthButton
                                name={'Signup'}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>

                        <TouchableOpacity>
                            <Text style={{
                                alignSelf: 'center',
                                fontSize: 18,
                                margin: 10,
                                color: this.props.app.colors.secondaryText,
                                textDecorationLine: 'underline'
                            }}>
                                Privacy policy
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => Actions.login()}
                        >
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                alignSelf: 'center',
                                margin: 10,
                                color: this.props.app.colors.statusBar
                            }}>
                                Have an account ? Login here
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
        agreeToTerms,
        updateSignIn,
        authenticate

    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
