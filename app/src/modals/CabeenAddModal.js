import * as React from 'react'
import {
    View,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    VirtualizedList, FlatList, PermissionsAndroid, Image
} from "react-native";
import {bindActionCreators} from "redux";
import {addTenant, addCabeen} from "../state/CabeenActions";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import AntDesign from "react-native-vector-icons/AntDesign";
import {AutoCompleteComponent} from "../screens/Search";
import CameraRoll from "@react-native-community/cameraroll";
import Ionicons from "react-native-vector-icons/Ionicons";
import {selectImages} from "../state/CabeenActions";

function CabeenImage(props){
    const [selected, setSelected] = React.useState(false)

    return(
        <>
            <TouchableOpacity
                onPress={() => {
                    props.selectImages(selected ? 'unselect' : "select", props.item.item.node.image.uri)
                    setSelected(!selected)

                }}

                style={{
                flex: 1,
                margin: 3,
                borderWidth: selected ? 3: 0,
                borderColor: props.app.colors.buttonColor,
                borderRadius: 5
            }}>
                <Image
                    style={{
                        width: '100%',
                        height: 150,
                        borderRadius: 5,
                    }}
                    source={{
                        uri: props.item.item.node.image.uri
                    }}/>
                {
                    selected ?
                        <Ionicons
                            name={'checkmark-circle'}
                            size={30}
                            style={{
                                top: 0,
                                position: 'absolute'
                            }}
                            color={props.app.colors.buttonColor}
                        />: null
                }

            </TouchableOpacity>
        </>
    )
}

function CabeenAddModalImageSelect(props){

    const [images, setImages] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [page_info, set_page_info] = React.useState({"end_cursor": "0", "has_next_page": true})


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
        if(await hasAndroidPermission() === 'granted'){
            setIsLoading(true)
            CameraRoll.getPhotos({first: 20, assetType: "Photos",})
                .then((value) => {
                    setIsLoading(false)
                    setImages(value.edges)
                    set_page_info(value.page_info)
                })
                .catch(err => {
                    setIsLoading(false)
                })
        }

        else if (await hasAndroidPermission()){
            setIsLoading(true)
            CameraRoll.getPhotos({first: 20, assetType: "Photos",})
                .then((value) => {
                    setIsLoading(false)
                    setImages(value.edges)
                    set_page_info(value.page_info)
                })
                .catch(err => {
                    setIsLoading(false)
                })
        }
    }

    function _onEndReached(){
        if (page_info.has_next_page){
            setIsLoading(true)
            CameraRoll.getPhotos({first: 20, assetType: "Photos", after: page_info.end_cursor})
                .then((value) => {
                    setIsLoading(false)
                    let oldImages = [...images]
                    let newImages = value.edges
                    let newState = oldImages.concat(newImages)
                    setImages(newState)
                    set_page_info(value.page_info)
                })
                .catch(err => {
                    setIsLoading(false)
                })
        }
    }


    React.useEffect(() => {
        getPhotos()
            .then()
    }, [])

    React.useEffect(() => {
        props.selectImages('clear', 'clear')
    }, [])

    const _renderItem = (item) => {
        return(
            <CabeenImage
                {...props}
                item={item}
            />
        )
    }

    return(
        <>
            <View style={{
                height: '80%',
                width: "95%",
                borderRadius: 10,
                elevation: 20,
                margin: 20,
                // alignSelf: "center",
                backgroundColor: props.app.colors.whiteText,
                // alignItems: 'center',
                // justifyContent: "center"
            }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: 20
                }}>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        color: props.app.colors.statusBar
                    }}>
                        Select cabeen Images

                    </Text>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: props.app.colors.blackText

                    }}>
                        {props.cabeen.cabeenImages.length}
                    </Text>
                </View>

                {
                    images.length > 0 ?
                        <FlatList
                            data={images}
                            numColumns={2}
                            renderItem={_renderItem}
                            keyExtractor={(item, key) => item + key}
                            onEndReached={() => _onEndReached()}
                        />: null
                }
                <View style={{
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: 20,
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}>
                    <TouchableOpacity
                        onPress={props.onImageSelectCancel}
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
                        onPress={props.onImageSelectOk}
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
                            OK
                        </Text>
                    </TouchableOpacity>
                </View>
                {
                    isLoading?
                        <View style={{
                            position: 'absolute',
                            top: 80,
                            alignSelf: "center",
                            borderRadius: 50,
                            padding: 10,
                            elevation: 30,
                            backgroundColor: props.app.colors.whiteText
                        }}>
                            <ActivityIndicator
                                color={props.app.colors.buttonColor}
                                size={"small"}
                            />

                        </View>: null
                }



            </View>

        </>
    )
}

function CabeenAddModalLoading(props) {
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

function CabeenAddModalLocation(props){
    const [isSearching, setIsSearching] = React.useState(false)
    const [autocompleting, setAutocompleting] = React.useState(false)
    const [locationData, setLocationData] = React.useState([])

    const autocomplete  = async (input) => {
        setAutocompleting(false)
        setIsSearching(false)
        let uri = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${props.app.googleMapKey}&input=${input}`
        if (input.length > 0){
            await fetch(uri)
                .then((resp) => resp.json())
                .then(results => {
                    setIsSearching(false)
                    setAutocompleting(true)
                    setLocationData(results.predictions)
                    console.log('results', results)
                })
                .catch(err => {
                    setIsSearching(false)
                    setAutocompleting(false)
                    console.log('err', err)
                })
        }
        else if (input.length > 0){
            setIsSearching(true)
        }
    }

    return(
        <>
            <View style={{
                backgroundColor: props.app.colors.whiteText,
                height: '50%',
                width: '90%',
                borderRadius: 10,
            }}>
                <View style={{
                    margin: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 30,
                    paddingLeft:10,
                    paddingRight: 10,
                    elevation: 10,
                    padding: 0,
                    backgroundColor: props.app.colors.whiteText
                }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}>

                        <TouchableOpacity onPressIn={props.onLocation}>
                            <AntDesign
                                name={'close'}
                                size={25}
                                color={props.app.colors.statusBar}
                            />
                        </TouchableOpacity>
                        <TextInput
                            placeholder={'enter location'}
                            placeholderTextColor={props.app.colors.secondaryText}
                            autoFocus={true}
                            onChangeText={(value) => autocomplete(value)}
                            selectionColor={props.app.colors.StatusBar}
                            style={{
                                fontSize: 20,
                                marginLeft: 10,
                                color: props.app.colors.primaryText,
                                maxWidth: '80%'
                            }}
                        />
                    </View>
                    {
                        isSearching ?
                            <ActivityIndicator
                                color={props.app.colors.statusBar}
                            />
                            : null
                    }


                </View>
                {
                    autocompleting ?
                        <FlatList
                            data={[1]}
                            keyExtractor={(item, key) => item+key}
                            renderItem={() => {
                                return (
                                    <AutoCompleteComponent
                                        {...props}
                                        locationData={locationData}
                                        locationIcon={true}
                                        onPress={(val) => {
                                            props.addCabeen('location', val.item.description)
                                            props.onLocation()
                                        }}
                                    />
                                )
                            }}
                        />:
                        null
                }



            </View>

        </>
    )
}

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
                    Add Cabeen
                </Text>
                <ScrollView>

                    <Text style={{
                        fontSize: 18,
                        margin: 20,
                        marginBottom: 10,
                    }}>
                        Name
                    </Text>
                    <TextInput
                        placeholder={'cabeen name'}
                        placeholderTextColor={props.app.colors.secondaryText}
                        onChangeText={(value) => props.addCabeen('name', value)}
                        style={{
                            borderRadius: 5,
                            borderBottomColor: props.app.colors.background,
                            marginTop: 0,
                            backgroundColor: props.app.colors.background,
                            fontSize: 20,
                            padding:10,
                            marginLeft: 20,
                            marginRight: 20,
                            color: props.app.colors.primaryText
                        }}
                    />
                    <Text style={{
                        fontSize: 18,
                        margin: 20,
                        marginBottom: 10,
                    }}>
                        Price
                    </Text>
                    <TextInput
                        placeholder={'price'}
                        placeholderTextColor={props.app.colors.secondaryText}
                        onChangeText={(value) => props.addCabeen('price', value)}
                        style={{
                            borderRadius: 5,
                            borderBottomColor: props.app.colors.background,
                            backgroundColor: props.app.colors.background,
                            fontSize: 20,
                            padding:10,
                            marginLeft: 20,
                            marginRight: 20,
                            color: props.app.colors.primaryText
                        }}
                    />
                    <Text style={{
                        fontSize: 18,
                        margin: 20,
                        marginBottom: 10,
                    }}>
                        Location
                    </Text>
                    <TextInput
                        placeholder={'Location'}
                        placeholderTextColor={props.app.colors.secondaryText}
                        onKeyPress={props.onLocation}
                        defaultValue={props.cabeen.cabeenInfo.location}
                        selectTextOnFocus
                        // onChangeText={(value) => props.addTenant('houseLabel', value)}
                        style={{
                            borderRadius: 5,
                            borderBottomColor: props.app.colors.background,
                            backgroundColor: props.app.colors.background,
                            fontSize: 20,
                            padding:10,
                            marginLeft: 20,
                            marginRight: 20,
                            color: props.app.colors.primaryText
                        }}
                    />
                    <Text style={{
                        fontSize: 18,
                        margin: 20,
                        marginBottom: 10,
                    }}>
                        Description
                    </Text>
                    <TextInput
                        placeholder={'description'}
                        placeholderTextColor={props.app.colors.secondaryText}
                        multiline
                        onChangeText={(value) => props.addCabeen('description', value)}
                        style={{
                            borderRadius: 5,
                            borderBottomColor: props.app.colors.background,
                            backgroundColor: props.app.colors.background,
                            fontSize: 20,
                            maxHeight: 150,
                            padding:10,
                            margin: 20,
                            color: props.app.colors.primaryText
                        }}
                    />
                    <TouchableOpacity
                        onPress={props.onImageSelect}
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

    else if (props.isType === 'location'){
        return (
            <CabeenAddModalLocation
                {...props}
            />
        )
    }

    else if (props.isType === "loading"){
        return (
            <CabeenAddModalLoading
                {...props}
            />
        )
    }

    else if (props.isType === 'imageSelect'){
        return (
            <CabeenAddModalImageSelect
                {...props}
            />
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
        addCabeen,
        selectImages

    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(CabeenAddModal)
