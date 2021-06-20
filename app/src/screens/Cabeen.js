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

const {height,width} = Dimensions.get('window')

class Cabeen extends React.PureComponent{
	constructor(props) {
		super(props);
		this.orient()
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
						style={{
							width: '100%',
							height: 300,
							borderRadius: 30,
						}}
						source={{
						uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.FQSBiW8u9KfG4dGxeIkDogHaE8%26pid%3DApi&f=1'
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
							fontSize: 23,
							color: this.props.app.colors.primaryText
						}}>
						Acacia apartments
					</Text>
					<View style={{
						flexDirection: 'row',
						// justifyContent: 'center',
						alignItems: 'center'
					}}>
						<Ionicons
							name={'location-outline'}
							size={20}
							color={this.props.app.colors.statusBar}
						/>
						<Text
							numberOfLines={1}
							style={{
								fontSize: 20,
								margin: 5,
								color: this.props.app.colors.greyText
							}}>
							Kasarani
						</Text>
					</View>
					<View style={{
						flexDirection: "row",
						alignItems: 'center'
					}}>
						<MaterialCommunityIcons
							name={'home-roof'}
							size={20}
							color={this.props.app.colors.statusBar}
						/>
						<Text
							// numberOfLines={1}
							style={{
								color: this.props.app.colors.greyText,
								fontSize: 20,
								margin: 5
							}}>
							2 bedroom
						</Text>

					</View>


					<View style={{
						alignItems: 'center',
						flexDirection: 'row',
						justifyContent: "space-between"
					}}>
						<View style={{
							flexDirection: "row",
							alignItems: "center"
						}}>
							<Ionicons
								name={'pricetag'}
								size={20}
								color={this.props.app.colors.statusBar}
							/>
							<Text
								// numberOfLines={1}
								style={{
									fontSize: 20,
									margin: 5,
									fontWeight: 'bold',
									color: this.props.app.colors.greyText
								}}>
								1200 KES
							</Text>
						</View>
					</View>
					<View style={{
						margin: 10
					}}>
						<Text style={{
							fontSize: 20,
							color: this.props.app.colors.primaryText
						}}>
							A short description
						</Text>
					</View>
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
								name={'directions'}
								size={25}
								color={this.props.app.colors.statusBar}
							/>
							<Text style={{
								color: this.props.app.colors.statusBar,
								fontSize: 20
							}}>
								Directions
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							// onPress={() => Actions.login()}
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
								Reserve
							</Text>
						</TouchableOpacity>
					</View>


				</View>
			</>
		)
	}

	render(){
		return(
			<>
				<ScrollView style={{
					flex: 1,
					backgroundColor: this.props.app.colors.whiteText
				}}>
					<View>
						<BackButtonTopNavBar
							title={'Acacia apartments'}
							icon={'heart-outline'}
						/>
					</View>
					<View style={{
						marginTop: 0,
						paddingTop: 30,
						paddingBottom: 30,
						borderBottomWidth:2,
						borderColor:this.props.app.colors.background,
						backgroundColor: this.props.app.colors.background
					}}>
						<Carousel
							data={[1,2,3,4,5]}
							renderItem={() => this.renderCabeenImages()}
							sliderWidth={this.props.app.portrait ?width: height}
							itemWidth={this.props.app.portrait ? 0.85*width: 0.85*height}
						/>
					</View>
					<View>
						{this.renderDescription()}
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
