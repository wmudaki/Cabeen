/*
* The file contains functions and classes that implement
*
* the app's navigation bars/components
*
* */

import * as React from "react";
import {
	View,
	Text,
	TouchableOpacity
} from "react-native";
import {Actions} from "react-native-router-flux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";


class CustomTabBarStateless extends React.PureComponent{
	getIcon(key){
		const {state} = this.props.navigation;
		const activeTabIndex = state.index;

		if (key ===  'home'){
			if (state.routes[activeTabIndex].key === 'home'){
				return {'name':'home',
					'size' : 25,
					'color': this.props.app.colors.buttonColor,
					'label': 'home',
					'active': true
				}
			}
			else {
				return {'name':'home-outline',
					'size' : 25,
					'color': this.props.app.colors.statusBar,
					'label': 'home',
					'active': false
				}
			}
		}

		else if (key === 'find'){
			if (state.routes[activeTabIndex].key === 'find'){
				return {'name':'search',
					'size' : 28,
					'color': this.props.app.colors.buttonColor,
					'label': 'search',
					'active': true
				}
			}
			else {
				return {'name':'search',
					'size' : 25,
					'color': this.props.app.colors.statusBar,
					'label': 'find',
					'active': false
				}
			}
		}
		else if (key === 'discover'){
			if (state.routes[activeTabIndex].key === 'discover'){
				return {'name':'compass',
					'size' : 32,
					'color': this.props.app.colors.buttonColor,
					'label': 'discover',
					'active': true
				}
			}
			else {
				return {'name':'compass-outline',
					'size' : 32,
					'color': this.props.app.colors.statusBar,
					'label': 'discover',
					'active': false
				}
			}
		}
	}

	render(){
		const {state} = this.props.navigation;
		return(
			<View style={{
				// backgroundColor: this.props.app.colors.background,
				position: 'absolute',
				bottom: 0,
				right: 0,
				left: 0
			}}>
				<View style={{
					margin: 20,
					marginLeft: 40,
					marginRight: 40,
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					height: 60,
					backgroundColor: '#ffffff',
					borderRadius: 30,
					elevation: 10
				}}>
					{
						state.routes.map(elements => (
							<TouchableOpacity
								style={{
									justifyContent: 'center',
									alignItems: 'center',
									flexDirection: 'row',
									borderRadius: 50,
									margin: 6,
									borderWidth:this.getIcon(elements.key).active ? 2 : 0,
									borderColor: this.props.app.colors.buttonColor,
									elevation: this.getIcon(elements.key).active ?
										0: null,
									backgroundColor:this.getIcon(elements.key).active ?
										null : null
								}}
								key={elements.key}
								onPress={() => Actions[elements.key]()}
							>
								<Ionicons
									size={this.getIcon(elements.key).size}
									color={this.getIcon(elements.key).color}
									name={this.getIcon(elements.key).name}
									style={{ margin: 5}}
								/>
								{
									this.getIcon(elements.key).active ?
										<Text style={{
											color: this.getIcon(elements.key).color,
											margin: 5,
											marginRight: 15,
											fontWeight: 'bold',
											fontSize: 17
										}}>
											{this.getIcon(elements.key).label}
										</Text>
										: null
								}
							</TouchableOpacity>
						))
					}

				</View>
			</View>
		)
	}
}

class TopNavBarStateless extends React.PureComponent{
	render(){
		return(
			<>
				<View style={{
					height: 55,
					width: '90%',
					backgroundColor: this.props.app.colors.whiteText,
					borderRadius: 10,
					flexDirection: 'row',
					alignItems: 'center',
					alignSelf: "center",
					justifyContent:'space-between',
					padding: 5,
					elevation: 0
				}}>

					<View style={{
						margin: 5,
						justifyContent: "center",
						alignItems:"center"
					}}>
						<Text style={{
							fontSize: 25,
							fontWeight: 'bold',
							color: this.props.app.colors.statusBar
						}}>
							Notifications
						</Text>
					</View>
					<TouchableOpacity
						onPress={this.props.iconPress}
						style={{
						alignItems: 'center',
						justifyContent: 'center',
						margin: 5
					}}>
						<Ionicons
							name={'person-circle-outline'}
							size={36}
							color={this.props.app.colors.statusBar}
						/>
					</TouchableOpacity>


				</View>
			</>
		)
	}
}

class BackButtonTopNavBarStateless extends React.PureComponent{
	render(){
		return(
			<>
				<View style={{
					height: 60,
					width: '100%',
					flexDirection: 'row',
					backgroundColor: this.props.app.colors.whiteText,
					alignItems: 'center',
					elevation: 10,
					padding: 10,
					justifyContent: "space-between",
					margin: 0,
					// borderRadius: 10
				}}>
					<View style={{
						flexDirection:"row"
					}}>
						<TouchableOpacity
							style={{
								marginLeft: 10,
								marginRight: 10
							}}
							onPress={() => Actions.pop()}>
							<AntDesign
								name={'arrowleft'}
								size={28}
								color={this.props.app.colors.statusBar}
							/>
						</TouchableOpacity>
						<View style={{
							width: '78%'
						}}>
							<Text
								numberOfLines={1}
								style={{
								fontSize: 20,
								marginLeft: 10,
								fontWeight: 'bold',
								color: this.props.app.colors.statusBar
							}}>
								{this.props.title}
							</Text>
						</View>
					</View>
					<TouchableOpacity
						onPress={this.props.onIconPress}
						style={{
						alignItems: 'center',
						justifyContent: 'center',
					}}>
						<Ionicons
							name={this.props.icon}
							size={30}
							color={this.props.app.colors.statusBar}

						/>
					</TouchableOpacity>



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

	}, dispatch)
)

let CustomTabBar = connect(mapStateToProps, mapDispatchToProps)(CustomTabBarStateless)
let TopNavBar = connect(mapStateToProps, mapDispatchToProps)(TopNavBarStateless)
let BackButtonTopNavBar = connect(mapStateToProps, mapDispatchToProps)(BackButtonTopNavBarStateless)

export {CustomTabBar,TopNavBar, BackButtonTopNavBar}
