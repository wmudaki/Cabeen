/**
 * The file contains the classes and functions that
 *
 * implement and create the User account screen
 *
 * */
import * as React from "react";
import {
	Dimensions,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {BackButtonTopNavBar} from "../components/NavBars";
import { FloatingActionButton } from "../components/Buttons";
import Carousel from "react-native-snap-carousel";
import CabeenCard from "../components/Cards";
import { Actions } from "react-native-router-flux";


const {height,width} = Dimensions.get('window')

class Account extends React.PureComponent{
	renderProfile(){
		return(
			<>
				<View>
					<TouchableOpacity
						onPress={() => Actions.profileEdit()}
						style={{
						alignItems: 'center',
						justifyContent: 'center',
						margin: 20
					}}>
						<Image
							style={{
								height: 150,
								width: 150,
								borderRadius: 100,
								backgroundColor: this.props.app.colors.primaryText
							}}
							source={{
								uri: 'photo'
							}}/>
						<Text style={{
							color: this.props.app.colors.statusBar,
							fontSize: 25,
							fontWeight:"bold",
							margin: 10
						}}>
							Username
						</Text>
					</TouchableOpacity>
				</View>
			</>
		)
	}

	_renderCabeenItem(item){
		return(
			<>
				<CabeenCard
					item={item.item}
				/>
			</>
		)
	}

	renderCabeen(title){
		return(
			<>
				<View>
					<Text style={{
						fontWeight: 'bold',
						fontSize: 25,
						marginLeft: 20,
						margin: 5,
						color: this.props.app.colors.statusBar
					}}>
						{title}
					</Text>
					<Carousel
						data={[1,2,3,4,5,6]}
						renderItem={(item) => this._renderCabeenItem(item)}
						sliderWidth={width}
						itemWidth={0.85*width}
					/>
				</View>
			</>
		)
	}


	render(){
		return(
			<>
				<View>
					<BackButtonTopNavBar
						title={"Account"}
						icon={'ellipsis-vertical'}
					/>
				</View>
				<ScrollView style={{
					flex: 1,
					backgroundColor: this.props.app.colors.whiteText
				}}>
					<View style={{
						borderBottomWidth: 2,
						borderColor: this.props.app.colors.secondaryText
					}}>
						{this.renderProfile()}
					</View>
					<View>
						{this.renderCabeen('Your Cabeens')}
					</View>
					<View>
						{this.renderCabeen("Cabeens you love")}
					</View>
				</ScrollView>
				<View style={{
					position: "absolute",
					bottom: 30,
					right: 20,
				}}>
					<FloatingActionButton/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Account)
