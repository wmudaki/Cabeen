import * as React from 'react'
import {
    View,
    Modal, Text, TextInput, TouchableOpacity, ScrollView
} from "react-native";
import {bindActionCreators} from "redux";
import {addTenant} from "../state/CabeenActions";
import {connect} from "react-redux";


function CabeenAddModalSuccess(props){
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
                    Cabeen added successfully

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

function CabeenAddModalError(props){
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

function CabeenAddModalContent(props){
    return(
        <>
            <View style={{
                height: '70%',
                width: '95%',
                justifyContent: "center",
                borderRadius: 10,
                padding: 10,
                backgroundColor: props.app.colors.whiteText
            }}>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 25,
                    margin: 10
                }}>
                    Add Cabeen
                </Text>
                <ScrollView>

                    <TextInput
                        placeholder={'Cabeen name'}
                        placeholderTextColor={props.app.colors.secondaryText}
                        // onChangeText={(value) => props.addTenant('userId', value)}
                        style={{
                            // borderRadius: 10,
                            borderBottomColor: props.app.colors.background,
                            borderBottomWidth: 2,
                            // backgroundColor: props.app.colors.background,
                            fontSize: 20,
                            padding:10,
                            margin: 20,
                            color: props.app.colors.primaryText
                        }}
                    />
                    <TextInput
                        placeholder={'Price'}
                        placeholderTextColor={props.app.colors.secondaryText}
                        // onChangeText={(value) => props.addTenant('houseLabel', value)}
                        style={{
                            // borderRadius: 10,
                            borderBottomColor: props.app.colors.background,
                            borderBottomWidth: 2,
                            // backgroundColor: props.app.colors.background,
                            fontSize: 20,
                            padding:10,
                            margin: 20,
                            color: props.app.colors.primaryText
                        }}
                    />
                    <TextInput
                        placeholder={'Location'}
                        placeholderTextColor={props.app.colors.secondaryText}
                        // onChangeText={(value) => props.addTenant('houseLabel', value)}
                        style={{
                            // borderRadius: 10,
                            borderBottomColor: props.app.colors.background,
                            borderBottomWidth: 2,
                            // backgroundColor: props.app.colors.background,
                            fontSize: 20,
                            padding:10,
                            margin: 20,
                            color: props.app.colors.primaryText
                        }}
                    />
                    <TextInput
                        placeholder={'Description'}
                        placeholderTextColor={props.app.colors.secondaryText}
                        multiline
                        // onChangeText={(value) => props.addTenant('houseLabel', value)}
                        style={{
                            // borderRadius: 10,
                            borderBottomColor: props.app.colors.background,
                            borderBottomWidth: 2,
                            // backgroundColor: props.app.colors.background,
                            fontSize: 20,
                            maxHeight: 150,
                            padding:10,
                            margin: 20,
                            color: props.app.colors.primaryText
                        }}
                    />
                    <TouchableOpacity
                        // onPress={props.onCancel}
                        style={{
                            borderRadius: 20,
                            height: 40,
                            margin: 20,
                            width: '45%',
                            justifyContent: "center",
                            alignItems:"center",
                            alignSelf: "center",
                            borderWidth: 1,
                            borderColor: props.app.colors.buttonColor,
                        }}>
                        <Text style={{
                            fontSize: 18,
                            color: props.app.colors.buttonColor

                        }}>
                            Add Images
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: 20,
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
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

function Content(props){
    if (props.isType === 'error'){
        return (
            <CabeenAddModalError {...props}/>
        )

    }

    else if (props.isType === 'success'){
        return(
            <CabeenAddModalSuccess {...props}/>
        )
    }

    else return(
            <CabeenAddModalContent {...props}/>)
}

function CabeenAddModal(props){
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

    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(CabeenAddModal)
