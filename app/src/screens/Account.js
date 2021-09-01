/**
 * The file contains the classes and functions that
 *
 * implement and create the User account screen
 *
 * */
import * as React from "react";
import {
	Dimensions,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {BackButtonTopNavBar} from "../components/NavBars";
import { FloatingActionButton } from "../components/Buttons";
import Carousel from "react-native-snap-carousel";
import CabeenCard from "../components/Cards";
import { Actions } from "react-native-router-flux";
import ProfileEditModal from "../modals/ProfileEditModal";
import {useMutation, gql} from "@apollo/client";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
// import {editProfile} from "../state/AppActions";
import {authenticate, setProfileEditInfo} from "../state/AppActions";
import PrivacyModal from "../modals/PrivacyModal";



const {height,width} = Dimensions.get('window')

function AccountProfile(props){
	const EDIT_PROFILE = gql`
		mutation EDIT_PROFILE(
			$_id: ID
			$fullName: String,
			$email: String,
			$phone: String,
#			$avatar: String,
		){
			updateUser(
				_id: $_id,
				input: {
					fullName: $fullName,
					email: $email,
					phone: $phone,
#					avatar: $avatar
				}
			){
				_id,
				fullName,
				email,
				phone,
			}
		}
	`
	const [updateUser] = useMutation(EDIT_PROFILE)
	const [isEditingProfile, setIsEditingProfile] = React.useState(false)
	const [isType, setIsType] = React.useState('normal')

	const editProfile = () => {
		// console.log(props.app.editProfile)
		// console.log(props.app.currentUser.user._id)
		setIsType('loading')
		updateUser({variables: {
			_id: props.app.currentUser.user._id,
				fullName: props.app.editProfile.name,
				phone: props.app.editProfile.phone,
				email: props.app.editProfile.email,
				// avatar: props.app.editProfile.avatar
			}})
			.then((res) => {
				// console.log(res)
				setIsType('success')
				props.authenticate('user', res.data.updateUser)
			})
			.catch(err => {
				setIsType('error')
				// console.log('Error', err)
			})
	}

	function profy(){
		props.setProfileEditInfo()
		setIsEditingProfile(true)

	}

	return(
		<>
			<View>
				<View
					// onPress={() => Actions.profileEdit()}
					style={{
						// alignItems: 'center',
						// justifyContent: 'center',
						margin: 20,
						marginTop:0
					}}>
					<View style={{
						borderBottomWidth: 5,
						marginTop: 20,
						borderBottomColor: props.app.colors.background,
					}}>
						<Text style={{
							color: 'black',
							fontSize: 30,
							fontWeight: 'bold',
							margin: 10
						}}>
							Profile
						</Text>
					</View>
					<View style={{
						marginTop: 10,
						margin: 10
					}}>
						<Text style={{
							color: props.app.colors.statusBar,
							fontSize: 20,
							fontWeight: "bold"
						}}>
							Name
						</Text>

						<Text style={{
							color:props.app.colors.primaryText,
							fontSize: 20,
							// fontWeight:"bold",
							margin: 10
						}}>
							{props.app.currentUser.user.fullName}
						</Text>
					</View>
					<View style={{
						margin: 10
					}}>

						<Text style={{
							fontSize: 20,
							fontWeight: "bold",
							color: props.app.colors.statusBar
						}}>
							Email
						</Text>
						<Text style={{
							color:props.app.colors.primaryText,
							fontSize: 20,
							// fontWeight: "bold",
							margin: 5
						}}>
							{props.app.currentUser.user.email}
						</Text>
					</View>
					<View style={{
						margin: 10
					}}>
						<Text style={{
							fontSize: 20,
							fontWeight: "bold",
							color: props.app.colors.statusBar
						}}>
							Phone
						</Text>

						<Text style={{
							color:props.app.colors.primaryText,
							fontSize: 20,
							margin: 5
						}}>
							{props.app.currentUser.user.phone}
						</Text>
					</View>
					<TouchableOpacity
						onPress={() => profy()}
						style={{
						borderWidth: 2,
						padding: 10,
						marginTop: 20,
						borderRadius: 25,
						paddingLeft: 15,
						paddingRight: 15,
						alignSelf: 'center',
						flexDirection: "row",
						alignItems: 'center',
						borderColor: props.app.colors.statusBar
					}}>
						<SimpleLineIcons
							name={'pencil'}
							size={18}
							color={props.app.colors.statusBar}
						/>

						<Text style={{
							fontSize: 18,
							marginLeft: 10,
							color: props.app.colors.statusBar
						}}>
							Edit profile
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<ProfileEditModal
				modalVisible={isEditingProfile}
				isType={isType}
				// isError={isError}
				onRequestClose={() => {
					setIsEditingProfile(false)
				}}
				onSubmit={() => {
					editProfile()
					console.log('submitted')
				}}
				onCancel={() => {
					setIsEditingProfile(false)
				}}

				onError={() => {
					setIsType('normal')
					setIsEditingProfile(true)
				}}
				onSuccessfully={() => {
					setIsType('normal')
					// setIsSuccessfully(false)
					setIsEditingProfile(false)
				}}
			/>
		</>
	)
}

function CabeenInfo (props){
	return(
		<>
			<View>
				<View style={{
					justifyContent: "space-between",
					margin: 10
				}}>
					<View style={{
						flexDirection: "row",
						justifyContent: "space-around",
						margin: 10,
					}}>
						<Text style={{
							// margin: 10,
							fontWeight: "bold",
							fontSize: 25
						}}>
							Cabeens
						</Text>
						<Text style={{
							fontSize: 25

						}}>
							0
						</Text>
					</View>
					<TouchableOpacity style={{
						borderWidth: 2,
						padding: 5,
						width: '50%',
						height: 40,
						margin: 10,
						justifyContent: "center",
						alignItems:"center",
						alignSelf:"center",
						borderRadius: 30,
						paddingLeft: 10,
						paddingRight: 10,
						borderColor: props.app.colors.statusBar
					}}>
						<Text>
							add cabeen
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	)
}

function Privacy(props){

	const [isPrivacyModal, setIsPrivacyModal] = React.useState(false)

	return(
		<>
			<View style={{
				margin: 20
			}}>
				<View style={{
					borderBottomWidth: 5,
					borderBottomColor: props.app.colors.background,
					marginTop: 0,
				}}>
					<Text style={{
						color: 'black',
						fontSize: 30,
						margin: 10,
						fontWeight: 'bold'
					}}>
						Privacy
					</Text>
				</View>
				<TouchableOpacity
					onPress={()  => setIsPrivacyModal(true)}
					style={{
					margin: 15
				}}>
					<Text style={{
						fontSize: 20
					}}>
						Privacy policy
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setIsPrivacyModal(true)}
					style={{
					margin: 15
				}}>
					<Text style={{
						fontSize: 20
					}}>
						Terms of Use
					</Text>
				</TouchableOpacity>

			</View>
			<PrivacyModal
				modalVisible={isPrivacyModal}
				onRequestClose={() => {
					setIsPrivacyModal(false)
				}}
				onOK={() => {
					setIsPrivacyModal(false)
				}}
			/>
		</>
	)
}

function Logout(props){
	const logout = () => {
		props.authenticate('logout', 'logout')
		// console.log('states', Actions.state.routes[0].routes[0].routeName)
		Actions.popTo(Actions.state.routes[0].routes[0].routeName)
		// Actions.reset()
	}

	return(
		<>
			<TouchableOpacity
				onPress={() => logout()}
				style={{
				backgroundColor: props.app.colors.buttonColor,
				margin: 10,
					marginBottom: 30,
				borderRadius: 55,
				marginTop: 30,
				elevation: 5,
				width: '70%',
				height: 55,
				alignSelf: 'center',
					alignItems: "center",
					justifyContent: 'center'
			}}>
				<Text style={{
					fontSize: 20,
					margin: 10,
					alignSelf: "center",
					fontWeight: "bold",
					color: props.app.colors.whiteText

				}}>
					SIGN OUT
				</Text>
			</TouchableOpacity>
		</>
	)
}

function Account(props){
	return(
		<>
			<BackButtonTopNavBar
				title={"Account"}
			/>
			<ScrollView>
				<AccountProfile
					{...props}
				/>
				<Privacy {...props}/>
				<Logout
					{...props}
				/>
			</ScrollView>
		</>
	)
}

class AccountAlpha extends React.PureComponent{
	renderProfile(){
		return(
			<>
				<View>
					<TouchableOpacity
						onPress={() => Actions.profileEdit()}
						style={{
						alignItems: 'center',
						justifyContent: 'center',
						margin: 20
					}}>
						<Image
							style={{
								height: 150,
								width: 150,
								borderRadius: 100,
								backgroundColor: this.props.app.colors.primaryText
							}}
							source={{
								uri: 'photo'
							}}/>
						<Text style={{
							color: this.props.app.colors.statusBar,
							fontSize: 25,
							fontWeight:"bold",
							margin: 10
						}}>
							Username
						</Text>
					</TouchableOpacity>
				</View>
			</>
		)
	}

	_renderCabeenItem(item){
		return(
			<>
				<CabeenCard
					item={item.item}
				/>
			</>
		)
	}

	renderCabeen(title){
		return(
			<>
				<View>
					<Text style={{
						fontWeight: 'bold',
						fontSize: 25,
						marginLeft: 20,
						margin: 5,
						color: this.props.app.colors.statusBar
					}}>
						{title}
					</Text>
					<Carousel
						data={[1,2,3,4,5,6]}
						renderItem={(item) => this._renderCabeenItem(item)}
						sliderWidth={width}
						itemWidth={0.85*width}
					/>
				</View>
			</>
		)
	}


	render(){
		return(
			<>
				<View>
					<BackButtonTopNavBar
						title={"Account"}
						// icon={'ellipsis-vertical'}
					/>
				</View>
				<ScrollView style={{
					flex: 1,
					backgroundColor: this.props.app.colors.whiteText
				}}>
					<View style={{
						borderBottomWidth: 2,
						borderColor: this.props.app.colors.secondaryText
					}}>
						{this.renderProfile()}
					</View>
					<View>
						{this.renderCabeen('Your Cabeens')}
					</View>
					<View>
						{this.renderCabeen("Cabeens you love")}
					</View>
				</ScrollView>
				<View style={{
					position: "absolute",
					bottom: 30,
					right: 20,
				}}>
					<FloatingActionButton
						onPress={() => Actions.cabeenAdd()}
					/>
				</View>
			</>
		)
	}
}


const mapStateToProps = state => {
	const {app} = state;
	return {app}
}

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		// editProfile
		authenticate,
		setProfileEditInfo

	}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Account)
