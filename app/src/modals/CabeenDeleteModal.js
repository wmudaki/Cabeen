import * as React from 'react'
import {
    View,
    Modal, Text, TextInput, TouchableOpacity, ActivityIndicator
} from "react-native";
import {bindActionCreators} from "redux";
import {addCabeen, addTenant} from "../state/CabeenActions";
import {connect} from "react-redux";

function CabeenDeleteLoading(props) {
    return(
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
                    Please wait...

                </Text>
                <View style={{
                    flexDirection: "row",
                    justifyContent: 'center',
                    // alignItems: "center",
                    marginTop: 30
                }}>
                    <ActivityIndicator
                        color={props.app.colors.buttonColor}
                        size={'large'}
                    />
                </View>

            </View>

        </>
    )
}

function CabeenDeleteModalSuccess(props){
    return(
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
                    fontSize: 23,
                    margin: 10,
                    color: props.app.colors.primaryText
                }}>
                    Cabeen deleted successfully

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

function CabeenDeleteModalError(props){
    return(
        <>
            <View style={{
                height: '36%',
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
                    Oops!! an error occurred Please try again ...

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

function CabeenDeleteModalContent(props) {
    return(
        <>
            <View style={{
                height: '40%',
                width: '90%',
                justifyContent: "center",
                borderRadius: 10,
                padding: 10,
                backgroundColor: props.app.colors.whiteText
            }}>
                <Text
                    style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    margin: 10,
                    alignSelf: 'center',
                    color: props.app.colors.errorText,
                }}>
                    Are you sure you want to delete the cabeen ?
                </Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: 20,
                    marginTop: 30,
                }}>
                    <TouchableOpacity
                        onPress={props.onCancel}
                        style={{
                            borderRadius: 5,
                            height: 40,
                            width: '45%',
                            justifyContent: "center",
                            alignItems:"center",
                            borderWidth: 1,
                            borderColor: props.app.colors.secondaryText,
                        }}>
                        <Text style={{
                            fontSize: 18,

                        }}>
                            Cancel
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={props.onSubmit}
                        style={{
                            backgroundColor: props.app.colors.buttonColor,
                            borderRadius: 5,
                            height: 40,
                            width: '45%',
                            justifyContent: "center",
                            alignItems:"center"
                        }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "bold"
                        }}>
                            Delete
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

function Content(props) {
    if (props.isType === 'error'){
        return (
            <CabeenDeleteModalError
                {...props}
            />
        )
    }
    else if (props.isType === 'success'){
        return (
            <CabeenDeleteModalSuccess
                {...props}
            />
        )
    }
    else if (props.isType === 'loading'){
        return (
            <CabeenDeleteLoading
                {...props}
            />
        )
    }
    else {
        return(
            <CabeenDeleteModalContent
                {...props}
            />
        )
    }
}


function CabeenDeleteModal(props){
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
                        <Content
                            {...props}
                        />
                    </View>
                </Modal>
            </View>
        </>
    )
}


const mapStateToProps = state => {
    const {app, cabeen} = state;
    return {app, cabeen}
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addTenant,
        addCabeen

    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(CabeenDeleteModal)

