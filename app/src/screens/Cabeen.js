/**
 *
 * The file contains the classes and functions that
 *
 * implement a detailed individual cabeen screen
 *
 * */
import * as React from "react";
import {
	View,
	Image,
	TouchableOpacity,
	Text,
	ScrollView,
	Dimensions, FlatList,
} from "react-native";
import { bindActionCreators } from "redux";
import { agreeToTerms } from "../state/AppActions";
import { connect } from "react-redux";
import {BackButtonTopNavBar} from "../components/NavBars";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { HalfWidthButton } from "../components/Buttons";
import { Actions } from "react-native-router-flux";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Carousel from "react-native-snap-carousel";
import { rotate } from "../state/AppActions";
import Account from "./Account";
import CabeenEditModal from "../modals/CabeenEditModal";
import {gql, useMutation} from "@apollo/client";
import CabeenDeleteModal from "../modals/CabeenDeleteModal";
import {
	updateCabeens,
	setEditInfo,
	setAccessLevel,
	findContactPerson,
	likeCallback} from "../state/CabeenActions";
import ContactModal from "../modals/ContactModal";
import AntDesign from "react-native-vector-icons/AntDesign";

const {height,width} = Dimensions.get('window')

function CabeenButtons(props) {

	const EDIT_CABEEN = gql`
		mutation EDIT_CABEEN(
			$_id: ID,
			$name: String,
			$type: String,
			$features: String,
			$description: String,
			$price: String,
			$currency: String,
			$location: String,
			$likes: [String]
		){
			updateCabeen(
				_id: $_id,
				input: {
					name: $name,
					type: $type,
					description: $description,
					features: $features,
					price: $price,
					currency: $currency,
					location: $location
					likes: $likes

				}
			){
				_id,
				name,
				features,
				price,
				location,
				description,
				likes
			}
		}
	`

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
	const [editCabeen] = useMutation(EDIT_CABEEN)
	const [isEditingCabeen, setIsEditingCabeen] = React.useState(false)
	const [isType, setIsType] = React.useState('normal')
	const [accessLevel, setAccessLevel] = React.useState('manager')
	const [showContact, setShowContact] = React.useState(false)
	const [contactType, setContactType] = React.useState('normal')

	const edit = () => {
		console.log(props.cabeen.cabeenEditInfo)
		setIsType('loading')
		editCabeen({variables: {
				_id: props.cabeen.cabeenDetails._id,
				name: props.cabeen.cabeenEditInfo.name,
				features: props.cabeen.cabeenEditInfo.features,
				type: props.cabeen.cabeenEditInfo.type,
				description: props.cabeen.cabeenEditInfo.description,
				price: props.cabeen.cabeenEditInfo.price,
				currency: props.cabeen.cabeenEditInfo.currency,
				location: props.cabeen.cabeenEditInfo.location,
			}})
			.then((res) => {
				// console.log("Edited success", res)
				setIsType('successful')
			})
			.catch((err) => {
				// console.log("Error editing", err)
				setIsType('error')
			})

	}

	function getUser() {
		setShowContact(true)
		setContactType('loading')
		fetchUser({variables: {
			_id: props.cabeen.cabeenDetails.admin
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

	function like(){
		return(
			<>
				<AntDesign
					name={props.cabeen.cabeenDetails.likes.includes(props.app.currentUser.user._id) ? 'heart': 'hearto'}
					size={25}
					color={props.cabeen.cabeenDetails.likes.includes(props.app.currentUser.user._id) ? 'red': 'black'}
				/>
			</>
		)
	}

	function likeExecute(){
		if (props.cabeen.cabeenDetails.likes.includes(props.app.currentUser.user._id)){
			props.likeCallback('unlike', props.app.currentUser.user._id)
		}
		else props.likeCallback('like', props.app.currentUser.user._id)

		editCabeen({variables:{
				_id: props.cabeen.cabeenDetails._id,
				likes: props.cabeen.cabeenDetails.likes
			}})
			.then((res) => {
				props.updateCabeens()
				// console.log('Successful', res.data)
			})
			.catch(error => {
				// console.log('An error occurred',error)
			})
	}



	return(
		<>
			<View style={{
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
				marginTop: 20
			}}>
				<TouchableOpacity
					onPress={() => {
						props.cabeen.cabeenDetails.admin === props.app.currentUser.user._id ? setIsEditingCabeen(true) : likeExecute()
						props.setEditInfo()
					}}
					style={{
						borderWidth: 2,
						flexDirection:"row",
						alignItems: 'center',
						justifyContent:'space-evenly',
						borderRadius: 30,
						width: '47%',
						height: 50,
						borderColor: props.cabeen.cabeenDetails.admin === props.app.currentUser.user._id ? props.app.colors.statusBar: props.cabeen.cabeenDetails.likes.includes(props.app.currentUser.user._id) ? 'red': props.app.colors.statusBar,
					}}>
					{
						props.cabeen.cabeenDetails.admin === props.app.currentUser.user._id ?
							<SimpleLineIcons
								name={'pencil'}
								size={25}
								color={props.app.colors.statusBar}
							/>:
							like()
					}
					<Text style={{
						color: props.cabeen.cabeenDetails.admin === props.app.currentUser.user._id ? props.app.colors.statusBar: props.cabeen.cabeenDetails.likes.includes(props.app.currentUser.user._id) ? 'red': props.app.colors.statusBar,
						fontSize: 20
					}}>
						{props.cabeen.cabeenDetails.admin === props.app.currentUser.user._id? 'Edit': props.cabeen.cabeenDetails.likes.includes(props.app.currentUser.user._id) ? 'Loved': 'Love'}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => props.cabeen.cabeenDetails.admin === props.app.currentUser.user._id ?
						Actions.cabeenManagement(): getUser()}
					style={{
						// flex: 1,
						alignItems: 'center',
						backgroundColor: props.app.colors.buttonColor,
						width: '47%',
						height: 50,
						borderRadius: 30,
						elevation: 2,
						justifyContent:'center'
					}}>
					<Text style={{
						color: props.app.colors.whiteText,
						fontWeight: 'bold',
						fontSize: 20
					}}>
						{props.cabeen.cabeenDetails.admin === props.app.currentUser.user._id ? 'Manage': 'Contact'}
					</Text>
				</TouchableOpacity>
			</View>
			<CabeenEditModal
				modalVisible={isEditingCabeen}
				isType={isType}
				// isError={isError}
				onRequestClose={() => {
					setIsEditingCabeen(false)
				}}
				onSubmit={() => {
					edit()
					console.log('submitted')
				}}
				onCancel={() => {
					setIsEditingCabeen(false)
				}}

				onError={() => {
					setIsType('normal')
					setIsEditingCabeen(true)
				}}
				onSuccessfully={() => {
					setIsType('normal')
					// setIsSuccessfully(false)
					setIsEditingCabeen(false)
					props.updateCabeens()
					Actions.pop()
				}}
			/>
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

function Navigation(props) {

	const DELETE_CABEEN = gql`
		mutation DELETE_CABEEN(
			$_id: ID,
		){
			deleteCabeen(
				_id: $_id
			){
				name 
			}
		}
	`
	const [deleteCabeen] = useMutation(DELETE_CABEEN)
	const [isDeletingCabeen, setIsDeletingCabeen] = React.useState(false)
	const [isType, setIsType] = React.useState('normal')

	const removeCabeen = () => {
		console.log(props.cabeen.cabeenDetails)
		setIsType('loading')
		deleteCabeen({variables: {
			_id: props.cabeen.cabeenDetails._id
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
				title={props.cabeen.cabeenDetails.name}
				icon={'trash-outline'}
				isManager={props.cabeen.cabeenDetails.admin === props.app.currentUser.user._id}
				onIconPress={() => {
					setIsDeletingCabeen(true)
				}}
			/>
			<CabeenDeleteModal
				modalVisible={isDeletingCabeen}
				isType={isType}
				// isError={isError}
				onRequestClose={() => {
					setIsDeletingCabeen(false)
				}}
				onSubmit={() => {
					removeCabeen()
					console.log('submitted')
				}}
				onCancel={() => {
					setIsDeletingCabeen(false)
				}}

				onError={() => {
					setIsType('normal')
					setIsDeletingCabeen(true)
				}}
				onSuccessfully={() => {
					setIsType('normal')
					setIsDeletingCabeen(false)
					props.updateCabeens()
					Actions.pop()
				}}
			/>

		</>
	)
}

function CabeenFeatures(props){

	function _renderItem(item){
		return(
			<>
				<TouchableOpacity
					// onPress={() => {
					//     // setSelected(item.item)
					// }}
					style={{

						flex: 1,
						padding: 5,
						paddingTop: 10,
						paddingBottom: 10,
						elevation: 3,
						margin : 5,
						borderRadius: 10,
						backgroundColor: props.app.colors.whiteText,
						// borderColor: props.app.colors.background,
						alignItems: "center",
						// justifyContent: "center"
					}}>
					<Text

						style={{

						fontSize: 18,
						// fontWeight: "bold"
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
				margin: 10
			}}>
				<FlatList
					data={props.features}
					renderItem={_renderItem}
					numColumns={2}
					keyExtractor={(item, key) => item + key}
				/>

			</View>
		</>
	)
}

class Cabeen extends React.PureComponent{
	constructor(props) {
		super(props);
		this.orient()
		this.state ={
			isManager: true,
			currentIndex: 0,
			imageData: 0
		}
	}

	orient(){
		Dimensions.addEventListener('change',({window:{height,width}}) =>{
			if (width < height){
				this.props.rotate('portrait')
			} else {
				this.props.rotate('landscape')
			}

		})
	}

	renderCabeenImages(item){
		// console.log(`${this.props.app.urls.cabeenImages}${item.item}`)
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
							backgroundColor: this.props.app.colors.background,
							borderRadius: 10,
							borderBottomLeftRadius: 10,
							borderBottomRightRadius:10
						}}
						source={{
						uri: `${this.props.app.urls.cabeenImages}${item.item}`
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
							{this.state.currentIndex + 1} / {this.props.cabeen.cabeenDetails.images.length}
						</Text>
					</View>

				</View>
			</>
		)
	}

	renderDescription(){
		return(
			<>
				<View style={{
					margin: 10
				}}>
					<Text
						// numberOfLines={1}
						style={{
							fontWeight: 'bold',
							fontSize: 30,
							color: this.props.app.colors.primaryText
						}}>
						{this.props.cabeen.cabeenDetails.name}
					</Text>
					<View style={{
						marginTop: 30
					}}>
						<Text style={{
							fontWeight: "bold",
							fontSize: 25,
							color: this.props.app.colors.statusBar
						}}>
							Type
						</Text>
						<View style={{
							flexDirection: "row",
							alignItems: "center",
							margin: 10
						}}>
							<Ionicons
								name={"bed-outline"}
								size={25}
							/>
							<Text
								// numberOfLines={1}
								style={{
									fontSize: 22,
									margin: 10,
									marginTop: 10,
									color: this.props.app.colors.primaryText
								}}>
								{this.props.cabeen.cabeenDetails.type}
							</Text>
						</View>

					</View>
					<View style={{
						marginTop: 0
					}}>
						<Text style={{
							fontWeight: "bold",
							fontSize: 25,
							color: this.props.app.colors.statusBar
						}}>
							Location
						</Text>
						<View style={{
							flexDirection: "row",
							alignItems: "center",
							margin: 10
						}}>
							<Ionicons
								name={"location-outline"}
								size={25}
							/>
							<Text
								// numberOfLines={1}
								style={{
									fontSize: 22,
									margin: 10,
									marginTop: 10,
									color: this.props.app.colors.primaryText
								}}>
								{this.props.cabeen.cabeenDetails.location}
							</Text>
						</View>

					</View>
					<View style={{

					}}>
						<Text style={{
							fontWeight: "bold",
							fontSize: 25,
							color: this.props.app.colors.statusBar
						}}>
							Price
						</Text>

						<View style={{
							flexDirection: "row",
							alignItems: "center",
							margin: 10
						}}>
							<MaterialCommunityIcons
								name={"cash-multiple"}
								size={25}
							/>
							<Text
								// numberOfLines={1}
								style={{
									fontSize: 22,
									margin: 10,
									marginTop: 10,
									color: this.props.app.colors.primaryText
								}}>
								{this.props.cabeen.cabeenDetails.price} KES / Night
							</Text>
						</View>
					</View>
                    <View style={{

                    }}>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 25,
                            color: this.props.app.colors.statusBar
                        }}>
                            Features
                        </Text>

                        <View style={{
                            // flexDirection: "row",
                            // alignItems: "center",
                            margin: 0
                        }}>
                            <CabeenFeatures
								{...this.props}
								// features={[1,3,4,5,6,7]}
								features={this.props.cabeen.cabeenDetails.features.split(',')}
							/>
                        </View>
                    </View>
					<View style={{
						marginTop: 10,
						// flexDirection: 'row',
						// alignItems: 'center'
					}}>
						<Text style={{
							fontWeight: "bold",
							fontSize: 25,
							color: this.props.app.colors.statusBar
						}}>
							Description
						</Text>
						<Text
							// numberOfLines={7}
							style={{
								fontSize: 22,
								margin: 10,
								marginTop:10,
								color: this.props.app.colors.primaryText
							}}>
							{this.props.cabeen.cabeenDetails.description}
						</Text>
					</View>
				</View>
			</>
		)
	}

	renderButtons(){
		return(
			<>
				<View style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					marginTop: 20

					// bottom: 70
				}}>
					<TouchableOpacity
						// onPress={() => Actions.signup()}
						style={{
							borderWidth: 1,
							flexDirection:"row",
							alignItems: 'center',
							justifyContent:'space-evenly',
							borderRadius: 10,
							width: '47%',
							height: 50,
							borderColor: this.props.app.colors.statusBar,
						}}>
						<SimpleLineIcons
							name={!this.state.isManager ? 'directions': 'pencil'}
							size={25}
							color={this.props.app.colors.statusBar}
						/>
						<Text style={{
							color: this.props.app.colors.statusBar,
							fontSize: 20
						}}>
							{this.state.isManager ? 'Edit': 'Directions'}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => this.state.isManager ?
							Actions.cabeenManagement(): Actions.cabeenManagement()}
						style={{
							// flex: 1,
							alignItems: 'center',
							backgroundColor: this.props.app.colors.buttonColor,
							width: '47%',
							height: 50,
							borderRadius: 10,
							justifyContent:'center'
						}}>
						<Text style={{
							color: this.props.app.colors.whiteText,
							fontWeight: 'bold',
							fontSize: 20
						}}>
							{this.state.isManager? 'Manage': 'Reserve'}
						</Text>
					</TouchableOpacity>
				</View>
			</>
		)
	}

	render(){
		return(
			<>
				<View>
					<Navigation
						{...this.props}
					/>
				</View>
				<FlatList
					data={[1]}
					keyExtractor={(item, key) => item + key}
					renderItem={() => (
						<>
							<View style={{
								paddingBottom: 30,
							}}>
								<Carousel
									ref={(c) => this._carousel = c}
									data={this.props.cabeen.cabeenDetails.images}
									renderItem={(item) => this.renderCabeenImages(item)}
									sliderWidth={this.props.app.portrait ?width: height}
									itemWidth={this.props.app.portrait ?0.98* width: 0.98*height}
									onSnapToItem={(index) => {
										this.setState({
											currentIndex: index
										})
									}}
								/>
							</View>
							<View style={{
								marginBottom: 100
							}}>
								{this.renderDescription()}

							</View>
						</>
					)}
				/>
				<View style={{
					// margin: 10,
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					padding:10,
					backgroundColor: this.props.app.colors.whiteText
				}}>
					<CabeenButtons
						{...this.props}
					/>
				</View>
			</>
		)
	}
}


const mapStateToProps = state => {
	const {app, cabeen} = state;
	return {app,cabeen}
}

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		agreeToTerms,
		rotate,
		updateCabeens,
		setEditInfo,
		setAccessLevel,
		likeCallback,
		findContactPerson

	}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Cabeen)
