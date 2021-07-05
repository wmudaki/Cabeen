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
						height: 0.5*height,
						alignSelf: 'center'

					}}>
					<Image
						style={{
							height: '60%',
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
								fontSize: 22,
								color: this.props.app.colors.primaryText
							}}>
							{this.props.item}
						</Text>
						<View style={{
							flexDirection: 'row',
							// justifyContent: 'center',
							alignItems: 'center',
							margin: 5,
						}}>
							<Ionicons
								name={'location'}
								size={20}
								color={this.props.app.colors.statusBar}
							/>
							<Text
								numberOfLines={1}
								style={{
									fontSize: 18,
									marginLeft: 10,
									color: this.props.app.colors.primaryText
								}}>
								Kiambu
							</Text>
						</View>
						<View style={{
							flexDirection: "row",
							alignItems: 'center',
							margin: 5
						}}>
							<MaterialCommunityIcons
								name={'bed'}
								size={20}
								color={this.props.app.colors.statusBar}
							/>
							<Text
								numberOfLines={1}
								style={{
									color: this.props.app.colors.primaryText,
									fontSize: 18,
									marginLeft: 10
								}}>
								2 Bedroom
							</Text>

						</View>

						<View style={{
							alignItems: 'center',
							flexDirection: 'row',
							justifyContent: "space-between",
							margin: 5
						}}>
							<View style={{
								flexDirection: "row",
								alignItems: "center"
							}}>
								<Ionicons
									name={'cash-outline'}
									size={20}
									color={this.props.app.colors.statusBar}
								/>
								<Text
									numberOfLines={1}
									style={{
										fontSize: 18,
										marginLeft: 10,
										color: this.props.app.colors.primaryText
									}}>
									1200 KES / Night
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
									size={20}
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


class TenantCardStateless extends React.PureComponent{
	render() {
		return(
			<>
				<TouchableOpacity style={{
					backgroundColor: this.props.app.colors.background,
					margin: 10,
					borderRadius: 10,
					elevation: 10
				}}>
					<View style={{
						flexDirection: "row",
						// justifyContent: "space-evenly",
						alignItems: 'center'
					}}>
						<Text style={{
							color: this.props.app.colors.secondaryText,
							fontSize: 20,
							margin: 20
						}}>
							House:
						</Text>
						<Text style={{
							fontSize: 20,
							fontWeight: "bold"
						}}>
							2003
						</Text>
					</View>
					<View style={{
						flexDirection: "row",
						alignItems: 'center',

					}}>
						<Text style={{
							color: this.props.app.colors.secondaryText,
							fontSize: 20,
							margin: 20
						}}>
							Tenant:
						</Text>
						<Text style={{
							fontSize: 20,
							fontWeight: "bold"
						}}>
							Wilson Mudaki
						</Text>
					</View>
					<View style={{
						flexDirection: "row",
						alignItems: 'center'
					}}>
						<Text style={{
							fontSize: 20,
							margin: 20,
							color: this.props.app.colors.secondaryText
						}}>
							Payment status:
						</Text>
						<Text style={{
							fontWeight: 'bold',
							fontSize: 20,

						}}>
							Paid
						</Text>
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

const TenantCard = connect(mapStateToProps, mapDispatchToProps)(TenantCardStateless)
export default connect(mapStateToProps, mapDispatchToProps)(CabeenCard)
export {TenantCard}
