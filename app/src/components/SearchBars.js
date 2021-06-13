/*
* The file contains classes and functions that create
*
* the search bar components
*
* */

import * as React from 'react'
import {
	View,
	TextInput,
	TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


class FloatingSearchBarStateless extends React.PureComponent{
	render(){
		return(
			<>
				<View style={{
					height: 50,
					width: '80%',
					flexDirection: 'row',
					alignItems: 'center',
					backgroundColor: '#ffffff',
					alignSelf: "center",
					justifyContent: 'space-between',
					margin: 10,
					borderRadius: 20,
					elevation: 20,
					padding: 10,
					paddingRight: 20
				}}>
					<TouchableOpacity>
						<Ionicons
							name={'filter'}
							size={30}
							color={this.props.app.colors.statusBar}
						/>
					</TouchableOpacity>
					<TextInput
						placeholder={'search location here'}
						placeholderTextColor={this.props.app.colors.secondaryText}
						style={{
							height: 50,
							width: '80%',
							borderRadius: 0,
							padding: 10,
							fontSize: 17,
							color: this.props.app.colors.primaryText,
							alignSelf: 'center',
							// fontWeight: 'bold'
						}}
						onChangeText={this.props.onChangeText}
						selectionColor={this.props.app.colors.statusBar}
					/>
					<TouchableOpacity style={{

					}}>
						<MaterialIcons
							name={'my-location'}
							size={29}
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

let FloatingSearchBar = connect(mapStateToProps, mapDispatchToProps)(FloatingSearchBarStateless)

export {FloatingSearchBar}
