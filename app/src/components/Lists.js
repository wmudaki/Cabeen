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
				<Carousel
					ref={(c) => { this._carousel = c; }}
					data={data}
					renderItem={(item) => this.renderItem(item)}
					sliderWidth={width}
					itemWidth={0.85*width}
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
						SectionSeparatorComponent={() => <View style={{margin:15}}/>}
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
					elevation: 5,
					borderRadius: 10,

					// borderBottomWidth: 2,
					borderColor:this.props.app.colors.secondaryText
				}}>
					<View style={{
						flexDirection: "row",
						// alignItems: "center"
					}}>
						<Image
							style={{
								height: 40,
								width: 40,
								// borderRadius: 30,
								// backgroundColor: this.props.app.colors.statusBar
							}}
							source={require('../../assets/image/cabeen.png')}
							/>
						<Text style={{
							marginLeft: 10,
							fontSize: 18,
							flex: 1,
							color: this.props.app.colors.primaryText
						}}>
							Lisa Vern Reserved 1 spot on Kilimanjaro hike
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
						<TouchableOpacity style={{
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
						data={[1,2,3,4,5,6,7,8,9,]}
						renderItem={(item) => this.renderItem(item)}
						ListHeaderComponent={() => (<View style={{margin: 10}}>
							<Text style={{
								fontWeight: "bold",
								fontSize: 25,
								margin: 10,
								alignSelf: "center"
							}}>
								Reservations
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
