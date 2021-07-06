/**
 * The file contains a pop up modal on user
 *
 * signIn
 *
 * */

import * as React from "react";
import {
    View,
    ActivityIndicator,
    Text,
    Modal,
    Dimensions, TouchableOpacity
} from "react-native";
import {bindActionCreators} from "redux";
import {agreeToTerms, updateSignIn} from "../state/AppActions";
import {connect} from "react-redux";

function ModalContent(props) {
    if (props.type === 'loading'){
        return(
            <>
                <View style={{
                    height: '40%',
                    width: "90%",
                    borderRadius: 10,
                    elevation: 20,
                    margin: 20,
                    alignSelf: "center",
                    backgroundColor: props.app.colors.whiteText,
                    alignItems: 'center',
                    justifyContent: "center"
                }}>
                    <ActivityIndicator
                        size={"large"}
                        color={props.app.colors.buttonColor}/>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 25,
                        margin: 10,
                    }}>
                        Please wait ...
                    </Text>

                </View>

            </>
        )
    }
    else if (props.type === 'loginError'){
        return (
            <>
                <View style={{
                    height: '35%',
                    width: "90%",
                    borderRadius: 10,
                    elevation: 20,
                    margin: 20,
                    // alignSelf: "center",
                    backgroundColor: props.app.colors.whiteText,
                    // alignItems: 'center',
                    justifyContent: "center"
                }}>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        alignSelf: 'center',
                        margin: 10,
                        color: props.app.colors.errorText
                    }}>
                        Oops! Invalid email or password Please try again ...

                    </Text>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: 'center',
                        // alignItems: "center",
                        marginTop: 30
                    }}>
                        <TouchableOpacity
                            onPress={props.onError}
                            style={{
                                backgroundColor: props.app.colors.buttonColor,
                                borderRadius: 5,
                                height: 40,
                                width: '45%',
                                justifyContent: "center",
                                alignItems:"center",
                                elevation: 10,
                            }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: "bold"
                            }}>
                                OK
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </>
        )
    }
    else if (props.type === 'signupError'){
        return (
            <>
                <View style={{
                    height: '35%',
                    width: "90%",
                    borderRadius: 10,
                    elevation: 20,
                    margin: 20,
                    // alignSelf: "center",
                    backgroundColor: props.app.colors.whiteText,
                    // alignItems: 'center',
                    justifyContent: "center"
                }}>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 25,
                        alignSelf: 'center',
                        margin: 10,
                        color: props.app.colors.errorText
                    }}>
                        Oops! an error occurred Please try again ...

                    </Text>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: 'center',
                        // alignItems: "center",
                        marginTop: 30
                    }}>
                        <TouchableOpacity
                            onPress={props.onError}
                            style={{
                                backgroundColor: props.app.colors.buttonColor,
                                borderRadius: 5,
                                height: 40,
                                width: '45%',
                                justifyContent: "center",
                                alignItems:"center",
                                elevation: 10,
                            }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: "bold"
                            }}>
                                OK
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </>
        )
    }

    else if (props.type === 'signupSuccess'){
        return (
            <>
                <View style={{
                    height: '35%',
                    width: "90%",
                    borderRadius: 10,
                    elevation: 20,
                    margin: 20,
                    // alignSelf: "center",
                    backgroundColor: props.app.colors.whiteText,
                    // alignItems: 'center',
                    justifyContent: "center"
                }}>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 25,
                        alignSelf: 'center',
                        margin: 10,
                        color: props.app.colors.primaryText
                    }}>
                        Signup successfully

                    </Text>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: 'center',
                        // alignItems: "center",
                        marginTop: 30
                    }}>
                        <TouchableOpacity
                            onPress={props.onSuccessfully}
                            style={{
                                backgroundColor: props.app.colors.successText,
                                borderRadius: 5,
                                height: 40,
                                width: '45%',
                                justifyContent: "center",
                                alignItems:"center",
                                elevation: 10,
                            }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: "bold"
                            }}>
                                OK
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </>
        )
    }
}

function PleaseWaitModal(props){
    return(
        <>
            <View style={{
                alignItems: "center",
                justifyContent:  "center",

            }}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={props.modalVisible}
                    statusBarTranslucent={true}
                    onRequestClose={props.onRequestClose}

                >
                    <View style={{
                        backgroundColor: 'rgba(0,0,0,.9)',
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <ModalContent
                            {...props}
                        />
                    </View>
                </Modal>
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
        agreeToTerms,
        updateSignIn

    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(PleaseWaitModal)
