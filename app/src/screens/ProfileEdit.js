/*
*
* The file contains the class and functions that implement
*
* a user profile edit page edit
*
* */
import * as React from 'react';
import {
	Image, ScrollView, TouchableOpacity,
	View,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RegularTextInput } from "../components/TextInputs";
import { BackButtonTopNavBar } from "../components/NavBars";
import { HalfWidthButton } from "../components/Buttons";


class ProfileEdit extends React.PureComponent{
	renderAvatar(){
		return(
			<>
				<TouchableOpacity style={{
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
				</TouchableOpacity>
			</>
		)
	}

	renderTextInputs(){
		return(
			<>
				<View>
					<View style={{
						marginTop: 0

					}}>
						<RegularTextInput
							placeholder={'Username'}
							placeholderTextColor={this.props.app.colors.secondaryText}
							textColor={this.props.app.colors.primaryText}
							borderColor={this.props.app.colors.statusBar}
							backgroundColor={this.props.app.colors.background}
							onChangeText={this.handleInput}
							secureTextEntry={false}
							iconName={'person'}
							iconColor={this.props.app.colors.statusBar}
						/>
					</View>
					<View style={{
						marginTop: 30

					}}>
						<RegularTextInput
							placeholder={'Full Name'}
							placeholderTextColor={this.props.app.colors.secondaryText}
							textColor={this.props.app.colors.primaryText}
							borderColor={this.props.app.colors.statusBar}
							backgroundColor={this.props.app.colors.background}
							onChangeText={this.handleInput}
							secureTextEntry={false}
							iconName={'person-circle'}
							iconColor={this.props.app.colors.statusBar}
						/>
					</View>
					<View style={{
						marginTop: 30

					}}>
						<RegularTextInput
							placeholder={'Phone'}
							placeholderTextColor={this.props.app.colors.secondaryText}
							textColor={this.props.app.colors.primaryText}
							borderColor={this.props.app.colors.statusBar}
							backgroundColor={this.props.app.colors.background}
							onChangeText={this.handleInput}
							secureTextEntry={false}
							iconName={'call'}
							iconColor={this.props.app.colors.statusBar}
						/>
					</View>
					<View style={{
						marginTop: 30

					}}>
						<RegularTextInput
							placeholder={'Email'}
							placeholderTextColor={this.props.app.colors.secondaryText}
							textColor={this.props.app.colors.primaryText}
							borderColor={this.props.app.colors.statusBar}
							backgroundColor={this.props.app.colors.background}
							onChangeText={this.handleInput}
							secureTextEntry={false}
							iconName={'mail'}
							iconColor={this.props.app.colors.statusBar}
						/>
					</View>
				</View>
			</>
		)

	}

	render(){
		return(
			<>
				<View>
					<View>
						<BackButtonTopNavBar
							title={'Edit profile'}
						/>
					</View>
					<ScrollView
						style={{
						marginBottom: 30
					}}>
						{this.renderAvatar()}
						{this.renderTextInputs()}
						<TouchableOpacity
							style={{
							margin: 40,
							alignItems: 'center',
						}}>
							<HalfWidthButton
								name={'Update'}
							/>
						</TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)
