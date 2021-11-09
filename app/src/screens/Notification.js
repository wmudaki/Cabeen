/*
*
* The file contains the classes and functions that
*
* create and implement the notification screen
*
* */
import * as React from "react";
import {
    Text,
    View,
    TouchableOpacity
} from "react-native";
import { bindActionCreators } from "redux";
import { agreeToTerms } from "../state/AppActions";
import { connect } from "react-redux";
import {BackButtonTopNavBar, TopNavBar} from "../components/NavBars";
import { CustomFlatList } from "../components/Lists";
import { Actions } from "react-native-router-flux";
import {gql, useMutation} from "@apollo/client";


function Notification (props){

    const FETCH_TOUR_RESERVATIONS = gql `
		mutation FETCH_TOUR_RESERVATIONS(
			$tourId: String
			$touristId: String
			$tourProviderId: String
		){
			fetchTourReservation(
				tourId: $tourId
				touristId: $touristId
				tourProviderId: $tourProviderId
			){
			    _id,
			    tourName,
			    tourId,
			    touristName,
			    touristId,
			    reservationTime,	
			}
		}
	`
    const [fetchTourReservations] = useMutation(FETCH_TOUR_RESERVATIONS)

    function getTourReservation() {
        console.log(props.app.currentUser.user._id,)
        fetchTourReservations({variables: {
            touristId: props.app.currentUser.user._id,
                tourId: null,
                touristProvider: null,
            }})
            .then((res) => {
                console.log('hello world', res.data)
            })
            .catch(err => {
                console.log('An error occurred while uploading', JSON.stringify(err, null, 2))
            })
    }

    React.useEffect(() => {
        getTourReservation()
    }, [])

    return(
        <>
            <View style={{
                flex: 1,
                backgroundColor: props.app.colors.whiteText
            }}>
                <BackButtonTopNavBar
                    title={'Notifications'}
                />
                <View>
                    <CustomFlatList/>
                </View>

            </View>
        </>
    )
}



const mapStateToProps = state => {
    const {app} = state;
    return {app}
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        agreeToTerms,

    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
