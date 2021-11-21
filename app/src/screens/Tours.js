import * as React from 'react'
import {Dimensions, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {bindActionCreators} from "redux";
import {searchPlace, showAutocomplete, showOverlay} from "../state/MapActions";
import {connect} from "react-redux";
import {BackButtonTopNavBar} from "../components/NavBars";
import Carousel from "react-native-snap-carousel";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import {gql, useMutation} from "@apollo/client";
import {ReactNativeFile} from "apollo-upload-client/public";
import TourReservationModal from "../modals/TourReservationModal";
import {reserveCabeen} from "../state/CabeenActions";
import {reserveTour} from "../state/TourActions";
import CabeenDeleteModal from "../modals/CabeenDeleteModal";
import {Actions} from "react-native-router-flux";
import {refreshApp} from "../state/AppActions";

const {height,width} = Dimensions.get('window')

function Buttons(props){

    const [isReserving, setIsReserving] = React.useState(false)
    const [reservationType, setReservationType] = React.useState('normal')
    const [dateOperation, setDateOperation] = React.useState('')
    const [reservationMode, setReservationMode] = React.useState("")

    const CREATE_TOUR_RESERVATION = gql`
        mutation CREATE_TOUR_RESERVATION(
            $tourId:  String,
            $touristId: String,
            $tourName: String,
            $tourProviderId: String,
            $touristName: String,
            $spots: String,
        ){
            createTourReservation(
                input: {
              
                    tourId: $tourId,
                    touristId: $touristId,
                    tourName: $tourName,
                    touristName: $touristName,
                    spots: $spots
                    tourProviderId: $tourProviderId
                    }
            ){
                _id,
                tourId,
                touristId, 
                tourProviderId
                touristName,
                spots
            }
        }
    `
    const CREATE_CABEEN_RESERVATION = gql`
        mutation CREATE_CABEEN_RESERVATION(
            $cabeenId: String,
            $cabeenName: String,
            $cabeenProviderId: String,
            $touristName: String,
            $touristId: String,
            $checkIn: String,
            $checkOut: String,
        ){
            createCabeenReservation(
                cabeenId: $cabeenId,
                cabeenName: $cabeenName,
                cabeenProviderId: $cabeenProviderId
                touristId: $touristId,
                touristName: $touristName,
                checkIn: String,
                checkOut: String,
                ){
                    _id,
                    cabeenId,
                    touristId,
                    cabeenProviderId,
                    touristName,
                    checkIn,
                    checkOut,
                }
        }
    `

    const [createTourReservation] = useMutation(CREATE_TOUR_RESERVATION)

    function reserveTour() {
        console.log('Reserving tour')
        setReservationType('loading')
        createTourReservation({variables:{
            tourId: props.tour.tourDetails._id,
                tourName: props.tour.tourDetails.name,
                touristId: props.app.currentUser.user._id,
                touristName: props.app.currentUser.user.fullName,
                tourProviderId: props.tour.tourDetails.admin,
                spots: `${props.tour.tourReservation.spots}`,
            }})
            .then((res) => {
                //
                // console.log("successful",res)
                setReservationType('success')
            })
            .catch(err => {
                //
                // console.log('An error occurred while uploading', JSON.stringify(err, null, 2))
                setReservationType('error')
            })
    }

    return(
        <>
            <View style={{
                flexDirection: 'row',
                justifyContent: "space-between",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: 10,
                backgroundColor: 'white'

            }}>
                <TouchableOpacity style={{
                    height: 45,
                    width: '45%',
                    justifyContent: "center",
                    alignItems: 'center',
                    borderRadius: 25,
                    borderWidth: 2

                }}>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 20
                    }}>
                        Love
                    </Text>

                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setReservationMode('tour')
                        setIsReserving(true)
                    }}
                    style={{
                    backgroundColor: props.app.colors.buttonColor,
                    height: 45,
                    width: '45%',
                    justifyContent: "center",
                    alignItems: 'center',
                    borderRadius: 25,
                    elevation: 5
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: props.app.colors.whiteText
                    }}>
                        Reserve
                    </Text>
                </TouchableOpacity>
            </View>
            <TourReservationModal
                modalVisible={isReserving}
                type={reservationType}
                mode={reservationMode}
                dateOperation={dateOperation}
                onRequestClose={() => {
                    setIsReserving(false)
                }}
                onCancel={() => {
                    setIsReserving(false)
                    props.reserveCabeen('clear', 'clear', 'clear')
                    props.reserveTour('clear', 'clear', 'clear')
                }}
                onSuccessfully={() => {
                    setIsReserving(false)
                    setReservationType('normal')
                    props.reserveCabeen('clear', "clear", "clear")
                    props.reserveTour('clear', 'clear', 'clear')
                }}
                onCabeenDayIn={() => {
                    setDateOperation('checkIn')
                    setReservationType('cabeenDayIn')
                }}
                onCabeenDayInCancel={() => {
                    setReservationType('normal')
                }}
                onCabeenDayInOK={() => {
                    setReservationType('cabeenMonthIn')
                }}
                onCabeenMonthIn={() => {
                    setDateOperation('checkIn')
                    setReservationType('cabeenMonthIn')
                }}
                onCabeenMonthInCancel={() => {
                    setReservationType('normal')
                }}
                onCabeenMonthInOK={() => {
                    setReservationType('cabeenYearIn')
                }}
                onCabeenYearIn={() => {
                    setDateOperation('checkIn')
                    setReservationType('cabeenYearIn')
                }}
                onCabeenYearInCancel={() => {
                    setReservationType('normal')
                }}
                onCabeenYearInOK={() => {
                    setReservationType('normal')
                }}
                onCabeenDayOut={() => {
                    setDateOperation('checkOut')
                    setReservationType('cabeenDayIn')
                }}
                onCabeenMonthOut={() => {
                    setDateOperation('checkOut')
                    setReservationType('cabeenMonthIn')
                }}
                onCabeenYearOut={() => {
                    setDateOperation('checkOut')
                    setReservationType('cabeenYearIn')
                }}
                onConfirmReservation={() => {
                    if (reservationMode === 'tour'){
                        reserveTour()
                    }

                }}

            />
        </>
    )
}

function PackageCard(props){
    function _renderImages(item){
        return(
            <>
                <View style={{
                    elevation: 5,
                    width: '100%',
                    borderRadius: 10,
                    marginTop: 10,
                    marginBottom: 10,
                    backgroundColor: 'white'
                }}>
                    <Image
                        style={{
                            width: '100%',
                            height: 320,
                            backgroundColor: props.app.colors.background,
                            borderRadius: 10,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius:10
                        }}
                        source={{
                            uri: `${props.app.urls.tours}${item.item}`
                        }}/>
                    <View style={{
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        // elevation: 10,
                        backgroundColor: 'rgba(1,1,1,.5)',
                        padding: 5,
                        paddingLeft: 10,
                        paddingRight: 10,
                        borderRadius: 20
                    }}>
                        <Text style={{
                            color: 'white',
                        }}>
                            {item.index + 1} / {props.tour.tourDetails.images.length}
                        </Text>
                    </View>

                </View>
            </>
        )
    }

    function _imageCarousel() {
        return(
            <>
                <View>
                    <Carousel
                        data={props.tour.tourDetails.images}
                        renderItem={_renderImages}
                        sliderWidth={props.app.portrait ?width: height}
                        itemWidth={props.app.portrait ?0.98* width: 0.98*height}
                    />
                </View>
            </>
        )
    }

    function _packageDetails(){
        return(
            <>
                <View>
                    <Text style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        margin: 10
                    }}>
                        {props.tour.tourDetails.name}
                    </Text>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: props.app.colors.statusBar,
                        margin: 10
                    }}>
                        Location
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        margin: 20,
                        alignItems: "center"
                    }}>
                        <Ionicons
                            name={'location'}
                            size={25}
                            color={props.app.colors.statusBar}
                        />
                        <Text style={{
                            fontSize: 19,
                            marginLeft: 10,
                            flex: 1
                        }}>
                            {props.tour.tourDetails.location}
                        </Text>

                    </View>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: props.app.colors.statusBar,
                        margin: 10
                    }}>
                        Date
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        margin: 20,
                        alignItems: "center"
                    }}>
                        <Ionicons
                            name={'calendar'}
                            size={25}
                            color={props.app.colors.statusBar}
                        />
                        <Text style={{
                            fontSize: 19,
                            marginLeft: 10
                        }}>
                            {props.tour.tourDetails.tourDate}
                        </Text>
                    </View>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: props.app.colors.statusBar,
                        margin: 10
                    }}>
                        Price
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        margin: 20,
                        alignItems: "center"
                    }}>
                        <MaterialCommunityIcons
                            name={'cash-multiple'}
                            size={30}
                            color={props.app.colors.statusBar}
                        />
                        <Text style={{
                            fontSize: 19,
                            marginLeft: 10
                        }}>
                            {props.tour.tourDetails.price} KES
                        </Text>
                    </View>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: props.app.colors.statusBar,
                        margin: 10,
                    }}>
                        Description
                    </Text>
                    <Text style={{
                        fontSize: 20,
                        marginLeft: 20,
                        margin: 10,
                        marginBottom: 50,
                        flex: 1
                    }}>
                        {props.tour.tourDetails.description}
                    </Text>

                </View>

            </>
        )
    }

    return(
        <>
            <FlatList
                data={[1]}
                renderItem={() => (
                    <View>
                        {_imageCarousel()}
                        {_packageDetails()}
                    </View>
                )}
                ListFooterComponent={() => (
                    <>
                        <View style={{margin: 30}}/>
                    </>
                )}
                keyExtractor={(key, item) => key + item}
            />
        </>
    )
}

function Navigation(props) {

    const DELETE_TOUR = gql`
        mutation DELETE_TOUR(
            $_id: ID,
        ){
            deleteTour(
                _id: $_id
            ){
                name
            }
        }
    `
    const [deleteTour] = useMutation(DELETE_TOUR)
    const [isDeletingTour, setIsDeletingTour] = React.useState(false)
    const [isType, setIsType] = React.useState('normal')

    const removeTour = () => {
        // console.log(props.cabeen.cabeenDetails)
        setIsType('loading')
        deleteTour({variables: {
                _id: props.tour.tourDetails._id
            }})
            .then((res) => {
                // console.log(res)
                setIsType('success')
            })
            .catch((err) => {
                setIsType('error')
                // console.log(err)
            })
    }

    return(
        <>
            <BackButtonTopNavBar
                title={props.tour.tourDetails.name}
                icon={'trash-outline'}
                isManager={props.tour.tourDetails.admin === props.app.currentUser.user._id}
                onIconPress={() => {
                    setIsDeletingTour(true)
                }}
            />
            <CabeenDeleteModal
                modalVisible={isDeletingTour}
                isType={isType}
                mode={'tour'}
                // isError={isError}
                onRequestClose={() => {
                    setIsDeletingTour(false)
                }}
                onSubmit={() => {
                    removeTour()
                    // console.log('submitted')
                }}
                onCancel={() => {
                    setIsDeletingTour(false)
                }}

                onError={() => {
                    setIsType('normal')
                    setIsDeletingTour(true)
                }}
                onSuccessfully={() => {
                    setIsType('normal')
                    setIsDeletingTour(false)
                    props.refreshApp()
                    Actions.pop()
                }}
            />

        </>
    )
}

function Tours(props){
    return(
        <>
            <View style={{
                flex: 1
            }}>
                <Navigation {...props}/>
                <PackageCard {...props}/>
                <Buttons {...props}/>

            </View>
        </>
    )
}


const mapStateToProps = state => {
    const {app,map,tour} = state;
    // console.log('state',map)
    return {app, map, tour}
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        searchPlace,
        showAutocomplete,
        showOverlay,
        reserveCabeen,
        reserveTour,
        refreshApp

    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Tours)