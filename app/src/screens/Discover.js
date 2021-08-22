/*
* The file implements the home screen for the application
*
* */

import * as React from 'react'
import {
	View,
	ScrollView,
	Alert,
	BackHandler,
	ActivityIndicator,
	Text,
	Image,
	Dimensions,
	TouchableOpacity, FlatList
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
	FloatingSearchBar,
	AutoCompleteCard
} from "../components/SearchBars";
import { Map, MapCabeen } from "../components/Map";
import {searchPlace,showAutocomplete, showOverlay} from "../state/MapActions";
import {FloatingActionButton} from "../components/Buttons";
import CabeenAddModal from "../modals/CabeenAddModal";
import {gql, useMutation} from "@apollo/client";
import {useBackHandler} from "@react-native-community/hooks";
import {Actions} from "react-native-router-flux";
import Carousel from "react-native-snap-carousel";
import CabeenCard from "../components/Cards";
import {getCabeenDetails, selectImages, addCabeen, updateCabeens} from "../state/CabeenActions";



let token = "pk.eyJ1IjoidG90b2RpbmdpIiwiYSI6ImNqeDd5N3Q4YzBib3QzbnBwYW0wbXA5dm4ifQ.5au8D_SQ61D8dXzsgzS-oQ"

const {height, width} = Dimensions.get("window")

function NavigationBar(props){
	return(
		<>
			<View style={{
				flexDirection: "row",
				height: 50,
				alignItems: "center",
				justifyContent: "space-between",
				margin: 20,
				marginTop: 10,
				elevation: 10,
				padding: 5,
				borderRadius: 5,
				backgroundColor: props.app.colors.whiteText
			}}>
				<Text style={{
					color: props.app.colors.statusBar,
					fontWeight: "bold",
					fontSize: 23
				}}>
					Home
				</Text>
				<TouchableOpacity onPress={() => Actions.account()}>
					<Image
						source={{
							uri: 'uri'
						}}
						style={{
							height: 40,
							width: 40,
							borderRadius: 20,
							backgroundColor: props.app.colors.background
						}}
						/>
				</TouchableOpacity>
			</View>
		</>
	)
}

function CarouselList(props){

	const _renderItem = (item) => {
		return(
			<>
				<TouchableOpacity
					onPress={() => {
						props.getCabeenDetails(item.item)
						Actions.cabeen()
					}}
					style={{
					flex: 1,
					margin: 5,
					borderRadius: 10,
					elevation: 10,
					backgroundColor: 'white'
				}}>
					<Image
						source={{
							uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.BEyMW2mX7ojl1e1TQo4vPwHaE8%26pid%3DApi&f=1'
						}}
						style={{
							height: 200,
							width: '100%',
							borderRadius: 10,
							backgroundColor: props.app.colors.background
						}}
					/>
					<View style={{
						margin: 10
					}}>
						<Text
							numberOfLines={2}
							style={{
							fontSize: 18,
							// fontWeight: 'bold'
						}}>
							{item.item.name}
						</Text>
					</View>
				</TouchableOpacity>
				{/*<CabeenCard*/}
				{/*	name={item.item.name}*/}
				{/*	price={item.item.price}*/}
				{/*	location={item.item.location}*/}
				{/*	vertical={true}*/}
				{/*	onPress={() => {*/}
				{/*		props.getCabeenDetails(item.item)*/}
				{/*		Actions.cabeen()*/}

				{/*	}}*/}
				{/*/>*/}
			</>
		)
	}

	return(
		<>
			<View style={{
				width:'100%'
			}}>
				<FlatList
					data={props.fetchResults}
					renderItem={_renderItem}
					numColumns={2}
					keyExtractor={(item, key) => item+key}
					ItemSeparatorComponent={() => (<View style={{margin: 5}}/>)}
					ListHeaderComponent={() => (<View style={{margin: 50}}/>)}
					ListFooterComponent={() => (<View style={{margin: 50}}/>)}
					ListEmptyComponent={() => (
						<View style={{
							marginTop: 100,
							margin: 30
						}}>
							<Text style={{
								fontSize: 25,
								color: props.app.colors.secondaryText,
								fontWeight: "bold",
								alignSelf: 'center'
							}}>
								The cabeens you add will appear here ...
							</Text>
						</View>
					)}
				/>
			</View>
		</>

	)
}

function Content(props){
	return(
		<>
			<View style={{
				marginTop: 0
			}}>
				{
					props.hasFetchResults ?
						<CarouselList
							{...props}
						/>:
						null
				}

			</View>

		</>
	)
}

function Discover(props){

	const ADD_CABEEN = gql`
		mutation ADD_CABEEN(
			$name: String,
			$type: String,
			$description: String,
			$price: String,
			$currency: String,
			$location: String,
			$features: String,
			$admin: String
		){
			createCabeen(
				input: {
					name: $name,
					type: $type,
					description: $description,
					price: $price,
					features: $features,
					currency: $currency,
					location: $location,
					admin: $admin

				}
			){
				_id,
				name,
				price,
				location,
				type,
				features,
				description,
				admin
			}
		}
	`
	
	const FETCH_CABEENS = 	gql`
		mutation FETCH_CABEENS{
			fetchCabeens{
				_id,
				name,
				price,
				location,
				features,
				type,
				description,
				admin,
				likes
			}
		}
	`
	const [isFetchingCabeens, setIsFetchingCabeens] = React.useState(false)
	const [hasFetchResults, setHasFetchResults] = React.useState(false)
	const [fetchResults, setFetchResults] = React.useState([])
	const [fetchCabeens] = useMutation(FETCH_CABEENS)

	const [isAddingCabeen, setIsAddingCabeen] = React.useState(false)
	const [isType, setIsType] = React.useState('normal')
	const [createCabeen] = useMutation(ADD_CABEEN)

	const addCabeen = () => {
		setIsType('loading')
		console.log(props.cabeen.cabeenInfo)
		createCabeen({variables: {
				name: props.cabeen.cabeenInfo.name,
				type: props.cabeen.cabeenInfo.type,
				features: props.cabeen.cabeenInfo.features,
				description: props.cabeen.cabeenInfo.description,
				price: props.cabeen.cabeenInfo.price,
				currency: props.cabeen.cabeenInfo.currency,
				location: props.cabeen.cabeenInfo.location,
				admin: props.app.currentUser.user._id
			}})
			.then((res) => {
				setIsType('success')
				// setIsCreatingCabeen(false)
			})
			.catch(e => {
				console.log("Error",e)
				setIsType('error')
			})
	}

	const getCabeens = () => {
		setIsFetchingCabeens(true)
		fetchCabeens()
			.then((res) => {
				setIsFetchingCabeens(false)
				setHasFetchResults(true)
				setFetchResults(res.data.fetchCabeens)
			})
			.catch((err) => {
				console.log("Error occurred",err)
				setIsFetchingCabeens(false)
			})
	}

	React.useEffect(() => {
		getCabeens()
	}, [isType, props.cabeen.updateCabeens])

	return(
		<>
			<View style={{
				flex: 1,
				backgroundColor: props.app.colors.whiteText
			}}>

				<View style={{
					marginTop: 0
				}}>
					<Content
						hasFetchResults={hasFetchResults}
						fetchResults={fetchResults}
						{...props}
					/>
				</View>
				<View style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0
				}}>
					<NavigationBar
						{...props}
					/>
				</View>

				{
					isFetchingCabeens?
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
				<View style={{
					position: "absolute",
					bottom: 100,
					right: 5

				}}>
					<FloatingActionButton
						onPress={() => {
							setIsAddingCabeen(true)
						}}
					/>
				</View>
			</View>
			<CabeenAddModal
				modalVisible={isAddingCabeen}
				isType={isType}
				// isError={isError}
				onRequestClose={() => {
					setIsAddingCabeen(false)
				}}
				onSubmit={() => {
					addCabeen()
					console.log('submitted')
				}}
				onCancel={() => {
					setIsAddingCabeen(false)
					props.addCabeen('clear', 'clear')
				}}

				onError={() => {
					setIsType('normal')
					setIsAddingCabeen(true)
				}}
				onSuccessfully={() => {
					setIsType('normal')
					// setIsSuccessfully(false)
					setIsAddingCabeen(false)
					props.updateCabeens()
					props.addCabeen('clear', 'clear')
				}}
				onLocation={() => {
					if (isType === 'location'){
						setIsType('normal')
					}
					else {
						setIsType('location')
					}

				}}
				onImageSelect={() => {
					setIsType('imageSelect')
				}}
				onImageSelectCancel={() => {
					setIsType('normal')
					props.selectImages('clear', 'clear')
				}}
				onImageSelectOk={() => {
					console.log("Selected Images")
					setIsType('normal')
				}}
			/>
		</>
	)
}

class Discovery extends React.PureComponent{
	constructor(props) {
		super(props);
		this.state = {
			autocomplete: false,
			searchResults: {}
		}
	}

	async search(term){
		this.setState({autocomplete: false})
		this.props.showAutocomplete(this.state.autocomplete)
		let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/
		${term}.json?access_token=${token}&worldview=us`
		if (term.length > 2){
			await fetch(url)
				.then((resp) => resp.json())
				.then((results) => this.handleResponse(results))
				.catch((err) => console.log('An error occurred', err))
		}
	}

	handleResponse(results){
		if (results.features.length > 0){
			this.setState({
				autocomplete: true,
				searchResults: results
			})
			this.props.searchPlace(this.state.searchResults)
			this.props.showAutocomplete(this.state.autocomplete)
		}else {
			this.setState({autocomplete: false})
			this.props.showAutocomplete(this.state.autocomplete)
		}
	}

	render(){
		return(
			<>
				<View style={{
					flex: 1,
					backgroundColor: this.props.app.colors.background
				}}>
					<View style={{
						height: '100%'
					}}>
						<Map/>
					</View>
					<View style={{
						position: 'absolute',
						top: 10,
						left: 0,
						right: 0,
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						<FloatingSearchBar
							leftIcon={'filter'}
							rightIcon={'my-location'}
							placeholder={'enter location'}
							onChangeText={(value) => this.search(value)}
						/>

					</View>
					{
						this.props.map.autocomplete ?
							<View style={{
								position: 'absolute',
								top: 80,
								left: 0,
								right: 0
							}}>
								<AutoCompleteCard/>
							</View>: null
					}

					{
						this.props.map.overlay ?
							<View style={{
								position: 'absolute',
								bottom: 0,
								height: '50%',
								// backgroundColor: 'rgba(0,0,0,.1)'
							}}>
								<MapCabeen/>

							</View>: null
					}


				</View>
			</>
		)
	}
}


const mapStateToProps = state => {
	const {app,map, cabeen} = state;
	// console.log('state',map)
	return {app, map, cabeen}
}

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		searchPlace,
		showAutocomplete,
		showOverlay,
		getCabeenDetails,
		selectImages,
		addCabeen,
		updateCabeens

	}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Discover)

