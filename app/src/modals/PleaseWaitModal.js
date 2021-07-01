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
    Dimensions
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
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 25,
                        margin: 10,
                        color: props.app.colors.errorText
                    }}>
                        Oops! Invalid Password or Username Please try again ...

                    </Text>

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
