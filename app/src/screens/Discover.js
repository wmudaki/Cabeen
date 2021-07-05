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
import {
	FloatingSearchBar,
	AutoCompleteCard
} from "../components/SearchBars";
import { Map, MapCabeen } from "../components/Map";
import {searchPlace,showAutocomplete, showOverlay} from "../state/MapActions";
import {FloatingActionButton} from "../components/Buttons";
import CabeenAddModal from "../modals/CabeenAddModal";




let token = "pk.eyJ1IjoidG90b2RpbmdpIiwiYSI6ImNqeDd5N3Q4YzBib3QzbnBwYW0wbXA5dm4ifQ.5au8D_SQ61D8dXzsgzS-oQ"

function Discover(props){

	const [isAddingCabeen, setIsAddingCabeen] = React.useState(false)
	const [isType, setIsType] = React.useState('normal')

	return(
		<>
			<View style={{
				flex: 1,
				backgroundColor: props.app.colors.whiteText
			}}>
				<View style={{
					position: "absolute",
					bottom: 120,
					right: 25

				}}>
					<FloatingActionButton
						onPress={() => {
							setIsAddingCabeen(true)
						}}
					/>
				</View>
			</View>
			<CabeenAddModal
				modalVisible={isAddingCabeen}
				isType={isType}
				// isError={isError}
				onRequestClose={() => {
					setIsAddingCabeen(false)
				}}
				onSubmit={() => {
					// addTenant()
					console.log('submitted')
				}}
				onCancel={() => {
					setIsAddingCabeen(false)
				}}

				onError={() => {
					setIsType('normal')
					setIsAddingCabeen(true)
				}}
				onSuccessfully={() => {
					setIsType('normal')
					// setIsSuccessfully(false)
					setIsAddingCabeen(false)
				}}
			/>
		</>
	)
}
class Discovery extends React.PureComponent{
	constructor(props) {
		super(props);
		this.state = {
			autocomplete: false,
			searchResults: {}
		}
	}

	async search(term){
		this.setState({autocomplete: false})
		this.props.showAutocomplete(this.state.autocomplete)
		let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/
		${term}.json?access_token=${token}&worldview=us`
		if (term.length > 2){
			await fetch(url)
				.then((resp) => resp.json())
				.then((results) => this.handleResponse(results))
				.catch((err) => console.log('An error occurred', err))
		}
	}

	handleResponse(results){
		if (results.features.length > 0){
			this.setState({
				autocomplete: true,
				searchResults: results
			})
			this.props.searchPlace(this.state.searchResults)
			this.props.showAutocomplete(this.state.autocomplete)
		}else {
			this.setState({autocomplete: false})
			this.props.showAutocomplete(this.state.autocomplete)
		}
	}

	render(){
		return(
			<>
				<View style={{
					flex: 1,
					backgroundColor: this.props.app.colors.background
				}}>
					<View style={{
						height: '100%'
					}}>
						<Map/>
					</View>
					<View style={{
						position: 'absolute',
						top: 10,
						left: 0,
						right: 0,
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						<FloatingSearchBar
							leftIcon={'filter'}
							rightIcon={'my-location'}
							placeholder={'enter location'}
							onChangeText={(value) => this.search(value)}
						/>

					</View>
					{
						this.props.map.autocomplete ?
							<View style={{
								position: 'absolute',
								top: 80,
								left: 0,
								right: 0
							}}>
								<AutoCompleteCard/>
							</View>: null
					}

					{
						this.props.map.overlay ?
							<View style={{
								position: 'absolute',
								bottom: 0,
								height: '50%',
								// backgroundColor: 'rgba(0,0,0,.1)'
							}}>
								<MapCabeen/>

							</View>: null
					}


				</View>
			</>
		)
	}
}


const mapStateToProps = state => {
	const {app,map} = state;
	// console.log('state',map)
	return {app, map}
}

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		searchPlace,
		showAutocomplete,
		showOverlay

	}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Discover)

