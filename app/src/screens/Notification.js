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
    TouchableOpacity, Image, FlatList, ActivityIndicator, SectionList
} from "react-native";
import { bindActionCreators } from "redux";
import { agreeToTerms } from "../state/AppActions";
import { connect } from "react-redux";
import {BackButtonTopNavBar, TopNavBar} from "../components/NavBars";
import { CustomFlatList } from "../components/Lists";
import { Actions } from "react-native-router-flux";
import {gql, useMutation} from "@apollo/client";
import ContactModal from "../modals/ContactModal";
import {findContactPerson} from '../state/CabeenActions'
import {formatRelative, format, parseISO, isValid} from "date-fns";

function ContentList (props){
    const FETCH_USER = gql`
		mutation FETCH_USER(
			$_id: ID
		){
			fetchUser(
				_id: $_id
			){
				fullName,
				phone,
				email
			}
		}
	`
    const [fetchUser] = useMutation(FETCH_USER)
    const [showContact, setShowContact] = React.useState(false)
    const [contactType, setContactType] = React.useState('normal')

    function getUser(item) {
        // console.log(id)
        setShowContact(true)
        setContactType('loading')
        fetchUser({variables: {
                _id: item.item.__typename === 'CabeenReservation' ? item.item.cabeenProviderId === props.app.currentUser.user._id ? item.item.touristId: item.item.cabeenProviderId:item.item.tourProviderId === props.app.currentUser.user._id ? item.item.touristId: item.item.tourProviderId
            }})
            .then((res) => {
                // console.log('successful', res.data)
                props.findContactPerson(res.data.fetchUser[0])
                setContactType('normal')
            })
            .catch(error => {
                // console.log('An error occurred', error)
                setContactType('error')
            })
    }

    function msgFormatter(item){
        if (item.item.__typename === 'CabeenReservation'){
            if (item.item.cabeenProviderId === props.app.currentUser.user._id){
                return (
                    <>
                        <Text style={{ fontWeight: "bold", color: props.app.colors.statusBar}}>{item.item.touristName}</Text> reserved <Text style={{ fontWeight: "bold", color: props.app.colors.statusBar}}>{item.item.cabeenName}</Text> from <Text style={{ fontWeight: "bold", color: props.app.colors.statusBar}}>{item.item.checkIn}</Text> to <Text style={{ fontWeight: "bold", color: props.app.colors.statusBar}}>{item.item.checkOut}</Text>
                    </>
                )
            }
            else if (item.item.touristId === props.app.currentUser.user._id){
                return (
                    <>
                        You reserved <Text style={{ fontWeight: "bold", color: props.app.colors.statusBar}}>{item.item.cabeenName}</Text> from <Text style={{ fontWeight: "bold", color: props.app.colors.statusBar}}>{item.item.checkIn}</Text> to <Text style={{ fontWeight: "bold", color: props.app.colors.statusBar}}>{item.item.checkOut}</Text>
                    </>
                )
            }
        }
        else {
            if (item.item.tourProviderId === props.app.currentUser.user._id){
                return (
                    <>
                        {<Text style={{ fontWeight: "bold", color: props.app.colors.statusBar}}>{item.item.touristName }</Text> } Reserved <Text style={{fontWeight: 'bold', color: props.app.colors.statusBar}}>{item.item.spots}</Text> {item.item.spots === '1' ? 'spot' : 'spots'} on <Text style={{fontWeight: "bold", color: props.app.colors.statusBar}}>{item.item.tourName}</Text>
                    </>
                )
            }
            else if (item.item.touristId === props.app.currentUser.user._id){
                return (
                    <>
                        You reserved <Text style={{fontWeight: 'bold', color: props.app.colors.statusBar}}>{item.item.spots}</Text> {item.item.spots === '1' ? 'spot' : 'spots'} on <Text style={{fontWeight: "bold", color: props.app.colors.statusBar}}>{item.item.tourName}</Text>
                    </>
                )
            }
        }

    }

    function dateFormatter(item){
        return formatRelative(new Date(parseInt(item.item.reservationTime)), new Date())
    }

    function renderItem(item){
        return(
            <>
                <View style={{
                    margin: 10,
                    backgroundColor: 'white',
                    padding: 0,
                    elevation: 0,
                    borderRadius: 20,

                    // borderBottomWidth: 2,
                    borderColor:props.app.colors.secondaryText
                }}>
                    <View style={{
                        flexDirection: "row",
                        margin: 10,
                        marginTop: 15
                        // alignItems: "center"
                    }}>
                        <Image
                            style={{
                                height: 50,
                                width: 50,
                                borderRadius: 30,
                                backgroundColor: props.app.colors.statusBar
                            }}
                            // source={require('../../assets/image/cabeen.png')}
                        />
                        <Text style={{
                            marginLeft: 10,
                            fontSize: 20,
                            flex: 1,
                            color: props.app.colors.primaryText
                        }}>
                            {msgFormatter(item)}
                        </Text>
                    </View>
                    <View style={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        margin: 15
                    }}>
                        <Text style={{
                            color: props.app.colors.secondaryText
                        }}>
                            {dateFormatter(item)}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                getUser(item)
                            }}
                            style={{
                                width: '35%',
                                height: 35,
                                backgroundColor: props.app.colors.buttonColor,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 30,
                                margin: 0,
                                elevation: 5,
                                alignSelf: "flex-end"
                            }}>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: "bold",
                                color: 'white'
                            }}>
                                Contact
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </>
        )
    }
    return(
        <>
            <View>
                <SectionList
                    sections={[{'title': 'Tour Reservations', 'data': props.tourReservationData},
                        {'title': 'Cabeen Reservations', 'data': props.cabeenReservationData}
                    ]}
                    // data={props.tourReservationData}
                    renderItem={(item) => renderItem(item)}
                    renderSectionHeader={({section: {title}}) => (<View style={{margin: 10}}>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 25,
                            margin: 10,
                            alignSelf: "center"
                        }}>
                            {title}
                        </Text>
                    </View>)}
                    ListEmptyComponent={() => (
                        <View>
                            <Text>
                                Your Reservations will appear here
                            </Text>
                        </View>
                    )}
                    ItemSeparatorComponent={() => <View style={{margin: 0}}/>}
                    ListFooterComponent={() => <View style={{margin: 50}}/>}
                    keyExtractor={(item,index) => item+index}
                />

            </View>
            <ContactModal
                modalVisible={showContact}
                contactType={contactType}
                onRequestClose={() => {
                    setShowContact(false)
                }}
                onOK={() => {
                    setShowContact(false)
                }}
                onError={() => {
                    getUser()
                }}

            />
        </>
    )
}

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
			    spots,
			    tourProviderId,
			    touristName,
			    touristId,
			    reservationTime,	
			}
		}
	`
    const FETCH_CABEEN_RESERVATIONS = gql `
        mutation FETCH_TOUR_RESERVATIONS(
            $cabeenId: String
            $touristId: String
            $cabeenProviderId: String
        ){
            fetchCabeenReservation(
                cabeenId: $cabeenId
                touristId: $touristId
                cabeenProviderId: $cabeenProviderId
            ){
                _id,
                cabeenName,
                cabeenId,
                cabeenProviderId,
                touristName,
                touristId,
                reservationTime,
                checkIn,
                checkOut
            }
        }
    `
    const [fetchCabeenReservations] = useMutation(FETCH_CABEEN_RESERVATIONS)
    const [fetchTourReservations] = useMutation(FETCH_TOUR_RESERVATIONS)
    const [tourReservationData, setTourReservationData] = React.useState([])
    const [isFetchingReservationData, setIsFetchingReservationData] = React.useState(false)
    const [cabeenReservationData, setCabeenReservationData] = React.useState([])
    const [isFetchingCabeenData, setIsFetchingCabeenData] = React.useState(false)

    function getTourReservation() {
        setIsFetchingReservationData(true)
        fetchTourReservations({variables: {
            touristId: props.app.currentUser.user._id,
                tourId: null,
                tourProviderId: props.app.currentUser.user._id,
            }})
            .then((res) => {
                // console.log('hello world', res.data.fetchTourReservation)
                setIsFetchingReservationData(false)
                setTourReservationData(res.data.fetchTourReservation)
            })
            .catch(err => {
                setIsFetchingReservationData(false)
                console.log('An error occurred while uploading', JSON.stringify(err, null, 2))
            })
    }

    function getCabeenReservation(){
        setIsFetchingCabeenData(true)
        fetchCabeenReservations({variables: {
            touristId: props.app.currentUser.user._id,
                cabeenId: null,
                cabeenProviderId: props.app.currentUser.user._id,
            }})
            .then((res) => {
                setIsFetchingCabeenData(false)
                // console.log('cabeen', res.data.fetchCabeenReservation)
                setCabeenReservationData(res.data.fetchCabeenReservation)
            })
            .catch(error => {
                setIsFetchingCabeenData(false)
                // console.log('An error occurred while uploading', JSON.stringify(error, null, 2))
            })
    }

    React.useEffect(() => {
        getTourReservation();
        getCabeenReservation()
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
                    {
                        !isFetchingReservationData ?
                            <ContentList
                                {...props}
                                tourReservationData={tourReservationData}
                                cabeenReservationData={cabeenReservationData}
                            />: <ActivityIndicator size={'small'} color={props.app.colors.statusBar}/>
                    }
                    {/*{*/}
                    {/*    !isFetchingCabeenData ?*/}
                    {/*        <ContentList*/}
                    {/*            {...props}*/}
                    {/*            // tourReservationData={tourReservationData}*/}
                    {/*            cabeenReservationData={cabeenReservationData}*/}
                    {/*        />: null*/}
                    {/*}*/}

                </View>

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
        agreeToTerms,
        findContactPerson

    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
