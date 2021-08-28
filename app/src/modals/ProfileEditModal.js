import * as React from "react";
import {
    View,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView, ActivityIndicator
} from "react-native";
import {bindActionCreators} from "redux";
import {addTenant} from "../state/CabeenActions";
import {connect} from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import {editProfile} from "../state/AppActions";


function ProfileEditModalSuccess(props){
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
                    Profile edited successfully

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
                            borderRadius: 25,
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

function ProfileEditModalError(props){
    return(
        <>
            <View style={{
                height: '34%',
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
                            borderRadius: 25,
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

function ProfileEditModalContent(props){
    return(
        <>
            <View style={{
                height: '70%',
                width: '90%',
                justifyContent: "center",
                borderRadius: 10,
                padding: 10,
                backgroundColor: props.app.colors.whiteText
            }}>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 25,
                    margin: 10,
                    marginBottom: 20,
                    color: props.app.colors.statusBar
                }}>
                    Edit profile
                </Text>
                <ScrollView>
                    {/*<TouchableOpacity>*/}
                    {/*    <Image*/}
                    {/*        style={{*/}
                    {/*            height: 150,*/}
                    {/*            width:150,*/}
                    {/*            borderRadius: 100,*/}
                    {/*            backgroundColor: props.app.colors.background,*/}
                    {/*            alignSelf: "center"*/}
                    {/*        }}*/}
                    {/*        source={{*/}
                    {/*        uri: 'path'*/}
                    {/*    }}/>*/}
                    {/*    <Ionicons*/}
                    {/*        name={'camera'}*/}
                    {/*        size={25}*/}
                    {/*        style={{*/}
                    {/*            top: -85,*/}
                    {/*            alignSelf: 'center'*/}
                    {/*        }}*/}
                    {/*        color={props.app.colors.whiteText}*/}
                    {/*    />*/}
                    {/*</TouchableOpacity>*/}
                    <TextInput
                        placeholder={'Name'}
                        placeholderTextColor={props.app.colors.secondaryText}
                        defaultValue={props.app.editProfile.fullName}
                        onChangeText={(value) => props.editProfile('name', value)}
                        style={{
                            borderRadius: 10,
                            borderBottomColor: props.app.colors.background,
                            // borderBottomWidth: 3,
                            borderColor: props.app.colors.background,
                            // backgroundColor: props.app.colors.background,
                            fontSize: 20,
                            borderWidth: 2,
                            padding:10,
                            margin: 10,
                            color: props.app.colors.primaryText
                        }}
                    />
                    <TextInput
                        placeholder={'Email'}
                        placeholderTextColor={props.app.colors.secondaryText}
                        defaultValue={props.app.editProfile.email}
                        onChangeText={(value) => props.editProfile('email', value)}
                        style={{
                            borderRadius: 10,
                            borderBottomColor: props.app.colors.background,
                            borderBottomWidth: 2,
                            borderWidth: 2,
                            borderColor: props.app.colors.background,
                            // backgroundColor: props.app.colors.background,
                            fontSize: 20,
                            padding:10,
                            margin: 10,
                            color: props.app.colors.primaryText
                        }}
                    />
                    <TextInput
                        placeholder={'Phone'}
                        placeholderTextColor={props.app.colors.secondaryText}
                        keyboardType={"numeric"}
                        defaultValue={props.app.editProfile.phone}
                        onChangeText={(value) => props.editProfile('phone', value)}
                        style={{
                            borderRadius: 10,
                            borderBottomColor: props.app.colors.background,
                            borderBottomWidth: 2,
                            borderWidth: 2,
                            borderColor: props.app.colors.background,
                            // backgroundColor: props.app.colors.background,
                            fontSize: 20,
                            padding:10,
                            margin: 10,
                            color: props.app.colors.primaryText
                        }}
                    />
                </ScrollView>
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
                            borderRadius: 25,
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
                            borderRadius: 25,
                            height: 40,
                            width: '45%',
                            justifyContent: "center",
                            alignItems:"center"
                        }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: props.app.colors.whiteText,
                        }}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
function ProfileEditLoading(props) {
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

function Content(props){
    if (props.isType === 'error'){
        return (
            <ProfileEditModalError
                {...props}
            />
        )
    }
    else if (props.isType === 'loading'){
        return (
            <ProfileEditLoading {...props}/>
        )
    }
    else if (props.isType === 'success'){
        return (
            <ProfileEditModalSuccess
                {...props}
            />
        )
    }

    else {
        return(
            <ProfileEditModalContent
                {...props}
            />
        )
    }

}

function ProfileEditModal(props){
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
        editProfile

    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditModal)
