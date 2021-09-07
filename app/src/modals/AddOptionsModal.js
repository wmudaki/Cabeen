import {bindActionCreators} from "redux";
import {addCabeen, addTenant, selectImages} from "../state/CabeenActions";
import {connect} from "react-redux";
import {Modal, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {ScrollView} from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

function ActionButtons(props){
    return(
        <>
            <View style={{
                backgroundColor: 'white',
                height: '100%',
                width: '100%',
                padding: 20,
                paddingTop: 50,
                borderRadius: 20,
                // elevation: 20
            }}>
                <TouchableOpacity
                    style={{
                        // backgroundColor: 'red',
                        padding: 10,
                        position: "absolute",

                    }}
                    onPress={props.onClose}>
                    <Ionicons
                        name={'close-circle'}
                        size={40}
                        color={'red'}

                    />

                </TouchableOpacity>
                <TouchableOpacity
                    onPress={props.onAddCabeen}
                    style={{
                    backgroundColor: props.app.colors.statusBar,
                    elevation: 5,
                    borderRadius: 30,
                    padding: 10,
                    margin: 10,
                    height: 50,
                    width: '60%',
                    alignSelf: 'center',
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 20
                }}>
                    <Text style={{
                        fontSize: 17,
                        color: 'white',
                        fontWeight: "bold"

                    }}>
                        Add Cabeen
                    </Text>

                </TouchableOpacity>
                <TouchableOpacity
                    onPress={props.onAddTourPackage}
                    style={{
                    borderRadius: 25,
                    backgroundColor: props.app.colors.buttonColor,
                    margin: 10,
                    marginTop: 25,
                    padding: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    elevation: 5,
                    height: 50,
                    // width: '60%',
                    alignSelf: 'center',
                    alignItems: "center",
                    justifyContent: "center",

                }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: "bold",
                        color: 'white'
                    }}>
                        Add Tour Package
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

function Content(props){
    return(
        <>
            <View style={{
                // alignItems: 'center',
                height: '45%',
                width: '93%',
                justifyContent: "center",
                borderRadius: 20,
                padding: 10,
                elevation: 10,
                backgroundColor: props.app.colors.whiteText
            }}>
                <ScrollView>
                    <ActionButtons {...props}/>
                </ScrollView>
            </View>
        </>
    )
}

function AddOptionsModal(props){
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

export default connect(mapStateToProps, mapDispatchToProps)(AddOptionsModal)
