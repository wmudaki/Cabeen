/*
* The file implements the home screen for the application
*
* */

import * as React from 'react'
import {
	View,
	Text
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";


class Home extends React.PureComponent{
	render(){
		return(
			<>
				<View style={{
					flex: 1,
					backgroundColor: this.props.app.colors.background
				}}>
					<Text style={{
						fontWeight: 'bold',
						fontSize: 60
					}}>
						Home
					</Text>

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

export default connect(mapStateToProps, mapDispatchToProps)(Home)

