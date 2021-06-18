/**
 * The file contains classes and functions that
 *
 * create card components for the application
 *
 * */
import * as React from 'react';
import {
	Dimensions,
	Image, Text,
	TouchableOpacity,
	View,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";

const {height,width} = Dimensions.get('window')

class CabeenCard extends React.PureComponent{
	constructor(props) {
		super(props);
		this.state = {
			liked: false
		}
	}

	render(){
		return(
			<>
				<TouchableOpacity
					onPress={() => Actions.cabeen()}
					style={{
						backgroundColor: this.props.app.colors.whiteText,
						width: 0.85*width,
						borderRadius: 20,
						elevation: 20,
						margin:40,
						height: 0.45*height,
						alignSelf: 'center'

					}}>
					<Image
						style={{
							height: '55%',
							width: '100%',
							borderTopLeftRadius: 20,
							borderTopRightRadius: 20
						}}
						source={{
							uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.BEyMW2mX7ojl1e1TQo4vPwHaE8%26pid%3DApi&f=1'
						}}/>
					<View style={{
						margin: 5
					}}>
						<Text
							numberOfLines={1}
							style={{
								fontWeight: 'bold',
								fontSize: 19,
								color: this.props.app.colors.primaryText
							}}>
							{this.props.item}
						</Text>
						<View style={{
							flexDirection: 'row',
							// justifyContent: 'center',
							alignItems: 'center'
						}}>
							<Ionicons
								name={'location-outline'}
								size={17}
								color={this.props.app.colors.statusBar}
							/>
							<Text
								numberOfLines={1}
								style={{
									fontSize: 16,
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
								size={18}
								color={this.props.app.colors.statusBar}
							/>
							<Text
								numberOfLines={1}
								style={{
									color: this.props.app.colors.greyText,
									fontSize: 16,
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
									size={16}
									color={this.props.app.colors.statusBar}
								/>
								<Text
									numberOfLines={1}
									style={{
										fontSize: 15,
										margin: 5,
										fontWeight: 'bold',
										color: this.props.app.colors.greyText
									}}>
									1200 KES
								</Text>
							</View>
							<TouchableOpacity
								onPress={() => this.setState({
									liked: !this.state.liked
								})}
								style={{
								alignItems: 'center',
								justifyContent: 'center',
								marginRight: 10,
							}}>
								<Fontisto
									name={this.state.liked ?
										'heart': 'heart-alt'}
									size={25}
									color={!this.state.liked ?
										this.props.app.colors.statusBar:
										this.props.app.colors.errorText
									}
								/>
							</TouchableOpacity>

						</View>
					</View>

				</TouchableOpacity>
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

	}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(CabeenCard)
