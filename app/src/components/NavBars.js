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


class CustomTabBarStateless extends React.PureComponent{
	getIcon(key){
		const {state} = this.props.navigation;
		const activeTabIndex = state.index;

		if (key ===  'home'){
			if (state.routes[activeTabIndex].key === 'home'){
				return {'name':'home',
					'size' : 25,
					'color': this.props.app.colors.icon,
					'label': 'cabeen',
					'active': true
				}
			}
			else {
				return {'name':'home-outline',
					'size' : 25,
					'color': this.props.app.colors.statusBar,
					'label': 'cabeen',
					'active': false
				}
			}
		}

		else if (key === 'notifications'){
			if (state.routes[activeTabIndex].key === 'notifications'){
				return {'name':'notifications',
					'size' : 25,
					'color': this.props.app.colors.icon,
					'label': 'notifications',
					'active': true
				}
			}
			else {
				return {'name':'notifications-outline',
					'size' : 25,
					'color': this.props.app.colors.statusBar,
					'label': 'notifications',
					'active': false
				}
			}
		}
		else if (key === 'discover'){
			if (state.routes[activeTabIndex].key === 'discover'){
				return {'name':'compass',
					'size' : 32,
					'color': this.props.app.colors.icon,
					'label': 'discover',
					'active': true
				}
			}
			else {
				return {'name':'compass-outline',
					'size' : 30,
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
				backgroundColor: this.props.app.colors.background,
			}}>
				<View style={{
					margin: 20,
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					height: 60,
					backgroundColor: '#ffffff',
					borderRadius: 50,
					elevation: 50
				}}>
					{
						state.routes.map(elements => (
							<TouchableOpacity
								style={{
									justifyContent: 'center',
									alignItems: 'center',
									flexDirection: 'row',
									borderRadius: 50,
									margin: 7,
									elevation: this.getIcon(elements.key).active ?
										5: null,
									backgroundColor:this.getIcon(elements.key).active ?
										this.props.app.colors.background : null
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

const mapStateToProps = state => {
	const {app} = state;
	return {app}
}

const mapDispatchToProps = dispatch => (
	bindActionCreators({

	}, dispatch)
)

let CustomTabBar = connect(mapStateToProps, mapDispatchToProps)(CustomTabBarStateless)

export {CustomTabBar}
