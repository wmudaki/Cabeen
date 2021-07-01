/*
* The file contains the implementations of the
*
* home screen
*
* */

import * as React from 'react'
import {
	View,
	Text
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { TopNavBar } from "../components/NavBars";
import {FloatingSearchBar} from "../components/SearchBars";
import { CustomSectionList } from "../components/Lists";
import { Actions } from "react-native-router-flux";


class Home extends React.PureComponent{
	render(){
		return(
			<>
				<View style={{
					flex: 1,
					backgroundColor: this.props.app.colors.whiteText
				}}>

					<View>
						<CustomSectionList/>
					</View>
					<View style={{
						position: 'absolute',
						top: 10,
						left: 0,
						right: 0
					}}>
						<FloatingSearchBar
							leftIcon={'person-circle-outline'}
							rightIcon={'search'}
							placeholder={'search produce'}
							feather={true}
							leftIconPress={() => Actions.account()}
						/>
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
