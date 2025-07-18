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
					onPress={this.props.onPress}
					style={{
						backgroundColor: this.props.app.colors.whiteText,
						width: this.props.vertical ? 0.8*width: 0.8*width,
						borderRadius: 10,
						elevation: this.props.vertical ? 5: 5,
						margin:10,
						borderBottomRightRadius: 10,
						borderBottomLeftRadius: 10,
						height: this.props.vertical ? 0.5*height:0.5*height,
						alignSelf: 'center'
					}}>
					<Image
						style={{
							height: '60%',
							width: '100%',
							backgroundColor: this.props.app.colors.background,
							borderTopLeftRadius: 10,
							borderTopRightRadius: 10,
						}}
						source={{
							uri: `${this.props.app.urls.cabeenImages}${this.props.images[0]}`
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
							{this.props.name}
						</Text>
						<View style={{
							flexDirection: 'row',
							// justifyContent: 'center',
							alignItems: 'center',
							margin: 5,
						}}>
							<Ionicons
								name={'location-outline'}
								size={20}
								color={this.props.app.colors.statusBar}
							/>
							<Text
								numberOfLines={1}
								style={{
									fontSize: 18,
									marginLeft: 10,
									flex: 0.96,
									color: this.props.app.colors.primaryText
								}}>
								{this.props.location}
							</Text>
						</View>
						<View style={{
							flexDirection: "row",
							alignItems: 'center',
							margin: 5
						}}>
							<Ionicons
								name={'bed-outline'}
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
								{this.props.type}
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
								<MaterialCommunityIcons
									name={'cash-multiple'}
									size={22}
									color={this.props.app.colors.statusBar}
								/>
								<Text
									numberOfLines={1}
									style={{
										fontSize: 18,
										marginLeft: 10,
										color: this.props.app.colors.primaryText
									}}>
									{this.props.price} KES / Night
								</Text>
							</View>
							{/*<TouchableOpacity*/}
							{/*	onPress={() => this.setState({*/}
							{/*		liked: !this.state.liked*/}
							{/*	})}*/}
							{/*	style={{*/}
							{/*	alignItems: 'center',*/}
							{/*	justifyContent: 'center',*/}
							{/*	marginRight: 10,*/}
							{/*}}>*/}
							{/*	<Fontisto*/}
							{/*		name={this.state.liked ?*/}
							{/*			'heart': 'heart-alt'}*/}
							{/*		size={20}*/}
							{/*		color={!this.state.liked ?*/}
							{/*			this.props.app.colors.statusBar:*/}
							{/*			this.props.app.colors.errorText*/}
							{/*		}*/}
							{/*	/>*/}
							{/*</TouchableOpacity>*/}

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
					backgroundColor: this.props.app.colors.whiteText,
					margin: 10,
					borderRadius: 10,
					elevation: 10
				}}>
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
							{this.props.tenantName}
						</Text>
					</View>
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
							{this.props.houseLabel}
						</Text>
					</View>
					<View style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: 'flex-end',
						margin: 10,
						padding: 10,

					}}>
						{/*<TouchableOpacity style={{*/}
						{/*	flexDirection: "row",*/}
						{/*	alignItems: "center",*/}
						{/*	borderWidth: 1,*/}
						{/*	borderRadius: 10,*/}
						{/*	padding: 5,*/}
						{/*	width: '40%',*/}
						{/*	justifyContent: "center"*/}
						{/*}}>*/}
						{/*	<Ionicons*/}
						{/*		name={'mail'}*/}
						{/*		size={20}*/}
						{/*	/>*/}
						{/*	<Text style={{*/}
						{/*		marginLeft: 10*/}
						{/*	}}>*/}
						{/*		Message*/}
						{/*	</Text>*/}
						{/*</TouchableOpacity>*/}
						<TouchableOpacity
							onPress={() => this.props.onRemovePress(this.props._id)}
							style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							// borderWidth: 1,
							borderRadius: 25,
							padding: 7,
							width: '40%',
							height: 45,
							elevation: 5,
							backgroundColor: this.props.app.colors.errorText
						}}>
							<Ionicons
								name={'trash'}
								size={20}
							/>
							<Text style={{
								marginLeft: 10
							}}>
								Remove
							</Text>
						</TouchableOpacity>
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
