/*
* The file implements the home screen for the application
*
* */

import * as React from 'react'
import {
	View,
	ScrollView
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {FloatingSearchBar} from "../components/SearchBars";
import { Map, MapCabeen } from "../components/Map";


class Home extends React.PureComponent{
	render(){
		return(
			<>
				<View style={{
					flex: 1,
					backgroundColor: this.props.app.colors.background
				}}>
					<View style={{
						height: '50%'
					}}>
						<Map/>
					</View>
					<View style={{
						position: 'absolute',
						top: 20,
						left: 0,
						right: 0,
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						<FloatingSearchBar
						/>
					</View>
					<View style={{
						position: 'absolute',
						bottom: 0,
						height: '50%',
						// backgroundColor: 'rgba(0,0,0,.85)'
					}}>
						<MapCabeen/>

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

	}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Home)

