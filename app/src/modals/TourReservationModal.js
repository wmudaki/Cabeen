import {ActivityIndicator, FlatList, Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {bindActionCreators} from "redux";
import {addCabeen, addTenant, selectImages, reserveCabeen} from "../state/CabeenActions";
import {connect} from "react-redux";
import * as React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


function ReservationSuccess(props){
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
                    Successfully reserved the tour, a representative will get in touch soon

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

function ReservationError(props){
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
                    An error occurred Please try again ...

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

function ReservationLoading(props) {
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

function YearModal(props){
    const Years = [
        "2021", "2022", "2023", "2024", "2025", "2026",
        "2027", "2028", "2029", "2030", "2031", "2032"
    ]

    function _renderItem(item){
        return(
            <>
                <TouchableOpacity
                    onPress={() => props.reserveCabeen(props.dateOperation, 'year', item.item)}
                    style={{
                        height: 50,
                        backgroundColor: props.dateOperation === 'checkIn' ? props.cabeen.cabeenReservation.checkIn.year === item.item ? props.app.colors.buttonColor: props.app.colors.background:
                            props.cabeen.cabeenReservation.checkOut.year === item.item ? props.app.colors.buttonColor: props.app.colors.background ,
                        margin: 7,
                        elevation: props.dateOperation === 'checkIn' ? props.cabeen.cabeenReservation.checkIn.year === item.item ? 10: null:
                            props.cabeen.cabeenReservation.checkOut.year === item.item ? 10: null,
                    width: 70,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: "center",

                }}>
                    <Text style={{
                        // fontWeight: "bold",
                        fontSize: 18
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
                height: '55%',
                width: "90%",
                borderRadius: 20,
                elevation: 20,
                margin: 20,
                // alignItems: "center",
                backgroundColor: props.app.colors.whiteText,
            }}>
                <Text style={{
                    fontSize: 25,
                    margin: 10,
                    fontWeight: "bold",
                    alignSelf: "center"
                }}>
                    Year
                </Text>
                <FlatList
                    data={Years}
                    renderItem={_renderItem}
                    numColumns={3}
                    style={{ alignSelf: "center"}}
                    keyExtractor={(item,key) => item + key}
                />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: 20,
                }}>
                    <TouchableOpacity
                        onPress={props.onCabeenYearInCancel}
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
                        onPress={props.onCabeenYearInOK}
                        style={{
                            backgroundColor: props.app.colors.buttonColor,
                            borderRadius: 25,
                            elevation: 5,
                            height: 40,
                            width: '45%',
                            justifyContent: "center",
                            alignItems:"center"
                        }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: 'white'
                        }}>
                            OK
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

function MonthModal(props){
    const Months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    function _renderItem(item){
        return(
            <>
                <TouchableOpacity
                    onPress={() => props.reserveCabeen(props.dateOperation, 'month', item.item)}
                    style={{
                        height: 50,
                        backgroundColor: props.dateOperation === 'checkIn' ? props.cabeen.cabeenReservation.checkIn.month === item.item ? props.app.colors.buttonColor: props.app.colors.background:
                            props.cabeen.cabeenReservation.checkOut.month === item.item ? props.app.colors.buttonColor: props.app.colors.background ,
                        margin: 7,
                        elevation: props.dateOperation === 'checkIn' ? props.cabeen.cabeenReservation.checkIn.month === item.item ? 10: null:
                            props.cabeen.cabeenReservation.checkOut.month === item.item ? 10: null,
                    width: 70,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: "center",

                }}>
                    <Text style={{
                        // fontWeight: "bold",
                        fontSize: 18
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
                height: '55%',
                width: "90%",
                borderRadius: 20,
                elevation: 20,
                margin: 20,
                // alignItems: "center",
                backgroundColor: props.app.colors.whiteText,
            }}>
                <Text style={{
                    fontSize: 25,
                    margin: 10,
                    fontWeight: "bold",
                    alignSelf: "center"
                }}>
                    Month
                </Text>
                <FlatList
                    data={Months}
                    renderItem={_renderItem}
                    numColumns={3}
                    style={{ alignSelf: "center"}}
                    keyExtractor={(item,key) => item + key}
                />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: 20,
                }}>
                    <TouchableOpacity
                        onPress={props.onCabeenMonthInCancel}
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
                        onPress={props.onCabeenMonthInOK}
                        style={{
                            backgroundColor: props.app.colors.buttonColor,
                            borderRadius: 25,
                            elevation: 5,
                            height: 40,
                            width: '45%',
                            justifyContent: "center",
                            alignItems:"center"
                        }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: 'white'
                        }}>
                            OK
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

function DayModal(props){
    function checkInDateResolve(){
        if (props.cabeen.cabeenReservation.checkIn.month === 'Sep' ||
            props.cabeen.cabeenReservation.checkIn.month ==='Apr' ||
            props.cabeen.cabeenReservation.checkIn.month ==='Jun' ||
            props.cabeen.cabeenReservation.checkIn.month ==='Nov'){
            return [...Array(30).keys()].map(i => i + 1)
        }
        else if (props.cabeen.cabeenReservation.checkIn.month === 'Feb'){
            if (parseInt(props.cabeen.cabeenReservation.checkIn.year) % 4 === 0){
                return [...Array(29).keys()].map(i => i + 1)
            }
            return [...Array(28).keys()].map(i => i + 1)
        }
        else return [...Array(31).keys()].map(i => i + 1)
    }

    function _renderItem(item){

        return(
            <>
                <TouchableOpacity
                    onPress={() => props.reserveCabeen(props.dateOperation, 'day', item.item)}
                    style={{
                    height: 40,
                    backgroundColor: props.dateOperation === 'checkIn' ? props.cabeen.cabeenReservation.checkIn.day === item.item ? props.app.colors.buttonColor: props.app.colors.background:
                        props.cabeen.cabeenReservation.checkOut.day === item.item ? props.app.colors.buttonColor: props.app.colors.background ,
                    margin: 7,
                    elevation: props.dateOperation === 'checkIn' ? props.cabeen.cabeenReservation.checkIn.day === item.item ? 10: null:
                        props.cabeen.cabeenReservation.checkOut.day === item.item ? 10: null,
                    // padding: 10,
                    width: 40,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: "center",

                }}>
                    <Text style={{
                        // fontWeight: "bold",
                        fontSize: 18
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
                height: '65%',
                width: "95%",
                borderRadius: 20,
                elevation: 20,
                margin: 20,
                // alignItems: "center",
                backgroundColor: props.app.colors.whiteText,
            }}>
                <Text style={{
                    fontSize: 25,
                    margin: 10,
                    fontWeight: "bold",
                    alignSelf: "center"
                }}>
                    Day
                </Text>
                <FlatList
                    data={checkInDateResolve()}
                    renderItem={_renderItem}
                    numColumns={6}
                    style={{ alignSelf: "center"}}
                    keyExtractor={(item,key) => item + key}
                    />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: 20,
                }}>
                    <TouchableOpacity
                        onPress={props.onCabeenDayInCancel}
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
                        onPress={props.onCabeenDayInOK}
                        style={{
                            backgroundColor: props.app.colors.buttonColor,
                            borderRadius: 25,
                            elevation: 5,
                            height: 40,
                            width: '45%',
                            justifyContent: "center",
                            alignItems:"center"
                        }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: 'white'
                        }}>
                            OK
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

function CabeenReservationDetails(props){

    return(
        <>
            <View style={{
                height: '65%',
                width: "95%",
                borderRadius: 20,
                elevation: 20,
                margin: 20,
                backgroundColor: props.app.colors.whiteText,
            }}>
                <Text style={{
                    fontSize: 25,
                    margin: 10,
                    fontWeight: "bold",
                    alignSelf: "center"
                }}>
                    Reservation Details
                </Text>

                <ScrollView style={{
                    margin: 20
                }}>
                    <View>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 25,
                            color: props.app.colors.statusBar
                        }}>
                            Cabeen
                        </Text>
                        <Text style={{
                            fontSize: 20,
                            margin: 20
                        }}>
                            Casa Florentina
                        </Text>
                    </View>
                    <View>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 25,
                            color: props.app.colors.statusBar
                        }}>
                            Check in
                        </Text>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: 'space-between',
                            margin: 15
                        }}>
                            <TouchableOpacity
                                onPress={props.onCabeenDayIn}
                            >
                                <Ionicons
                                    size={25}
                                    color={props.app.colors.statusBar}
                                    name={'calendar'}/>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={props.onCabeenDayIn}
                                style={{
                                alignItems: "center"
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: "bold"
                                }}>
                                    Day
                                </Text>
                                <Text style={{
                                    fontSize: 17
                                }}>
                                    {props.cabeen.cabeenReservation.checkIn.day}
                                </Text>

                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={props.onCabeenMonthIn}
                                style={{
                                alignItems: "center",
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: "bold"
                                }}>
                                    Month
                                </Text>
                                <Text style={{
                                    fontSize: 17
                                }}>
                                    {props.cabeen.cabeenReservation.checkIn.month}
                                </Text>

                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={props.onCabeenYearIn}
                                style={{
                                alignItems: "center"
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: "bold"
                                }}>
                                    Year
                                </Text>
                                <Text style={{
                                    fontSize: 17
                                }}>
                                    {props.cabeen.cabeenReservation.checkIn.year}
                                </Text>

                            </TouchableOpacity>

                        </View>
                    </View>
                    <View>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 25,
                            color: props.app.colors.statusBar
                        }}>
                            Check out
                        </Text>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: 'space-between',
                            margin: 15
                        }}>
                            <TouchableOpacity onPress={props.onCabeenDayOut}>
                                <Ionicons
                                    size={25}
                                    color={props.app.colors.statusBar}
                                    name={'calendar'}/>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={props.onCabeenDayOut}
                                style={{
                                alignItems: "center"
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: "bold"
                                }}>
                                    Day
                                </Text>
                                <Text style={{
                                    fontSize: 17
                                }}>
                                    {props.cabeen.cabeenReservation.checkOut.day}
                                </Text>

                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={props.onCabeenMonthOut}
                                style={{
                                alignItems: "center",
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: "bold"
                                }}>
                                    Month
                                </Text>
                                <Text style={{
                                    fontSize: 17
                                }}>
                                    {props.cabeen.cabeenReservation.checkOut.month}
                                </Text>

                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={props.onCabeenYearOut}
                                style={{
                                alignItems: "center"
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: "bold"
                                }}>
                                    Year
                                </Text>
                                <Text style={{
                                    fontSize: 17
                                }}>
                                    {props.cabeen.cabeenReservation.checkOut.year}
                                </Text>

                            </TouchableOpacity>

                        </View>
                    </View>
                    <View>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 25,
                            color: props.app.colors.statusBar
                        }}>
                            Price
                        </Text>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            margin: 15
                        }}>
                            <MaterialCommunityIcons
                                size={25}
                                color={props.app.colors.statusBar}
                                name={'cash-multiple'}/>
                            <Text style={{
                                fontSize: 18,
                                marginLeft: 10
                            }}>
                                1200 KES / Night
                            </Text>
                        </View>

                    </View>
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
                        onPress={null}
                        style={{
                            backgroundColor: props.app.colors.buttonColor,
                            borderRadius: 25,
                            elevation: 5,
                            height: 40,
                            width: '45%',
                            justifyContent: "center",
                            alignItems:"center"
                        }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: 'white'
                        }}>
                            Confirm
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

function ReservationDetails(props){
    return(
        <>
            <View style={{
                height: '65%',
                width: "90%",
                borderRadius: 20,
                elevation: 20,
                margin: 20,
                backgroundColor: props.app.colors.whiteText,
            }}>
                <Text style={{
                    fontSize: 25,
                    margin: 10,
                    fontWeight: "bold",
                    alignSelf: "center"
                }}>
                    Reservation Details
                </Text>

                <ScrollView style={{
                    margin: 10
                }}>
                    <View>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            color: props.app.colors.statusBar
                        }}>
                            Tour name
                        </Text>
                        <Text style={{
                            fontSize: 18,
                            margin: 20
                        }}>
                            Kilimanjaro hike
                        </Text>
                    </View>
                    <View>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            color: props.app.colors.statusBar
                        }}>
                            Number of spots
                        </Text>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: 'space-around',
                            margin: 10
                        }}>
                            <TouchableOpacity>
                                <MaterialCommunityIcons
                                    size={25}
                                    name={'minus-circle-outline'}/>

                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 18,
                                margin: 10
                            }}>
                                1
                            </Text>
                            <TouchableOpacity>
                                <MaterialCommunityIcons
                                    size={25}
                                    name={'plus-circle-outline'}/>

                            </TouchableOpacity>

                        </View>
                    </View>
                    <View>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            color: props.app.colors.statusBar
                        }}>
                            Price
                        </Text>
                        <Text style={{
                            fontSize: 18,
                            margin: 20
                        }}>
                            1200 KES
                        </Text>
                    </View>
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
                        onPress={null}
                        style={{
                            backgroundColor: props.app.colors.buttonColor,
                            borderRadius: 25,
                            elevation: 5,
                            height: 40,
                            width: '45%',
                            justifyContent: "center",
                            alignItems:"center"
                        }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: 'white'
                        }}>
                            Confirm
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

function Content(props){
    if (props.type === 'error'){
        return (
            <>
                <ReservationError {...props}/>
            </>
        )
    }
    else if (props.type === 'success'){
        return (
            <>
                <ReservationSuccess {...props}/>
            </>
        )
    }
    else if (props.type === 'loading'){
        return (
            <>
                <ReservationLoading {...props}/>
            </>
        )
    }

    else if (props.type === 'cabeenDayIn'){
        return (
            <>
                <DayModal {...props}/>
            </>
        )
    }
    else if (props.type === 'cabeenMonthIn'){
        return (
            <>
                <MonthModal {...props}/>
            </>
        )
    }
    else if (props.type === 'cabeenYearIn'){
        return (
            <>
                <YearModal {...props}/>
            </>
        )
    }

    return(
        <>
            <CabeenReservationDetails {...props}/>
        </>
    )
}

function TourReservationModal(props){
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
        selectImages,
        reserveCabeen

    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(TourReservationModal)
