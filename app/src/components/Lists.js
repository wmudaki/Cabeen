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
					item={item.item}
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
		const DATA = [
			{
				title: "Main dishes",
				data: [1],
				carouselData: ["Pizza", "Burger", "Risotto"]
			},
			{
				title: "Sides",
				data: [1],
				carouselData: ["French Fries", "Onion Rings", "Fried Shrimps"]
			},
			{
				title: "Drinks",
				data:[1],
				carouselData: ["Water", "Coke", "Beer"]
			},
			{
				title: "Desserts",
				data:[1],
				carouselData: ["Cheese Cake", "Ice Cream"]
			}
		];
		return(
			<>
				<View style={{
					height: "100%",
					width: '100%'
				}}>
					<SectionList
						sections={DATA}
						renderItem={({section:{carouselData}}) =>
							this.renderCarousel(carouselData)}
						keyExtractor={(item,index) => item+index}
						SectionSeparatorComponent={() => <View style={{margin:0}}/>}
						ItemSeparatorComponent={() => <View style={{margin:0}}/>}
						ListHeaderComponent={() => <View style={{margin:50}}/>}
						ListFooterComponent={() => <View style={{margin:30}}/>}
						// horizontal={true}
						renderSectionHeader={({ section: { title } }) => (
							<Text style={{fontSize: 30,
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
				<TouchableOpacity style={{
					margin: 0,
					backgroundColor: 'rgba(0,0,0,.2)',
					padding: 10,
					borderBottomWidth: 2,
					borderColor:this.props.app.colors.secondaryText
				}}>
					<View style={{
						flexDirection: 'row',
						alignItems: 'center'
					}}>
						<Image
							style={{
								height: 50,
								width: 50,
								borderRadius: 50
							}}
							source={{
								uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.ZjgSmLyOXQjTlsNMnDTajwHaE8%26pid%3DApi&f=1'
							}}/>
						<Text style={{
							margin: 10,
							fontWeight: 'bold',
							fontSize: 19,
							color: this.props.app.colors.primaryText
						}}>
							Cabeen
						</Text>
					</View>
					<View>
						<Text style={{
							margin: 10,
							fontSize: 16,
							color: this.props.app.colors.primaryText
						}}>
							A very long welcoming text
						</Text>
					</View>

				</TouchableOpacity>
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
						ListHeaderComponent={() => <View style={{margin: 50}}/>}
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
