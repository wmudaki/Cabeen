import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {FlatList, Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import * as React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {addTour} from "../state/TourActions";

function TourPackageAddModalContent(props){

    function verifyFields(){
        if (props.tour.tourAdd.name.length < 5){
            return false
        }
        else if (props.tour.tourAdd.location.length < 5){
            return false
        }
        else if (props.tour.tourAdd.price.length < 1){
            return false
        }
        else if (props.tour.tourAdd.description.length < 5){
            return false
        }
        else if (props.tour.tourAdd.images.length < 1){
            return false
        }

        return true
    }

    return(
        <>
            <View style={{
                height: '80%',
                width: '95%',
                justifyContent: "center",
                borderRadius: 20,
                padding: 10,
                backgroundColor: props.app.colors.whiteText
            }}>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 25,
                    margin: 10,
                    color: props.app.colors.statusBar
                }}>
                    Add Tour Package
                </Text>

                <FlatList
                    data={[1]}
                    renderItem={() => (
                        <View>
                            <Text style={{
                                fontSize: 18,
                                margin: 10,
                                marginBottom: 10,
                                fontWeight: "bold",
                                color: props.app.colors.statusBar
                            }}>
                                Name
                            </Text>
                            <TextInput
                                placeholder={'Tour name'}
                                placeholderTextColor={props.app.colors.secondaryText}
                                defaultValue={props.cabeen.cabeenInfo.name}
                                onChangeText={(value) => props.addCabeen('name', value)}
                                style={{
                                    borderRadius: 20,
                                    borderColor: props.app.colors.background,
                                    marginTop: 0,
                                    // backgroundColor: props.app.colors.background,
                                    fontSize: 20,
                                    padding:10,
                                    marginLeft: 20,
                                    marginRight: 20,
                                    marginBottom: 10,
                                    borderWidth: 2,
                                    color: props.app.colors.primaryText
                                }}
                            />

                            <Text style={{
                                fontSize: 18,
                                margin: 10,
                                marginBottom: 10,
                                fontWeight: "bold",
                                color: props.app.colors.statusBar
                            }}>
                                Price
                            </Text>
                            <TextInput
                                placeholder={'Tour price (KES)'}
                                placeholderTextColor={props.app.colors.secondaryText}
                                keyboardType={"numeric"}
                                defaultValue={props.cabeen.cabeenInfo.price}
                                onChangeText={(value) => props.addCabeen('price', value)}
                                style={{
                                    borderRadius: 20,
                                    borderColor: props.app.colors.background,
                                    borderWidth: 2,
                                    // backgroundColor: props.app.colors.background,
                                    fontSize: 20,
                                    padding:10,
                                    marginLeft: 20,
                                    marginRight: 20,
                                    marginBottom: 10,
                                    color: props.app.colors.primaryText
                                }}
                            />
                            <Text style={{
                                fontSize: 18,
                                margin: 10,
                                marginBottom: 10,
                                fontWeight: "bold",
                                color: props.app.colors.statusBar
                            }}>
                                Location
                            </Text>
                            <TextInput
                                placeholder={'Tour location'}
                                placeholderTextColor={props.app.colors.secondaryText}
                                onKeyPress={props.onLocation}
                                defaultValue={props.cabeen.cabeenInfo.location}
                                selectTextOnFocus
                                // onChangeText={(value) => props.addTenant('houseLabel', value)}
                                style={{
                                    borderRadius: 20,
                                    borderColor: props.app.colors.background,
                                    // backgroundColor: props.app.colors.background,
                                    fontSize: 20,
                                    borderWidth: 2,
                                    padding:10,
                                    marginLeft: 20,
                                    marginRight: 20,
                                    marginBottom: 10,
                                    color: props.app.colors.primaryText
                                }}
                            />
                            <Text style={{
                                fontSize: 18,
                                margin: 10,
                                marginBottom: 10,
                                fontWeight: "bold",
                                color: props.app.colors.statusBar
                            }}>
                                Description
                            </Text>
                            <TextInput
                                placeholder={'Tour description'}
                                placeholderTextColor={props.app.colors.secondaryText}
                                multiline
                                defaultValue={props.cabeen.cabeenInfo.description}
                                onChangeText={(value) => props.addCabeen('description', value)}
                                style={{
                                    borderRadius: 20,
                                    borderColor: props.app.colors.background,
                                    borderWidth: 2,
                                    // backgroundColor: props.app.colors.background,
                                    fontSize: 20,
                                    maxHeight: 150,
                                    padding:10,
                                    marginLeft: 20,
                                    marginRight: 20,
                                    marginBottom: 20,
                                    color: props.app.colors.primaryText
                                }}
                            />
                            {
                                props.tour.tourAdd.images.length > 0 ?
                                    <CabeenImages {...props} />: null
                            }
                            {
                                props.tour.tourAdd.images.length < 1 ?
                                    <TouchableOpacity
                                        onPress={props.onImageSelect}
                                        style={{
                                            borderRadius: 30,
                                            height: 45,
                                            margin: 20,
                                            width: '50%',
                                            justifyContent: "center",
                                            alignItems:"center",
                                            alignSelf: "center",
                                            flexDirection: "row",
                                            elevation: 5,
                                            // borderWidth: 2,
                                            backgroundColor: props.app.colors.background,
                                            // borderColor: props.app.colors.blackText,
                                        }}>
                                        <MaterialCommunityIcons
                                            name={'camera-plus-outline'}
                                            size={23}
                                            color={props.app.colors.statusBar}
                                            style={{
                                                marginRight: 10,
                                            }}
                                        />
                                        <Text style={{
                                            fontSize: 18,
                                            color: props.app.colors.statusBar

                                        }}>
                                            Add Images
                                        </Text>
                                    </TouchableOpacity> : null

                            }

                        </View>
                    )}
                    keyExtractor={(key, item) => key + item}
                />

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
                        onPress={verifyFields() ? props.onSubmit: null}
                        style={{
                            backgroundColor: verifyFields() ? props.app.colors.buttonColor: 'grey',
                            borderRadius: 25,
                            elevation: 5,
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
    return(
        <>
            <TourPackageAddModalContent {...props}/>
        </>
    )
}

function TourPackageAddModal(props){
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
    const {app, cabeen, tour} = state;
    return {app, cabeen, tour}
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addTour

    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(TourPackageAddModal)
