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


const {height,width} = Dimensions.get('window')

class CustomSectionListStateless extends React.PureComponent{
	renderItem(item){
		return(
			<>
				<TouchableOpacity style={{
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
							{item.item}
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
							<TouchableOpacity style={{
								alignItems: 'center',
								justifyContent: 'center',
								marginRight: 10,
							}}>
								<Fontisto
									name={'heart-alt'}
									size={25}
									color={this.props.app.colors.statusBar}

								/>
							</TouchableOpacity>

						</View>
					</View>

				</TouchableOpacity>
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


const mapStateToProps = state => {
	const {app} = state;
	return {app}
}

const mapDispatchToProps = dispatch => (
	bindActionCreators({

	}, dispatch)
)

let CustomSectionList = connect(mapStateToProps, mapDispatchToProps)(CustomSectionListStateless)
// let TopNavBar = connect(mapStateToProps, mapDispatchToProps)(TopNavBarStateless)
//
export {CustomSectionList}
