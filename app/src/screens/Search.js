import * as React from 'react'
import {
    FlatList,
    TextInput,
    TouchableOpacity,
    View,
    Text,
    ActivityIndicator, Image,
} from "react-native";
import {bindActionCreators} from "redux";
import {searchPlace, showAutocomplete, showOverlay} from "../state/MapActions";
import {connect} from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import {Actions} from "react-native-router-flux";
import {gql, useMutation} from "@apollo/client";
import {getCabeenDetails} from "../state/CabeenActions";

function AutoCompleteComponent(props){
    const _renderItem = (item) => {
        return(
            <>
                <TouchableOpacity
                    onPress={() => props.onPress(item)}
                    style={{
                    flexDirection: "row",
                    alignItems: 'center'
                }}>
                    <Ionicons
                        name={props.locationIcon ? "location":'search'}
                        size={20}
                        color={props.app.colors.primaryText}
                    />
                    <Text
                        numberOfLines={2}
                        style={{
                        fontSize: 18,
                        margin: 10,
                        color: props.app.colors.primaryText
                    }}>
                        {item.item.description}
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
                    data={props.locationData}
                    listKey={'autocomplete'}
                    renderItem={_renderItem}
                    keyExtractor={(item, key) => item+key}
                    />
            </View>

        </>
    )
}

function CabeenSearch(props){

    function _renderItem(item){
        return(
            <>
                <TouchableOpacity
                    onPress={() => {
                        props.getCabeenDetails(item.item)
                        Actions.cabeen()
                    }}
                    style={{
                    flexDirection: "row",
                    alignItems: 'center',
                    margin: 10
                }}>
                    <Image
                        source={{
                            uri: `${props.app.urls.cabeenImages}${item.item.images[0]}`
                        }}
                        style={{
                            height: 50,
                            width: 50,
                            borderRadius: 5
                        }}
                    />
                    <View style={{
                        flex: 1
                    }}>
                        <Text
                            numberOfLines={1}
                            style={{
                                fontSize: 20,
                                marginLeft: 10,
                                fontWeight: "bold",
                                color: props.app.colors.primaryText
                            }}>
                            {item.item.name}
                        </Text>
                        <Text
                            numberOfLines={1}
                            style={{
                                fontSize: 16,
                                marginLeft: 10,
                                // fontWeight: "bold",
                                color: props.app.colors.primaryText
                            }}>
                            {item.item.location}
                        </Text>
                    </View>

                </TouchableOpacity>
            </>
        )
    }

    return(
        <>
            <View>
                <FlatList
                    data={props.cabeenSearchResults}
                    listKey={'cabeenSearch'}
                    renderItem={_renderItem}
                    keyExtractor={(item, key) => item + key}
                />
            </View>
        </>
    )
}

function Search(props) {

    const SEARCH_CABEENS = gql`
        mutation SEARCH_CABEENS(
            $query: String
        ){
            searchCabeen(
                query: $query
            ){
                _id,
                name,
                price,
                location,
                features,
                type,
                description,
                admin,
                likes,
                images
            }
        }
    `

    const [searchCabeen] = useMutation(SEARCH_CABEENS)
    const [cabeenSearchResults, setCabeenSearchResults] = React.useState([])
    const [isCabeenSearching, setIsCabeenSearching] = React.useState(false)
    const [isSearching, setIsSearching] = React.useState(false)
    const [autocompleting, setAutocompleting] = React.useState(false)
    const [locationData, setLocationData] = React.useState([])
    const [inputValue, setInputValue] = React.useState('')

    const cabeenSearch = async (input) => {
        setIsCabeenSearching(true)
        searchCabeen({variables: {
            query: input
            }})
            .then((res) => {
                setCabeenSearchResults(res.data.searchCabeen)
                // console.log('Search complete', res.data.searchCabeen)
                setIsCabeenSearching(false)
            })
            .catch((error) => {
                // console.log('An error occurred while searching', error)
                setIsCabeenSearching(false)
            })
    }

    const autocomplete  = async (input) => {
        setAutocompleting(false)
        setIsSearching(false)
        let uri = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${props.app.googleMapKey}&input=${input}`
        if (input.length > 3){
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

    let locationTextInput = React.useRef(null)

    function getSelectedLocation(loc){
        // console.log(' REf Location', loc.item.description)
        setInputValue(loc.item.description)
        autocomplete(loc.item.description)
        cabeenSearch(loc.item.description)
        // locationTextInput.current.clear()

        // locationTextInput.current.Value = loc.item.description
    }

    return(
        <>
            <View style={{
                flex: 1,
                backgroundColor: props.app.colors.background
            }}>
                <FlatList
                    data={[1]}
                    extraData={locationTextInput}
                    listKey={'main'}
                    keyExtractor={(item, key) => item + key}
                    renderItem={() => (
                        <>
                            <View style={{
                                margin: 10,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                borderRadius: 10,
                                paddingLeft:10,
                                paddingRight: 10,
                                elevation: 10,
                                padding: 5,
                                height: 55,
                                backgroundColor: props.app.colors.whiteText
                            }}>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}>

                                    <TouchableOpacity onPressIn={() => Actions.pop()}>
                                        <AntDesign
                                            name={'arrowleft'}
                                            size={28}
                                            color={props.app.colors.statusBar}
                                        />
                                    </TouchableOpacity>
                                    <TextInput
                                        ref={locationTextInput}
                                        placeholder={'search here'}
                                        placeholderTextColor={props.app.colors.secondaryText}
                                        autoFocus={true}
                                        value={inputValue}
                                        onChangeText={(value) => {
                                            setInputValue(value)
                                            autocomplete(value)
                                            cabeenSearch(value)
                                        }}
                                        selectionColor={props.app.colors.StatusBar}
                                        style={{
                                            fontSize: 20,
                                            marginLeft: 10,
                                            color: props.app.colors.primaryText,
                                            maxWidth: '80%',
                                            height: 45
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
                                    <CabeenSearch
                                        {...props}
                                        cabeenSearchResults={cabeenSearchResults}
                                    />: null
                            }
                            {
                                autocompleting ?
                                    <AutoCompleteComponent
                                        {...props}
                                        onPress={(item) => getSelectedLocation(item)}
                                        locationData={locationData}
                                    />
                                    : null

                            }

                        </>
                    )}
                />


            </View>
        </>
    )
}


const mapStateToProps = state => {
    const {app,map} = state;
    // console.log('state',map)
    return {app, map}
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        searchPlace,
        showAutocomplete,
        showOverlay,
        getCabeenDetails

    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Search)

export {AutoCompleteComponent}