import * as React from 'react'
import {
    Modal,
    View,
    Text, TouchableOpacity,
} from 'react-native'
import {bindActionCreators} from "redux";
import {addCabeen, addTenant, selectImages} from "../state/CabeenActions";
import {connect} from "react-redux";
import {ScrollView} from "react-native-gesture-handler";


function Content(props){
    return(
        <>
            <View style={{
                // alignItems: 'center',
                height: '43%',
                width: '90%',
                justifyContent: "center",
                borderRadius: 10,
                padding: 10,
                backgroundColor: props.app.colors.whiteText
            }}>
                <ScrollView>
                    <Text
                        style={{
                        fontSize: 30,
                        margin: 10,
                        marginTop: 35,
                        color: props.app.colors.statusBar,
                        // alignSelf: 'center',
                        fontWeight: 'bold'
                    }}>
                        Contact person
                    </Text>
                    <Text style={{
                        fontSize: 25,
                        margin: 10,
                        marginTop: 20,
                        fontWeight: 'bold',
                        alignSelf: 'center'
                    }}>
                        Wilson Mudaki
                    </Text>
                    <Text style={{
                        fontSize: 20,
                        margin: 10,
                        color: props.app.colors.greyText,
                        alignSelf: 'center'
                    }}>
                        0700868636
                    </Text>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: 'center',
                        // alignItems: "center",
                        marginTop: 30
                    }}>
                        <TouchableOpacity
                            onPress={props.onOK}
                            style={{
                                backgroundColor: props.app.colors.buttonColor,
                                borderRadius: 25,
                                height: 40,
                                width: '45%',
                                justifyContent: "center",
                                alignItems:"center",
                                // elevation: 10,
                            }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: "bold",
                                color: props.app.colors.whiteText
                            }}>
                                OK
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

function ContactModal(props){
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactModal)
