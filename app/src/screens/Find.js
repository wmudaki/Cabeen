import * as React from "react";
import {
    View,
    Text
} from 'react-native'
import {bindActionCreators} from "redux";
import {searchPlace, showAutocomplete, showOverlay} from "../state/MapActions";
import {connect} from "react-redux";
import {FloatingSearchBar} from "../components/SearchBars";
import {Actions} from "react-native-router-flux";

function Find(props){
    return(
        <>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                backgroundColor: props.app.colors.background
            }}>
                <View style={{

                }}>
                    <Text style={{
                        fontSize: 20,
                        margin: 30,
                    }}>
                        Find your holiday destination on cabeen
                    </Text>
                </View>
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