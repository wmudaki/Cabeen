import * as React from "react";
import {
    View,
    Text, FlatList, Image, TouchableOpacity
} from 'react-native'
import {bindActionCreators} from "redux";
import {searchPlace, showAutocomplete, showOverlay} from "../state/MapActions";
import {connect} from "react-redux";
import {FloatingSearchBar} from "../components/SearchBars";
import {Actions} from "react-native-router-flux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {gql, useMutation} from "@apollo/client";
import {getTourDetails} from "../state/TourActions";

function TourPackages(props){

    function _renderItem(item){
        return(
            <>
                <TouchableOpacity
                    onPress={() => {
                        props.getTourDetails(item.item)
                        Actions.tours()
                    }}
                    style={{
                    margin: 5,
                    flex: 1,
                    elevation: 5,
                    backgroundColor: 'white',
                    borderRadius: 10,

                }}>
                    <Image
                        source={{
                            uri: `${props.app.urls.tours}${item.item.images[0]}`
                        }}
                        style={{
                            height: 150,
                            width: '100%',
                            borderRadius: 10,
                            backgroundColor: props.app.colors.background
                        }}
                        />
                    <Text
                        numberOfLines={2}
                        style={{
                        margin: 10,
                        fontSize: 18
                    }}>
                        {item.item.name}
                    </Text>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        margin: 10
                    }}>
                        <MaterialCommunityIcons
                            name={'cash-multiple'}
                            size={20}
                            color={props.app.colors.statusBar}
                        />
                        <Text
                            numberOfLines={1}
                            style={{
                                fontSize: 15,
                                marginLeft: 10,
                                color: props.app.colors.primaryText
                            }}>
                            {item.item.price} KES
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
                    data={props.tourResults}
                    renderItem={_renderItem}
                    numColumns={2}
                    ListHeaderComponent={() => (
                        <>
                            <View style={{marginTop: 100, margin: 20}}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 22,
                                    color: props.app.colors.statusBar
                                }}>
                                    Tour Packages
                                </Text>
                            </View>
                        </>
                    )}
                    ListFooterComponent={() => (
                        <>
                            <View style={{margin: 50}}/>
                        </>
                    )}
                    keyExtractor={(key, item) => item+key}
                    />
            </View>
        </>
    )
}

function Tours(props){
    return(
        <>
            <View>
                <TourPackages {...props}/>
            </View>
        </>
    )
}

function Find(props){
    const GET_TOURS = gql`
        mutation GET_TOURS(
            $admin: String
        ){
            fetchTours(
                admin: $admin
            ){
                _id,
                name,
                tourDate,
                description,
                price,
                location,
                images,
                admin
            }
        }
    `

    const [getTours] = useMutation(GET_TOURS)
    const [isFetchingTours, setIsFetchingTours] = React.useState(false)
    const [tourResults, setTourResults] = React.useState([])
    const [hasTourResults, setHasTourResults] = React.useState(false)

    function fetchTours(){
        setIsFetchingTours(true)
        getTours({variables: {
                admin: props.app.currentUser.user._id
            }})
            .then((res) => {
                setIsFetchingTours(false)
                setTourResults(res.data.fetchTours)
                setHasTourResults(res.data.fetchTours.length > 0)
                // console.log('res', res.data.fetchTours)
            })
            .catch(error => {
                setIsFetchingTours(false)
                // console.log('err', error)
            })
    }

    React.useEffect(() => {
        fetchTours()
    }, [])

    return(
        <>
            <View style={{
                // alignItems: 'center',
                // justifyContent: 'center',
                flex: 1,
                backgroundColor: props.app.colors.background
            }}>
                <Tours
                    tourResults={tourResults}
                    {...props}
                />
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0
                }}>
                    <FloatingSearchBar
                        leftIcon={'person-circle-outline'}
                        rightIcon={'search'}
                        placeholder={'search cabeen'}
                        feather={true}
                        onFocus={() =>Actions.search()}
                        onRightIconPress={() => Actions.search()}
                        leftIconPress={() => Actions.account()}
                    />
                </View>
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
        getTourDetails

    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Find)