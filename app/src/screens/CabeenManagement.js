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
import {useMutation, gql} from "@apollo/client";
import TenantAddModal from "../modals/TenantAddModal";
import {Actions} from "react-native-router-flux";


function CabeenManagement(props){
	const ADD_TENANT = gql`
		mutation ADD_TENANT(
			$userId: String,
			$houseLabel: String,
		){
			addTenant(
				input:{
					userId: $userId,
					houseLabel: $houseLabel
				}
			){
				_id,
				userId,
				houseLabel
			}
		}
	
	`
	const [isAddingTenant, setIsAddingTenant] = React.useState(false)
	const [createTenant] = useMutation(ADD_TENANT)
	const [isError, setIsError] = React.useState(false)
	const [isSuccessfully, setIsSuccessfully] = React.useState(false)
	const [isType, setIsType] = React.useState('normal')

	const addTenant = () => {
		setIsAddingTenant(true)
		setIsError(false)
		createTenant({variables:{
			userId: props.cabeen.tenantInfo.userId,
				houseLabel: props.cabeen.tenantInfo.houseLabel
			}})
			.then((res) => {
				console.log(res)
				setIsType('success')
				setIsSuccessfully(true)
				// setIsAddingTenant(false)
				// setIsError(true)
			})
			.catch(err => {
				setIsType('error')
				setIsError(true)
				console.log('Error', err)
			})
	}



	const renderTenants = () => {
		return(
			<>
				<View>
					<TenantCard/>
				</View>
			</>
		)
	}

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
								color: props.app.colors.secondaryText

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
				</View>
				<View style={{
					marginBottom: 100
				}}>
					<FlatList
						data={[1,3,4,5,6,7,8,9]}
						renderItem={() => renderTenants()}
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
					<FloatingActionButton
						onPress={() => setIsAddingTenant(true)}
					/>
				</View>
			</View>
			<TenantAddModal
				modalVisible={isAddingTenant}
				isType={isType}
				// isError={isError}
				onRequestClose={() => {
					setIsAddingTenant(false)
				}}
				onSubmit={() => {
					addTenant()
					// console.log('submitted')
				}}
				onCancel={() => {
					setIsAddingTenant(false)
				}}

				onError={() => {
					setIsType('normal')
					setIsAddingTenant(true)
				}}
				onSuccessfully={() => {
					setIsType('normal')
					// setIsSuccessfully(false)
					setIsAddingTenant(false)
				}}
			/>

		</>
	)
}

class CabeenManagementAlpha extends React.PureComponent{
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
	const {app, cabeen} = state;
	return {app, cabeen}
}

const mapDispatchToProps = dispatch => (
	bindActionCreators({

	}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(CabeenManagement)

