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

function TourPackages(props){

    function _renderItem(item){
        return(
            <>
                <TouchableOpacity
                    onPress={() => Actions.tours()}
                    style={{
                    margin: 5,
                    flex: 1,
                    elevation: 5,
                    backgroundColor: 'white',
                    borderRadius: 10,

                }}>
                    <Image
                        source={{
                            uri: 'uri'
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
                        Kilimanjaro hike
                    </Text>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        margin: 10
                    }}>
                        <MaterialCommunityIcons
                            name={'cash-multiple'}
                            size={22}
                            color={props.app.colors.statusBar}
                        />
                        <Text
                            numberOfLines={1}
                            style={{
                                fontSize: 16,
                                marginLeft: 10,
                                color: props.app.colors.primaryText
                            }}>
                            {100000} KES
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
                    data={[1,2,3,4,5,6]}
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
    return(
        <>
            <View style={{
                // alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                backgroundColor: props.app.colors.background
            }}>
                <Tours
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
        showOverlay

    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Find)