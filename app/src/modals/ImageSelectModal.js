import * as React from 'react'
import {
    View,
    Modal,
    PermissionsAndroid
} from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import {bindActionCreators} from "redux";
import {addCabeen, addTenant} from "../state/CabeenActions";
import {connect} from "react-redux";

async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
        return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
}

async function getPhotos(){
    if (hasAndroidPermission() === 'granted'){
        CameraRoll.getPhotos()
            .then((ima) => {
                console.log("Images", ima)
            })
    }
}

function ImageSelectModalContent(props){

    return(
        <>
        </>
    )
}
function Content(props){
    return(
        <>
        </>
    )
}

function ImageSelectModal(props){
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

export default connect(mapStateToProps, mapDispatchToProps)(ImageSelectModal)
