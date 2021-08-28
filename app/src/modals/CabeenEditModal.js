import * as React from 'react'
import {
    View,
    ActivityIndicator,
    Modal, Text, ScrollView, TextInput, TouchableOpacity, FlatList
} from "react-native";
import {bindActionCreators} from "redux";
import {addCabeen, addTenant, cabeenEdit} from "../state/CabeenActions";
import {connect} from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

function CabeenType(props){
    const types = [
        'Bedsitter',
        'Studio',
        '1 bedroom',
        '2 bedrooms',
        '3 bedrooms',
        '4+ bedrooms',

    ]

    const [selected, setSelected] = React.useState(props.cabeen.cabeenEditInfo.type)

    function _renderItem(item){
        return(
            <>
                <TouchableOpacity
                    onPress={() => {
                        setSelected(item.item)
                        props.cabeenEdit('type', item.item)
                    }}
                    style={{
                        borderWidth: selected === item.item ? 0: 1,
                        elevation: selected === item.item ? 10: 0,
                        flex: 1,
                        padding: 3,
                        margin : 5,
                        borderRadius: 10,
                        backgroundColor: selected === item.item ? props.app.colors.buttonColor: null,
                        borderColor: props.app.colors.background,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    <Text style={{

                        fontSize: 16
                    }}>
                        {item.item}
                    </Text>
                </TouchableOpacity>
            </>
        )
    }

    return(
        <>
            <View style={{
                margin: 10
            }}>
                <FlatList
                    data={types}
                    renderItem={_renderItem}
                    numColumns={3}
                    keyExtractor={(item, key) => item + key}
                />
            </View>
        </>
    )
}
function CabeenFeatures(props){

    function _renderItem(item){
        return(
            <>
                <TouchableOpacity
                    // onPress={() => {
                    //     // setSelected(item.item)
                    // }}
                    style={{

                        flex: 1,
                        padding: 5,
                        elevation: 10,
                        margin : 5,
                        borderRadius: 10,
                        backgroundColor: props.app.colors.whiteText,
                        borderColor: props.app.colors.background,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    <Text style={{

                        fontSize: 19,
                        // fontWeight: "bold"
                    }}>
                        {item.item}
                    </Text>
                </TouchableOpacity>
            </>
        )
    }

    return(
        <>
            <View style={{
                margin: 10
            }}>
                <FlatList
                    listKey={'features'}
                    data={props.features}
                    renderItem={_renderItem}
                    numColumns={2}
                    keyExtractor={(item, key) => item + key}
                />

            </View>
        </>
    )
}

function CabeenEditLoading(props) {
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
function CabeenEditModalSuccess(props){
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
                    Cabeen edited successfully

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
                            elevation: 5,
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

function CabeenEditModalError(props){
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
                            borderRadius: 25,
                            height: 40,
                            width: '45%',
                            justifyContent: "center",
                            alignItems:"center",
                            elevation: 5,
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

function CabeenEditModalContent(props){
    const [features, setFeatures] = React.useState([])

    return(
        <>
            <View style={{
                height: '80%',
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
                    Edit Cabeen
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
                                placeholder={'cabeen name'}
                                placeholderTextColor={props.app.colors.secondaryText}
                                defaultValue={props.cabeen.cabeenEditInfo.name}
                                onChangeText={(value) => props.cabeenEdit('name', value)}
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
                                Type
                            </Text>
                            <CabeenType {...props}/>
                            <Text style={{
                                fontSize: 18,
                                margin: 10,
                                marginBottom: 10,
                                fontWeight: "bold",
                                color: props.app.colors.statusBar
                            }}>
                                Features
                            </Text>
                            {
                                features.length > 1 ?
                                    <CabeenFeatures
                                        {...props}
                                        features={features}
                                    />: null
                            }
                            <TextInput
                                placeholder={'Enter features separated by a coma e.g. Wifi,balcony,swimming pool'}
                                placeholderTextColor={props.app.colors.secondaryText}
                                multiline
                                defaultValue={props.cabeen.cabeenEditInfo.features}
                                onChangeText={(value) => {
                                    props.cabeenEdit('features', value)
                                    setFeatures(value.split(','))

                                }}
                                style={{
                                    borderRadius: 20,
                                    borderColor: props.app.colors.background,
                                    borderWidth: 2,
                                    // backgroundColor: props.app.colors.background,
                                    fontSize: 17,
                                    maxHeight: 160,
                                    padding:10,
                                    marginLeft: 20,
                                    marginRight: 20,
                                    marginBottom: 20,
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
                                placeholder={'cabeen price'}
                                placeholderTextColor={props.app.colors.secondaryText}
                                keyboardType={"numeric"}
                                defaultValue={props.cabeen.cabeenEditInfo.price}
                                onChangeText={(value) => props.cabeenEdit('price', value)}
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
                                placeholder={'cabeen location'}
                                placeholderTextColor={props.app.colors.secondaryText}
                                onKeyPress={props.onLocation}
                                defaultValue={props.cabeen.cabeenEditInfo.location}
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
                                placeholder={'cabeen description'}
                                placeholderTextColor={props.app.colors.secondaryText}
                                multiline
                                defaultValue={props.cabeen.cabeenEditInfo.description}
                                onChangeText={(value) => props.cabeenEdit('description', value)}
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
                                props.cabeen.cabeenImages.length > 0 ?
                                    <CabeenImages {...props} />: null
                            }
                            {/*{*/}
                            {/*    props.cabeen.cabeenImages.length < 1 ?*/}
                            {/*        <TouchableOpacity*/}
                            {/*            onPress={props.onImageSelect}*/}
                            {/*            style={{*/}
                            {/*                borderRadius: 20,*/}
                            {/*                height: 45,*/}
                            {/*                margin: 20,*/}
                            {/*                width: '50%',*/}
                            {/*                justifyContent: "center",*/}
                            {/*                alignItems:"center",*/}
                            {/*                alignSelf: "center",*/}
                            {/*                flexDirection: "row",*/}
                            {/*                // elevation: 10,*/}
                            {/*                borderWidth: 1,*/}
                            {/*                // backgroundColor: props.app.colors.background,*/}
                            {/*                borderColor: props.app.colors.background,*/}
                            {/*            }}>*/}
                            {/*            <Ionicons*/}
                            {/*                name={'images-outline'}*/}
                            {/*                size={23}*/}
                            {/*                color={props.app.colors.statusBar}*/}
                            {/*                style={{*/}
                            {/*                    marginRight: 10,*/}
                            {/*                }}*/}
                            {/*            />*/}
                            {/*            <Text style={{*/}
                            {/*                fontSize: 18,*/}
                            {/*                color: props.app.colors.statusBar*/}

                            {/*            }}>*/}
                            {/*                Add Images*/}
                            {/*            </Text>*/}
                            {/*        </TouchableOpacity> : null*/}

                            {/*}*/}

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
                        onPress={props.onSubmit}
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
        return(
            <CabeenEditModalError
                {...props}
            />
        )
    }
    else if (props.isType === 'successful'){
        return (
            <CabeenEditModalSuccess
                {...props}
            />
        )
    }
    else if (props.isType === 'loading'){
        return (
            <CabeenEditLoading
                {...props}
            />
        )
    }
    else {
        return (
            <CabeenEditModalContent
                {...props}
            />
        )
    }
}

function CabeenEditModal(props){
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
        cabeenEdit

    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(CabeenEditModal)
