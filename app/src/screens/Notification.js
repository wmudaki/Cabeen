/*
*
* The file contains the classes and functions that
*
* create and implement the notification screen
*
* */
import * as React from "react";
import {
	Text,
	View,
	TouchableOpacity
} from "react-native";
import { bindActionCreators } from "redux";
import { agreeToTerms } from "../state/AppActions";
import { connect } from "react-redux";
import { TopNavBar } from "../components/NavBars";
import { CustomFlatList } from "../components/Lists";


class Notification extends React.PureComponent{
	render(){
		return(
			<>
				<View style={{
					flex: 1,
					backgroundColor: this.props.app.colors.background
				}}>
					<View>
						<CustomFlatList/>
					</View>
					<View style={{
						position: "absolute",
						top: 20,
						left:0,
						right: 0
					}}>
						<TopNavBar/>
					</View>

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
		agreeToTerms,

	}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
