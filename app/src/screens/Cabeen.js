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
							height: 320,
							borderRadius: 20,
							marginTop: 10
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
						marginTop: 30
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
								numberOfLines={1}
								style={{
									fontSize: 22,
									margin: 10,
									marginTop: 10,
									color: this.props.app.colors.primaryText
								}}>
								Kasarani
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
							<Ionicons
								name={"cash-outline"}
								size={25}
							/>
							<Text
								numberOfLines={1}
								style={{
									fontSize: 22,
									margin: 10,
									marginTop: 10,
									color: this.props.app.colors.primaryText
								}}>
								200 KES / Night
							</Text>
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

							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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
					<BackButtonTopNavBar
						title={'Acacia apartments'}
					/>
				</View>

				<ScrollView
					style={{
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
							itemWidth={this.props.app.portrait ?0.98* width: 0.98*height}
						/>
					</View>
					<View style={{
						marginBottom: 100
					}}>
						{this.renderDescription()}

					</View>
				</ScrollView>
				<View style={{
					// margin: 10,
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					padding:10,
					backgroundColor: this.props.app.colors.whiteText
				}}>
					{this.renderButtons()}
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
		agreeToTerms,
		rotate

	}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Cabeen)
