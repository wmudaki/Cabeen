/*
* The file contains classes and functions that create
*
* the map component for the application
*
* */
import * as React from 'react';
import {
	View,
	Text,
	Image,
	Dimensions,
	Platform,
	TouchableOpacity,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MapboxGL from "@react-native-mapbox-gl/maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import Carousel from "react-native-snap-carousel";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import { rotate } from "../state/AppActions";
import {searchPlace, getUserLocation,showOverlay} from "../state/MapActions";


MapboxGL.setAccessToken(
	"pk.eyJ1IjoidG90b2RpbmdpIiwiYSI6ImNqeDd5N3Q4YzBib3QzbnBwYW0wbXA5dm4ifQ.5au8D_SQ61D8dXzsgzS-oQ"
)

const {height, width} = Dimensions.get('window')


class MapStateless extends React.PureComponent{
	componentDidMount() {
		if (Platform.OS === "android"){
			MapboxGL.requestAndroidLocationPermissions()
				.then((granted) => console.log("Permission was granted"))
				.catch((err) => console.log("Permission was denied",err))
		}
		// setInterval(() => this.moveCamera(),100)
	}

	userLocation(location){
		getUserLocation(location.coords)
		// console.log('location',location)
	}

	render() {
		return (
			<>
				<View >
					<MapboxGL.MapView
						onPress={() => this.props.showOverlay(!this.props.map.overlay)}
						styleURL={MapboxGL.StyleURL.Street}
						style={{
						width: "100%",
						height: "100%"
					}}>
						<MapboxGL.UserLocation
							visible={true}
							renderMode={'native'}
							onUpdate={(location => this.userLocation(location))}
						/>
						<MapboxGL.Camera
							zoomLevel={16}
							animationMode={'flyTo'}
							followUserLocation={true}
							centerCoordinate={this.props.map.moveCamera ?
								this.props.map.searchLocation.geometry.coordinates:
								[36.899102, -1.226383]}
						/>
						{/*<MapboxGL.MarkerView*/}
						{/*	coordinate={this.props.map.moveCamera ?*/}
						{/*		this.props.map.searchLocation.geometry.coordinates:*/}
						{/*		[36.899102, -1.226383]}*/}
						{/* 	id={'marker1'}>*/}
						{/*	<Text style={{fontSize: 70}}>*/}
						{/*		Hulala*/}
						{/*	</Text>*/}
						{/*</MapboxGL.MarkerView>*/}
					</MapboxGL.MapView>
				</View>
			</>
		)
	}
}

class MapCabeenStateless extends React.PureComponent{
	constructor(props) {
		super(props);
		this.orient()
	}

	orient(){
		Dimensions.addEventListener('change',({window:{height,width}}) =>{
			if (width < height){
				this.props.rotate('portrait')
			} else {
				this.props.rotate('landscape')
			}

		})
	}

	renderCabeen(){
		return(
			<>
				<TouchableOpacity style={{
					backgroundColor: this.props.app.colors.whiteText,
					width: '100%',
					borderRadius: 20,
					elevation: 20

				}}>
					<Image
						style={{
							height: '55%',
							width: '100%',
							borderTopLeftRadius: 20,
							borderTopRightRadius: 20
						}}
						source={{
						uri: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fnoisebreak.com%2Fwp-content%2Fuploads%2F2017%2F09%2Ffood-market-01-800x509.jpg&f=1&nofb=1'
					}}/>
					<View style={{
						margin: 5
					}}>
						<Text style={{
							fontWeight: 'bold',
							fontSize: 19,
							color: this.props.app.colors.primaryText
						}}>
							Gikomba market
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
							<Text style={{
								fontSize: 16,
								margin: 5,
								color: this.props.app.colors.greyText
							}}>
								Kamkunji road, Nairobi
							</Text>
						</View>
						<View style={{
							flexDirection: "row",
							alignItems: 'center'
						}}>
							<MaterialCommunityIcons
								name={'clock'}
								size={18}
								color={this.props.app.colors.statusBar}
							/>
							<Text style={{
								color: this.props.app.colors.greyText,
								fontSize: 16,
								margin: 5
							}}>
								8hr 30 Minutes
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
								<Text style={{
									fontSize: 15,
									margin: 5,
									fontWeight: 'bold',
									color: this.props.app.colors.greyText
								}}>
									13800 KES
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

	render(){
		return(
			<>
				<View style={{
					// position: "absolute",
					top: -40,

				}}>
					<Carousel
						ref={(c) => { this._carousel = c; }}
						data={[1,2,3,4,5,6,7,8,9,0,9,8,7,6]}
						renderItem={() => this.renderCabeen()}
						sliderWidth={this.props.app.portrait ? width : height}
						itemWidth={this.props.app.portrait ? 0.8*width: 0.8*height}
						activeSlideOffset={this.props.app.portrait ? 0.3*width: 0.3*height}
						layoutCardOffset={this.props.app.portrait ? 0.3*width: 0.3*height}
					/>
					{/*{this.renderCabeen()}*/}
				</View>
			</>
		)
	}
}



const mapStateToProps = state => {
	const {app,map} = state;
	return {app,map}
}

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		rotate,
		searchPlace,
		getUserLocation,
		showOverlay

	}, dispatch)
)

let Map = connect(mapStateToProps, mapDispatchToProps)(MapStateless)
let MapCabeen = connect(mapStateToProps, mapDispatchToProps)(MapCabeenStateless)

export {Map, MapCabeen}
