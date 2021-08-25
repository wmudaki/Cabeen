/*
* The file contains the implementations of the
*
* home screen
*
* */

import * as React from 'react'
import {
	View,
	Text, ActivityIndicator
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { TopNavBar } from "../components/NavBars";
import {FloatingSearchBar} from "../components/SearchBars";
import { CustomSectionList } from "../components/Lists";
import { Actions } from "react-native-router-flux";
import {gql, useMutation} from "@apollo/client";
import {getCabeenDetails, updateCabeens} from "../state/CabeenActions";

function Home (props){

	const GET_CABEENS = gql`
		mutation GET_CABEENS{
			getRecommendations{
				title,
				data,
				recommendation{
					_id,
					name,
					price,
					type,
					features,
					location,
					description,
					likes,
					admin,
					images
				}
			}
		}
	`

	const [getRecommendations] = useMutation(GET_CABEENS)
	const [homeData, setHomeData] = React.useState([])
	const [isFetchingData, setIsFetchingData] = React.useState(false)

	const getCabeens = () => {
		setIsFetchingData(true)
		getRecommendations()
			.then((res) => {
				console.log(res)
				setHomeData(res.data.getRecommendations)
				setIsFetchingData(false)
			})
			.catch((err) => {
				console.log(err)
				setIsFetchingData(false)
			})
	}

	React.useEffect(() => {
		getCabeens()
	}, [props.cabeen.updateCabeens])

	return(
		<>
			<View style={{
				flex: 1,
				backgroundColor: props.app.colors.whiteText
			}}>
				<View>
					<CustomSectionList
						homeData={homeData}
						onPress={(value) => {
							props.getCabeenDetails(value)
							Actions.cabeen()

						}}
					/>
				</View>
				{
					isFetchingData?
						<View style={{
							position: 'absolute',
							top: 80,
							alignSelf: "center",
							borderRadius: 50,
							padding: 10,
							elevation: 10,
							backgroundColor: props.app.colors.whiteText
						}}>
							<ActivityIndicator
								color={props.app.colors.buttonColor}
								size={"small"}
							/>

						</View>: null
				}
				<View style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0
				}}>
					<FloatingSearchBar
						leftIcon={'person-circle-outline'}
						rightIcon={'search'}
						placeholder={'search cabeen'}
						feather={true}
						onFocus={() =>Actions.search()}
						onRightIconPress={() => Actions.search()}
						leftIconPress={() => Actions.account()}
					/>
				</View>

			</View>
		</>
	)
}


const mapStateToProps = state => {
	const {app, cabeen} = state;
	return {app, cabeen}
}

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		getCabeenDetails,
		updateCabeens

	}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
