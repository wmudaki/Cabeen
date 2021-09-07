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
import {ReactNativeFile} from "apollo-upload-client";
import {getCabeenDetails, selectImages, addCabeen, updateCabeens} from "../state/CabeenActions";
import Ionicons from "react-native-vector-icons/Ionicons";
import {red} from "react-native-reanimated/src/reanimated2/Colors";
import AddOptionsModal from "../modals/AddOptionsModal";



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
					<Ionicons
						name={'person-circle-outline'}
						size={36}
						color={props.app.colors.statusBar}
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
							uri: `${props.app.urls.cabeenImages}${item.item.images[0]}`
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
								fontSize: 20,
								color: props.app.colors.primaryText,
								// fontWeight: "bold",
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

function ActionButtons(props){
	return(
		<>
			<View style={{
				backgroundColor: 'white',
				height: '100%',
				width: '100%',
				padding: 20,
				paddingTop: 50,
				borderRadius: 20,
				elevation: 20
			}}>
				<TouchableOpacity
					style={{
						// backgroundColor: 'red',
						padding: 10,
						position: "absolute",

					}}
					onPress={props.onClose}>
					<Ionicons
						name={'close-circle'}
						size={40}
						color={'red'}

					/>

				</TouchableOpacity>
				<TouchableOpacity style={{
					backgroundColor: props.app.colors.statusBar,
					elevation: 5,
					borderRadius: 30,
					padding: 10,
					margin: 10,
					height: 50,
					width: '60%',
					alignSelf: 'center',
					alignItems: "center",
					justifyContent: "center",
					marginTop: 20
				}}>
					<Text style={{
						fontSize: 17,
						color: 'white',
						fontWeight: "bold"

					}}>
						Add Cabeen
					</Text>

				</TouchableOpacity>
				<TouchableOpacity style={{
					borderRadius: 25,
					backgroundColor: props.app.colors.buttonColor,
					margin: 10,
					padding: 10,
					paddingLeft: 15,
					paddingRight: 15,
					elevation: 5,
					height: 50,
					width: '60%',
					alignSelf: 'center',
					alignItems: "center",
					justifyContent: "center",

				}}>
					<Text style={{
						fontSize: 17,
						fontWeight: "bold",
						color: 'white'
					}}>
						Add Tour Package
					</Text>
				</TouchableOpacity>
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
			$admin: String,
			$images: [String],
			$files: [Upload!]!
		){
			createCabeen(
				files: $files
				input: {
					name: $name,
					type: $type,
					description: $description,
					price: $price,
					features: $features,
					currency: $currency,
					location: $location,
					admin: $admin,
					images: $images

				}
			){
				_id,
				name,
				price,
				location,
				type,
				features,
				description,
				admin,
				images,
			}
		}
	`
	
	const FETCH_CABEENS = 	gql`
		mutation FETCH_CABEENS(
			$admin: String
		){
			fetchCabeens(
				admin: $admin
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
	const SINGLE_UPLOAD = gql`
		mutation SINGLE_UPLOAD(
			$file: [Upload!]!
			$name: String
		){
			singleUpload(
				file: $file,
				name: $name
			){
				filename,
				encoding,
				mimetype
			}
		}
	`


	const [singleUpload] = useMutation(SINGLE_UPLOAD)
	const [isFetchingCabeens, setIsFetchingCabeens] = React.useState(false)
	const [hasFetchResults, setHasFetchResults] = React.useState(false)
	const [fetchResults, setFetchResults] = React.useState([])
	const [fetchCabeens] = useMutation(FETCH_CABEENS)

	const [isAddingCabeen, setIsAddingCabeen] = React.useState(false)
	const [isType, setIsType] = React.useState('normal')
	const [createCabeen] = useMutation(ADD_CABEEN)
	const [showActionButtons, setShowActionButtons] = React.useState(false)

	const addCabeen = () => {
		setIsType('loading')
		// console.log(props.cabeen.cabeenInfo)
		let fileList = []
		props.cabeen.cabeenImages.map((value, index) => {
			let file = new ReactNativeFile({
				name: value.image.filename,
				type: value.type,
				uri: value.image.uri,
			})
			fileList.push(file)
		})

		createCabeen({variables: {
				name: props.cabeen.cabeenInfo.name,
				type: props.cabeen.cabeenInfo.type,
				features: props.cabeen.cabeenInfo.features,
				description: props.cabeen.cabeenInfo.description,
				price: props.cabeen.cabeenInfo.price,
				currency: props.cabeen.cabeenInfo.currency,
				location: props.cabeen.cabeenInfo.location,
				admin: props.app.currentUser.user._id,
				files: fileList
			}})
			.then((res) => {
				setIsType('success')
				// setIsCreatingCabeen(false)
			})
			.catch(error => {
				// console.log('An error occurred while uploading', JSON.stringify(error, null, 2))
				setIsType('error')
			})
	}

	const getCabeens = () => {
		setIsFetchingCabeens(true)
		fetchCabeens({variables: {
			admin: props.app.currentUser.user._id
			}})
			.then((res) => {
				setIsFetchingCabeens(false)
				setHasFetchResults(true)
				setFetchResults(res.data.fetchCabeens)
			})
			.catch((err) => {
				// console.log("Error occurred",err)
				setIsFetchingCabeens(false)
			})
	}

	function uploadImage(){
		// console.log(props.cabeen.cabeenImages[0])
		let fileList = []
		props.cabeen.cabeenImages.map((value, index) => {
			let file = new ReactNativeFile({
				name: value.image.filename,
				type: value.type,
				uri: value.image.uri,
			})
			fileList.push(file)
		})


		console.log(fileList)
		singleUpload({variables:{
			file: fileList,
			name: "MUDACHI"
			}})
			.then((res) => {
				console.log('Successfully uploaded', res.data.singleUpload)
			})
			.catch(error => console.log('An error occurred while uploading', JSON.stringify(error, null, 2)))
	}

	React.useEffect(() => {
		getCabeens()
	}, [isType, props.cabeen.updateCabeens])

	return(
		<>
			<View style={{
				flex: 1,
				backgroundColor: props.app.colors.background
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

				{
					!showActionButtons ?
						<View style={{
							position: "absolute",
							bottom: 100,
							right: 5

						}}>
							<FloatingActionButton
								onPress={() => {
									// setIsAddingCabeen(true)
									setShowActionButtons(true)
								}}
							/>
						</View>: null
				}

			</View>
			<AddOptionsModal
				modalVisible={showActionButtons}
				onRequestClose={() => {
					setShowActionButtons(false)
				}}
				onClose={() =>  {
					setShowActionButtons(false)
				}}
				onAddCabeen={() => {
					setShowActionButtons(false)
					setIsAddingCabeen(true)
				}}
			/>
			<CabeenAddModal
				modalVisible={isAddingCabeen}
				isType={isType}
				// isError={isError}
				onRequestClose={() => {
					setIsAddingCabeen(false)
				}}
				onSubmit={() => {
					// uploadImage()
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

