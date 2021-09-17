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
	TouchableOpacity, FlatList, Text, Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
	getPlace,
	showAutocomplete,
	getSearchLocation ,
	moveCamera,
	showOverlay
} from "../state/MapActions";


class FloatingSearchBarStateless extends React.PureComponent{
	constructor(props) {
		super(props);
	}

	render(){
		return(
			<>
				<View style={{
					height: 55,
					width: '90%',
					flexDirection: 'row',
					alignItems: 'center',
					backgroundColor: '#ffffff',
					alignSelf: "center",
					justifyContent: 'space-between',
					margin: 10,
					borderRadius: 10,
					elevation: 20,
					padding: 10,
					paddingRight: 20
				}}>
					<TouchableOpacity onPress={this.props.leftIconPress}>
						{/*<Image*/}
						{/*	source={{*/}
						{/*		uri: 'uri'*/}
						{/*	}}*/}
						{/*	style={{*/}
						{/*		height: 40,*/}
						{/*		width: 40,*/}
						{/*		borderRadius: 20,*/}
						{/*		backgroundColor: this.props.app.colors.background*/}
						{/*	}}*/}
						{/*/>*/}
						<Ionicons
							name={this.props.leftIcon}
							size={36}
							color={this.props.app.colors.statusBar}
						/>
					</TouchableOpacity>
					<TextInput
						placeholder={this.props.placeholder}
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
						selectTextOnFocus
						defaultValue={this.props.map.place}
						// onFocus={this.props.onFocus}
						onPressIn={this.props.onFocus}
						onBlur={() => this.props.showOverlay(true)}
					/>
					<TouchableOpacity
						onPressIn={this.props.onRightIconPress}
						style={{

					}}>
						{
							this.props.feather ?
								<Feather
									name={this.props.rightIcon}
									size={29}
									color={this.props.app.colors.statusBar}
								/>:
								<View>
									<Ionicons
										name={this.props.rightIcon}
										size={29}
										color={this.props.app.colors.statusBar}
									/>
									<View style={{
										backgroundColor: this.props.app.colors.buttonColor,
										position: "absolute",
										left:-5,
										borderRadius: 30,
										alignItems: "center",
										width: 12,
										height: 12,
										top: -2,
										flex: 1
									}}>
									</View>
								</View>

						}

					</TouchableOpacity>


				</View>
			</>
		)
	}
}

class AutoCompleteCardStateless extends React.PureComponent{

	handlePress(location){
		this.props.getPlace(location.place_name)
		this.props.showAutocomplete(false)
		this.props.getSearchLocation(location)
		this.props.moveCamera(true)
	}

	_renderItem(item){
		return(
			<>
				<TouchableOpacity
					onPress={() => this.handlePress(item.item)}
				>
					<Text
						numberOfLines={1}
						style={{
						fontSize: 15,
						color: this.props.app.colors.primaryText
					}}>
						{item.item.place_name}
					</Text>

				</TouchableOpacity>
			</>
		)
	}

	render(){
		return(
			<>
				<View style={{
					backgroundColor: this.props.app.colors.whiteText,
					elevation: 10,
					marginLeft: 40,
					marginRight: 40,
					marginTop: 10,
					padding: 10,
					borderRadius: 10
				}}>
					<FlatList
						data={this.props.map.searchResults.features}
						renderItem={(item) => this._renderItem(item)}
						ItemSeparatorComponent={() => <View style={{
							borderBottomWidth: 2,
							margin: 5,
							borderBottomColor: this.props.app.colors.secondaryText
						}}/>}
					/>
				</View>

			</>
		)
	}
}

const mapStateToProps = state => {
	const {app, map} = state;
	return {app, map}
}

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		getPlace,
		showAutocomplete,
		getSearchLocation,
		moveCamera,
		showOverlay

	}, dispatch)
)

let FloatingSearchBar = connect(mapStateToProps, mapDispatchToProps)(FloatingSearchBarStateless)
let AutoCompleteCard = connect(mapStateToProps, mapDispatchToProps)(AutoCompleteCardStateless)

export {FloatingSearchBar, AutoCompleteCard}
