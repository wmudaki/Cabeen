import {ActivityIndicator, Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {bindActionCreators} from "redux";
import {addCabeen, addTenant, selectImages} from "../state/CabeenActions";
import {connect} from "react-redux";
import * as React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


function ReservationSuccess(props){
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
                    Successfully reserved the tour, a representative will get in touch soon

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

function ReservationError(props){
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
                    An error occurred Please try again ...

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

function ReservationLoading(props) {
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

function ReservationDetails(props){
    return(
        <>
            <View style={{
                height: '65%',
                width: "90%",
                borderRadius: 20,
                elevation: 20,
                margin: 20,
                backgroundColor: props.app.colors.whiteText,
            }}>
                <Text style={{
                    fontSize: 25,
                    margin: 10,
                    fontWeight: "bold",
                    alignSelf: "center"
                }}>
                    Reservation Details
                </Text>

                <ScrollView style={{
                    margin: 10
                }}>
                    <View>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            color: props.app.colors.statusBar
                        }}>
                            Tour name
                        </Text>
                        <Text style={{
                            fontSize: 18,
                            margin: 20
                        }}>
                            Kilimanjaro hike
                        </Text>
                    </View>
                    <View>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            color: props.app.colors.statusBar
                        }}>
                            Number of spots
                        </Text>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: 'space-around',
                            margin: 10
                        }}>
                            <TouchableOpacity>
                                <MaterialCommunityIcons
                                    size={25}
                                    name={'minus-circle-outline'}/>

                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 18,
                                margin: 10
                            }}>
                                1
                            </Text>
                            <TouchableOpacity>
                                <MaterialCommunityIcons
                                    size={25}
                                    name={'plus-circle-outline'}/>

                            </TouchableOpacity>

                        </View>
                    </View>
                    <View>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            color: props.app.colors.statusBar
                        }}>
                            Price
                        </Text>
                        <Text style={{
                            fontSize: 18,
                            margin: 20
                        }}>
                            1200 KES
                        </Text>
                    </View>
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
                        onPress={null}
                        style={{
                            backgroundColor: props.app.colors.buttonColor,
                            borderRadius: 25,
                            elevation: 5,
                            height: 40,
                            width: '45%',
                            justifyContent: "center",
                            alignItems:"center"
                        }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: 'white'
                        }}>
                            Confirm
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

function Content(props){
    if (props.type === 'error'){
        return (
            <>
                <ReservationError {...props}/>
            </>
        )
    }
    else if (props.type === 'success'){
        return (
            <>
                <ReservationSuccess {...props}/>
            </>
        )
    }
    else if (props.type === 'loading'){
        return (
            <>
                <ReservationLoading {...props}/>
            </>
        )
    }

    return(
        <>
            <ReservationDetails {...props}/>
        </>
    )
}

function TourReservationModal(props){
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
        addCabeen,
        selectImages

    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(TourReservationModal)
