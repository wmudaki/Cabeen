/*
*
* The file contains the functions and classes for adding a
*
* a cabeen.
*
* */

import * as React from 'react'
import {
	Image,
	ScrollView, Text, TextInput, TouchableOpacity,
	View,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {BackButtonTopNavBar} from "../components/NavBars";
import { RegularTextInput } from "../components/TextInputs";
import TextInjection from "react-native/Libraries/Text/TextInjection";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

class CabeenAdd extends React.PureComponent{

	renderName(){
		return(
			<>
				<View style={{
					marginTop: 20,
					margin: 20,
					borderRadius: 20
				}}>
					<Text style={{
						fontSize: 25,
						fontWeight:"bold",
						// fontStyle:"italic",
						marginBottom: 10,
						color: this.props.app.colors.primaryText
					}}>
						Name
					</Text>
					<TextInput
						placeholder={'cabeen name'}
						placeholderTextColor={this.props.app.colors.secondaryText}
						onChangeText={this.handleInput}
						style={{
							borderRadius: 10,
							backgroundColor: this.props.app.colors.background,
							fontSize: 20,
							padding:10,
							color: this.props.app.colors.primaryText
						}}
					/>
				</View>
			</>
		)
	}

	renderType(){
		return(
			<>
				<Text style={{
					fontSize: 25,
					fontWeight: 'bold',
					// fontStyle: "italic",
					margin: 20,
					color: this.props.app.colors.primaryText
				}}>
					Type
				</Text>
				<View style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: 'center',
					margin: 30,
					marginTop: 10
				}}>
					<TouchableOpacity style={{
						flexDirection:"row",
						alignItems: "center"
					}}>
						<MaterialCommunityIcons
							name={this.props.app.termsAgree ?
								"checkbox-marked-circle-outline":
								"checkbox-blank-circle-outline"
							}
							size={30}
							color={this.props.app.colors.statusBar}
						/>
						<Text style={{
							fontSize: 18,
							marginLeft: 10
						}}>
							Nightout
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{
						flexDirection:"row",
						alignItems: "center"
					}}>
						<MaterialCommunityIcons
							name={this.props.app.termsAgree ?
								"checkbox-marked-circle-outline":
								"checkbox-blank-circle-outline"
							}
							size={30}
							color={this.props.app.colors.statusBar}
						/>
						<Text style={{
							fontSize: 18,
							marginLeft: 10
						}}>
							Rental
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{
						flexDirection:"row",
						alignItems: "center"
					}}>
						<MaterialCommunityIcons
							name={this.props.app.termsAgree ?
								"checkbox-marked-circle-outline":
								"checkbox-blank-circle-outline"
							}
							size={30}
							color={this.props.app.colors.statusBar}
						/>
						<Text style={{
							fontSize: 18,
							marginLeft: 10
						}}>
							Sale
						</Text>
					</TouchableOpacity>

				</View>
			</>
		)
	}

	renderLocation(){
		return(
			<>
				<View style={{
					margin: 20,
				}}>
					<Text style={{
						marginBottom: 20,
						// fontStyle: "italic",
						fontSize: 25,
						fontWeight: "bold",
						color: this.props.app.colors.primaryText
					}}>
						Location
					</Text>
					<TextInput
						placeholder={'country'}
						placeholderTextColor={this.props.app.colors.secondaryText}
						onChangeText={this.handleInput}
						style={{
							borderRadius: 10,
							backgroundColor: this.props.app.colors.background,
							fontSize: 20,
							marginBottom: 20,
							padding:10,
							color: this.props.app.colors.primaryText
						}}
					/>
					<TextInput
						placeholder={'county'}
						placeholderTextColor={this.props.app.colors.secondaryText}
						onChangeText={this.handleInput}
						style={{
							borderRadius: 10,
							backgroundColor: this.props.app.colors.background,
							fontSize: 20,
							marginBottom: 20,
							padding:10,
							color: this.props.app.colors.primaryText
						}}
					/>
					<TextInput
						placeholder={'street'}
						placeholderTextColor={this.props.app.colors.secondaryText}
						onChangeText={this.handleInput}
						style={{
							borderRadius: 10,
							backgroundColor: this.props.app.colors.background,
							fontSize: 20,
							padding:10,
							color: this.props.app.colors.primaryText
						}}
					/>

				</View>
			</>
		)
	}

	renderPrice(){
		return(
			<>
				<View style={{
					margin: 20
				}}>
					<Text style={{
						fontWeight: "bold",
						fontSize: 25,
						// fontStyle: "italic",
						marginBottom: 10,
						color: this.props.app.colors.primaryText
					}}>
						Price
					</Text>
					<TextInput
						placeholder={'cabeen price'}
						placeholderTextColor={this.props.app.colors.secondaryText}
						onChangeText={this.handleInput}
						keyboardType={"numeric"}
						style={{
							borderRadius: 10,
							backgroundColor: this.props.app.colors.background,
							fontSize: 20,
							padding:10,
							color: this.props.app.colors.primaryText
						}}
					/>

				</View>
			</>
		)
	}

	renderCurrency(){
		return(
			<>
				<Text style={{
					fontSize: 25,
					fontWeight: 'bold',
					// fontStyle: "italic",
					margin: 20,
					color: this.props.app.colors.primaryText
				}}>
					Currency
				</Text>
				<View style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: 'center',
					margin: 30,
					marginTop: 10
				}}>
					<TouchableOpacity style={{
						flexDirection:"row",
						alignItems: "center"
					}}>
						<MaterialCommunityIcons
							name={this.props.app.termsAgree ?
								"checkbox-marked-circle-outline":
								"checkbox-blank-circle-outline"
							}
							size={30}
							color={this.props.app.colors.statusBar}
						/>
						<Text style={{
							fontSize: 18,
							marginLeft: 10
						}}>
							KES
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{
						flexDirection:"row",
						alignItems: "center"
					}}>
						<MaterialCommunityIcons
							name={this.props.app.termsAgree ?
								"checkbox-marked-circle-outline":
								"checkbox-blank-circle-outline"
							}
							size={30}
							color={this.props.app.colors.statusBar}
						/>
						<Text style={{
							fontSize: 18,
							marginLeft: 10
						}}>
							USD
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{
						flexDirection:"row",
						alignItems: "center"
					}}>
						<MaterialCommunityIcons
							name={this.props.app.termsAgree ?
								"checkbox-marked-circle-outline":
								"checkbox-blank-circle-outline"
							}
							size={30}
							color={this.props.app.colors.statusBar}
						/>
						<Text style={{
							fontSize: 18,
							marginLeft: 10
						}}>
							EUR
						</Text>
					</TouchableOpacity>

				</View>
			</>
		)
	}

	renderUnits(){
		return(
			<>
				<View style={{
					// flexDirection: "row",
					justifyContent: "space-between",
					margin: 20
				}}>
					<Text style={{
						// fontStyle: "italic",
						fontSize: 25,
						fontWeight: "bold",
						color: this.props.app.colors.primaryText
					}}>
						Units
					</Text>
					<View style={{
						flexDirection: "row",
						justifyContent: "space-between",
						marginTop: 10,
					}}>

						<View style={{
							width: '45%'
						}}>
							<Text style={{
								fontSize: 20,
								marginBottom: 10,
								fontStyle:"italic"

							}}>
								total
							</Text>
							<TextInput
								placeholder={'total units'}
								placeholderTextColor={this.props.app.colors.secondaryText}
								onChangeText={this.handleInput}
								keyboardType={"numeric"}
								style={{
									borderRadius: 10,
									backgroundColor: this.props.app.colors.background,
									fontSize: 20,
									padding:10,
									color: this.props.app.colors.primaryText
								}}
							/>
						</View>
						<View style={{
							width: '45%'
						}}>
							<Text style={{
								fontSize: 20,
								marginBottom: 10,
								fontStyle:"italic"
							}}>
								vacant
							</Text>
							<TextInput
								placeholder={'vacant units'}
								placeholderTextColor={this.props.app.colors.secondaryText}
								onChangeText={this.handleInput}
								keyboardType={"numeric"}
								style={{
									borderRadius: 10,
									backgroundColor: this.props.app.colors.background,
									fontSize: 20,
									padding:10,
									color: this.props.app.colors.primaryText
								}}
							/>
						</View>
					</View>
				</View>
			</>
		)
	}

	renderDescription(){
		return(
			<>
				<View style={{
					marginTop: 20,
					margin: 20,
					borderRadius: 20
				}}>
					<Text style={{
						fontSize: 25,
						fontWeight:"bold",
						// fontStyle:"italic",
						marginBottom: 10,
						color: this.props.app.colors.primaryText
					}}>
						Description
					</Text>
					<TextInput
						placeholder={'cabeen description'}
						placeholderTextColor={this.props.app.colors.secondaryText}
						onChangeText={this.handleInput}
						multiline
						style={{
							borderRadius: 10,
							backgroundColor: this.props.app.colors.background,
							fontSize: 20,
							maxHeight: 150,
							padding:10,
							color: this.props.app.colors.primaryText
						}}
					/>
				</View>
			</>
		)
	}

	renderImages(){
		if (true){
			return(
				<>
					<View style={{
						margin: 20,
						marginBottom: 10,
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: 'center'
					}}>
						<Text style={{

							fontSize: 25,
							// fontStyle: "italic",
							fontWeight: "bold",
							color: this.props.app.colors.primaryText
						}}>
							Images
						</Text>
						<TouchableOpacity>
							<Ionicons
								name={'close-circle'}
								size={30}
								color={this.props.app.colors.statusBar}
							/>
						</TouchableOpacity>

					</View>

					<ScrollView
						horizontal
						style={{
						margin: 20,
					}}>
						{
							[1,2,3,4].map((item, index) => {
								return(
									<Image
										key={index}
										style={{
											height: 150,
											width: 150,
											borderRadius: 20,
											margin: 10,
											backgroundColor: '#000'
										}}
										source={{
											uri: 'uri'
										}}
									/>
								)
							})
						}

					</ScrollView>
				</>
			)
		}

	}

	renderButtons(){
		return(
			<>
				<View style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems:"center",
					margin: 20
				}}>
					<TouchableOpacity style={{
						borderRadius: 10,
						borderColor: '#555',
						borderWidth: 1,
						padding: 10
					}}>
						<Text>
							Add images
						</Text>

					</TouchableOpacity>
					<TouchableOpacity style={{
						backgroundColor: this.props.app.colors.buttonColor,
						borderRadius: 10,
						padding: 10,
						width:'50%',
						alignItems: "center",
						justifyContent: "center",
						elevation: 10,
					}}>
						<Text style={{
							fontWeight: "bold",
							fontSize: 18,
							color: '#fff'
						}}>
							Submit
						</Text>

					</TouchableOpacity>

				</View>
			</>
		)
	}

	render(){
		return(
			<>
				<View style={{
					flex: 1,
					backgroundColor: this.props.app.colors.whiteText,
				}}>
					<BackButtonTopNavBar
						title={'Add Cabeen'}
					/>
					<ScrollView>

						{this.renderName()}
						{this.renderType()}
						{this.renderUnits()}
						{this.renderDescription()}
						{this.renderLocation()}
						{this.renderCurrency()}
						{this.renderPrice()}
						{this.renderImages()}
						{this.renderButtons()}
					</ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(CabeenAdd)
