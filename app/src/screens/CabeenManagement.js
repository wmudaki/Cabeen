/**
 * The file contains the classes and functions
 *
 * that implement a cabeen management screen
 *
 * */
import * as React from 'react'
import {
	FlatList,
	Text,
	View,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { BackButtonTopNavBar } from "../components/NavBars";
import {FloatingActionButton} from "../components/Buttons";
import {TenantCard} from "../components/Cards";

class CabeenManagement extends React.PureComponent{
	renderCabeenStats(){
		return(
			<>
				<View>
					<Text style={{
						// alignSelf: 'center',
						fontSize: 35,
						fontWeight: 'bold',
						margin: 25
					}}>
						Acacia apartments
					</Text>
					<View style={{
						flexDirection:"row",
						justifyContent: "space-evenly",
						margin: 20,
						alignItems: 'center'
					}}>
						<Text style={{
							fontSize: 30,
							fontWeight: "bold",
							color: this.props.app.colors.secondaryText

						}}>
							Tenants
						</Text>
						<Text style={{
							fontWeight: "bold",
							fontSize: 30
						}}>
							0
						</Text>

					</View>
				</View>
			</>
		)
	}

	renderTenants(){
		return(
			<>
				<View>
					<TenantCard/>
				</View>
			</>
		)
	}


	render() {
		return(
			<>
				<View style={{
					flex: 1
				}}>
					<View>
						<BackButtonTopNavBar
							title={'Management'}
						/>
					</View>
					<View>
						{this.renderCabeenStats()}
					</View>
					<View style={{
						marginBottom: 100
					}}>
						<FlatList
							data={[1,3,4,5,6,7,8,9]}
							renderItem={() => this.renderTenants()}
							keyExtractor={(item, key) => item+key}
							ListFooterComponentStyle={{ margin: 80}}
							ListFooterComponent={() => <View/>}
						/>
					</View>
					<View style={{
						position: 'absolute',
						bottom: 40,
						right: 20
					}}>
						<FloatingActionButton/>
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

export default connect(mapStateToProps, mapDispatchToProps)(CabeenManagement)

