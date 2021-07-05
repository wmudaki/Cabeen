import * as React from 'react'
import {
    FlatList,
    TextInput,
    TouchableOpacity,
    View,
    Text,
    ActivityIndicator,
} from "react-native";
import {bindActionCreators} from "redux";
import {searchPlace, showAutocomplete, showOverlay} from "../state/MapActions";
import {connect} from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import {Actions} from "react-native-router-flux";

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
                    renderItem={_renderItem}
                    keyExtractor={(item, key) => item+key}
                    />
            </View>

        </>
    )
}

function Search(props) {

    const [isSearching, setIsSearching] = React.useState(false)
    const [autocompleting, setAutocompleting] = React.useState(false)
    const [locationData, setLocationData] = React.useState([])

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
                flex: 1
            }}>
                <View style={{
                    margin: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 5,
                    paddingLeft:10,
                    paddingRight: 10,
                    elevation: 10,
                    padding: 5,
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
                            placeholder={'search here'}
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
                        <AutoCompleteComponent
                            {...props}
                            locationData={locationData}
                        />
                        : null

                }

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
        showOverlay

    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Search)

export {AutoCompleteComponent}