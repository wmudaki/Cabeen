/*
* The file contains component implementations
*
* of lists used in the application
*
*
* */

import * as React from "react";
import {
	View,
	FlatList,
	SectionList,
	TouchableOpacity,
	Image,
	Text,
	Dimensions
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Carousel from "react-native-snap-carousel";
import { MapCabeen } from "./Map";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { Actions } from "react-native-router-flux";
import CabeenCard from "./Cards";


const {height,width} = Dimensions.get('window')

class CustomSectionListStateless extends React.PureComponent{
	renderItem(item){
		return(
			<>
				<CabeenCard
					name={item.item.name}
					location={item.item.location}
					price={item.item.price}
					type={item.item.type}
					images={item.item.images}
					onPress={() => this.props.onPress(item.item)}
				/>
			</>
		)
	}

	renderCarousel(data){
		return(
			<>
				<FlatList
					ref={(c) => { this._carousel = c; }}
					data={data}
					horizontal={true}
					style={{ margin: 0}}
					keyExtractor={(item, key) => item + key}
					renderItem={(item) => this.renderItem(item)}
					// sliderWidth={width}
					// itemWidth={0.85*width}
					ListHeaderComponent={() => <View style={{margin: 10}}/>}
					ListFooterComponent={() => <View style={{ margin: 10}}/>}
					// activeSlideOffset={0.5*width}
					// layoutCardOffset={0.5*width}
				/>
			</>
		)
	}

	render(){
		return(
			<>
				<View style={{
					height: "100%",
					width: '100%'
				}}>
					<SectionList
						sections={this.props.homeData}
						renderItem={({section:{recommendation}}) =>
							this.renderCarousel(recommendation)}
						keyExtractor={(item,index) => item+index}
						SectionSeparatorComponent={() => <View style={{margin:10}}/>}
						ListHeaderComponent={() => <View style={{margin:50}}/>}
						ListFooterComponent={() => <View style={{margin:30}}/>}
						// horizontal={true}
						renderSectionHeader={({ section: { title } }) => (
							<Text style={{fontSize: 25,
								color: this.props.app.colors.statusBar,
								fontWeight: 'bold',
								marginLeft: 10
							}}>{title}</Text>
						)}

					/>

				</View>
			</>
		)
	}
}

class CustomFlatListStateless extends React.PureComponent{
	renderItem(item){
		return(
			<>
				<View style={{
					margin: 10,
					backgroundColor: 'white',
					padding: 10,
					elevation: 0,
					borderRadius: 20,

					// borderBottomWidth: 2,
					borderColor:this.props.app.colors.secondaryText
				}}>
					<View style={{
						flexDirection: "row",
						margin: 10,
						marginTop: 15
						// alignItems: "center"
					}}>
						<Image
							style={{
								height: 50,
								width: 50,
								borderRadius: 30,
								backgroundColor: this.props.app.colors.statusBar
							}}
							// source={require('../../assets/image/cabeen.png')}
							/>
						<Text style={{
							marginLeft: 10,
							fontSize: 20,
							flex: 1,
							color: this.props.app.colors.primaryText
						}}>
							{<Text style={{ fontWeight: "bold", color: this.props.app.colors.statusBar}}>{item.item.touristName }</Text> } Reserved <Text style={{fontWeight: 'bold', color: this.props.app.colors.statusBar}}>{item.item.spots}</Text> {item.item.spots === '1' ? 'spot' : 'spots'} on <Text style={{fontWeight: "bold", color: this.props.app.colors.statusBar}}>{item.item.tourName}</Text>
						</Text>
					</View>
					<View style={{
						alignItems: "center",
						justifyContent: "space-between",
						flexDirection: "row",
						margin: 15
					}}>
						<Text style={{
							color: this.props.app.colors.secondaryText
						}}>
							9 hours ago
						</Text>
						<TouchableOpacity
							onPress={(item) = this.props.onContactPress(item.item.tourProviderId)}
							style={{
							width: '35%',
							height: 35,
							backgroundColor: this.props.app.colors.buttonColor,
							alignItems: "center",
							justifyContent: "center",
							borderRadius: 30,
							margin: 0,
							elevation: 5,
							alignSelf: "flex-end"
						}}>
							<Text style={{
								fontSize: 17,
								fontWeight: "bold",
								color: 'white'
							}}>
								Contact
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
				<View>
					<FlatList
						data={this.props.tourReservationData}
						renderItem={(item) => this.renderItem(item)}
						ListHeaderComponent={() => (<View style={{margin: 10}}>
							<Text style={{
								fontWeight: "bold",
								fontSize: 25,
								margin: 10,
								alignSelf: "center"
							}}>
								Tour Reservations
							</Text>
							</View>)}
						ItemSeparatorComponent={() => <View style={{margin: 0}}/>}
						ListFooterComponent={() => <View style={{margin: 50}}/>}
						keyExtractor={(item,index) => item+index}
					/>

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

let CustomSectionList = connect(mapStateToProps, mapDispatchToProps)(CustomSectionListStateless)
let CustomFlatList = connect(mapStateToProps, mapDispatchToProps)(CustomFlatListStateless)
//
export {CustomSectionList, CustomFlatList}
