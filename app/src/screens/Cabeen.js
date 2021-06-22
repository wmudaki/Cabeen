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
	Dimensions,
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

const {height,width} = Dimensions.get('window')

class Cabeen extends React.PureComponent{
	constructor(props) {
		super(props);
		this.orient()
		this.state ={
			isManager: true
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

	renderCabeenImages(){
		return(
			<>
				<TouchableOpacity style={{
					elevation: 30
				}}>
					<Image
						resizeMethod={"scale"}
						style={{
							width: '100%',
							height: 350,
							// borderBottomLeftRadius:15,
							// borderBottomRightRadius:15
						}}
						source={{
						uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.hZBRkPchyD8tthZCC47YpQHaE9%26pid%3DApi&f=1'
					}}/>

				</TouchableOpacity>
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
						Acacia apartments
					</Text>
					<View style={{
						// flexDirection: 'row',
						// alignItems: 'center'
					}}>
						<Text style={{
							fontWeight: "bold",
							fontSize: 20,
							marginTop: 20
						}}>
							Type
						</Text>
						<Text
							numberOfLines={1}
							style={{
								fontSize: 20,
								margin: 20,
								marginTop:10,
								color: this.props.app.colors.greyText
							}}>
							Nightout
						</Text>
					</View>
					<View style={{
						// flexDirection: 'row',
						// alignItems: 'center'
					}}>
						<Text style={{
							fontWeight: "bold",
							fontSize: 20
						}}>
							Location
						</Text>
						<Text
							numberOfLines={1}
							style={{
								fontSize: 20,
								margin: 20,
								marginTop: 10,
								color: this.props.app.colors.greyText
							}}>
							Kasarani
						</Text>
					</View>
					<View style={{
						// flexDirection: 'row',
						// alignItems: 'center'
					}}>
						<Text style={{
							fontWeight: "bold",
							fontSize: 20
						}}>
							Size
						</Text>
						<Text
							numberOfLines={1}
							style={{
								fontSize: 20,
								margin: 20,
								marginTop:10,
								color: this.props.app.colors.greyText
							}}>
							2 bedroom
						</Text>
					</View>
					<View style={{
						// flexDirection: 'row',
						// alignItems: 'center'
					}}>
						<Text style={{
							fontWeight: "bold",
							fontSize: 20
						}}>
							Description
						</Text>
						<Text
							// numberOfLines={1}
							style={{
								fontSize: 20,
								margin: 20,
								marginTop:10,
								color: this.props.app.colors.greyText
							}}>

							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
						</Text>
					</View>
					<View style={{
						// flexDirection: 'row',
						// alignItems: 'center'
					}}>
						<Text style={{
							fontWeight: "bold",
							fontSize: 20
						}}>
							Price
						</Text>
						<Text
							numberOfLines={1}
							style={{
								fontSize: 20,
								margin: 20,
								marginTop:10,
								color: this.props.app.colors.greyText
							}}>
							2000 KES
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
							borderWidth: 2,
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
					<BackButtonTopNavBar
						title={'Acacia apartments'}
					/>
				</View>

				<ScrollView style={{
					flex: 1,
					backgroundColor: this.props.app.colors.whiteText
				}}>

					<View style={{
						paddingBottom: 30,
					}}>
						<Carousel
							data={[1,2,3,4,5]}
							renderItem={() => this.renderCabeenImages()}
							sliderWidth={this.props.app.portrait ?width: height}
							itemWidth={this.props.app.portrait ? width: height}
						/>
					</View>
					<View>
						{this.renderDescription()}

					</View>
					<View style={{
						margin: 10
					}}>
						{this.renderButtons()}
					</View>
				</ScrollView>
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
		agreeToTerms,
		rotate

	}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Cabeen)
