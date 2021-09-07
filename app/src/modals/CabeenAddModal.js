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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function CabeenImages(props){

    function _renderItem(item){
        return(
            <>
                <TouchableOpacity
                    style={{
                    margin: 5,
                    borderRadius: 5,
                }}>
                    <Image
                        style={{
                            height: 150,
                            width: 150,
                            borderRadius: 5,
                        }}
                        source={{
                            uri: item.item.image.uri
                        }}
                        />
                    <TouchableOpacity
                        onPress={() => {
                            props.selectImages('unselect', item.item)
                        }}
                        style={{
                        top: 0,
                        right: 0,
                        position: "absolute",
                        elevation: 20,
                        borderRadius: 20,
                        margin: 5,
                        paddingLeft: 2,
                        backgroundColor: props.app.colors.background,
                        alignContent: 'center',
                        justifyContent: "center"
                    }}>
                        <Ionicons
                            name={'close-circle'}
                            size={30}
                            color={props.app.colors.blackText}
                        />
                    </TouchableOpacity>
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
                    data={props.cabeen.cabeenImages}
                    renderItem={_renderItem}
                    horizontal={true}
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

function CabeenType(props){
    const types = [
        'Bedsitter',
        'Studio',
        '1 bedroom',
        '2 bedrooms',
        '3 bedrooms',
        '4+ bedrooms',

    ]

    const [selected, setSelected] = React.useState(props.cabeen.cabeenInfo.type)

    function _renderItem(item){
        return(
            <>
                <TouchableOpacity
                    onPress={() => {
                        setSelected(item.item)
                        props.addCabeen('type', item.item)
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

function CabeenImage(props){
    const [selected, setSelected] = React.useState(false)

    return(
        <>
            <TouchableOpacity
                onPress={() => {
                    props.selectImages(selected ? 'unselect' : "select", props.item.item.node)
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
            CameraRoll.getPhotos({first: 20, assetType: "Photos", include: ["filename"]})
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
            CameraRoll.getPhotos({first: 20, assetType: "Photos", include: ["filename"]})
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
            CameraRoll.getPhotos({first: 20, assetType: "Photos", after: page_info.end_cursor, include: ["filename"]})
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

    // console.log('Ima', images[0].node)

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
                        onPress={props.onImageSelectOk}
                        style={{
                            backgroundColor: props.app.colors.buttonColor,
                            borderRadius: 25,
                            height: 40,
                            elevation: 5,
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
                            elevation: 10,
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
                    // console.log('results', results)
                })
                .catch(err => {
                    setIsSearching(false)
                    setAutocompleting(false)
                    // console.log('err', err)
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
                height: '60%',
                width: '90%',
                borderRadius: 10,
            }}>
                <View style={{
                    margin: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 5,
                    paddingLeft:10,
                    paddingRight: 10,
                    elevation: 0,
                    padding: 0,
                    borderWidth: 2,
                    borderColor: props.app.colors.background,
                    backgroundColor: props.app.colors.whiteText
                }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}>

                        <TouchableOpacity onPressIn={props.onLocation}>
                            <Ionicons
                                name={'close-circle'}
                                size={30}
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

    const [features, setFeatures] = React.useState([])
    // console.log('ccc', props.cabeen.cabeenImages)

    function verifyFields(){
        if (props.cabeen.cabeenInfo.name.length < 5){
            return false
        }
        else if (props.cabeen.cabeenInfo.features.length < 5){
            return false
        }
        else if (props.cabeen.cabeenInfo.type.length < 5){
            return false
        }
        else if (props.cabeen.cabeenInfo.location.length < 5){
            return false
        }
        else if (props.cabeen.cabeenInfo.price.length < 1){
            return false
        }
        else if (props.cabeen.cabeenInfo.description.length < 5){
            return false
        }
        else if (props.cabeen.cabeenImages.length < 1){
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
                    Add Cabeen
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
                                defaultValue={props.cabeen.cabeenInfo.features}
                                onChangeText={(value) => {
                                    setFeatures(value.split(','))
                                    props.addCabeen('features', value)
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
                                placeholder={'cabeen price per night (KES)'}
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
                                placeholder={'cabeen location'}
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
                                placeholder={'cabeen description'}
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
                                props.cabeen.cabeenImages.length > 0 ?
                                    <CabeenImages {...props} />: null
                            }
                            {
                                props.cabeen.cabeenImages.length < 1 ?
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
