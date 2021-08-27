import * as React from 'react'
import {
    View,
    Modal,
    TextInput,
    TouchableOpacity,
    Text, ActivityIndicator
} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addTenant} from "../state/CabeenActions";

function TenantAddLoading(props) {
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

function TenantAddModalSuccess(props){
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
                    Tenant added successfully

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

function TenantAddModalError(props){
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

function TenantAddModalContent(props){
    return(
        <>
            <View style={{
                height: '45%',
                width: '90%',
                justifyContent: "center",
                borderRadius: 10,
                padding: 10,
                backgroundColor: props.app.colors.whiteText
            }}>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    margin: 10
                }}>
                    Add Tenant
                </Text>
                <TextInput
                    placeholder={'Tenants name'}
                    placeholderTextColor={props.app.colors.secondaryText}
                    onChangeText={(value) => props.addTenant('userId', value)}
                    style={{
                        // borderRadius: 10,
                        borderBottomColor: props.app.colors.background,
                        borderBottomWidth: 3,
                        // backgroundColor: props.app.colors.background,
                        fontSize: 20,
                        padding:10,
                        margin: 10,
                        color: props.app.colors.primaryText
                    }}
                />
                <TextInput
                    placeholder={'House label'}
                    placeholderTextColor={props.app.colors.secondaryText}
                    onChangeText={(value) => props.addTenant('houseLabel', value)}
                    style={{
                        // borderRadius: 10,
                        borderBottomColor: props.app.colors.background,
                        borderBottomWidth: 3,
                        // backgroundColor: props.app.colors.background,
                        fontSize: 20,
                        padding:10,
                        margin: 10,
                        color: props.app.colors.primaryText
                    }}
                />
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
                        borderWidth: 2,
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
            <TenantAddModalError {...props}/>
        )

    }

    else if (props.isType === 'success'){
        return(
            <TenantAddModalSuccess {...props}/>
        )
    }
    else if (props.isType === 'loading'){
        return (
            <TenantAddLoading
                {...props}
            />
        )
    }

    else return(
        <TenantAddModalContent {...props}/>)
}


function TenantAddModal(props) {
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

export default connect(mapStateToProps, mapDispatchToProps)(TenantAddModal)
