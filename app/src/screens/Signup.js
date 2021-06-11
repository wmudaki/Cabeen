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
import { agreeToTerms } from "../state/AppActions";

class Signup extends React.PureComponent{
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

    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
