/**
 * The file contains the classes and functions
 *
 * that implement a cabeen management screen
 *
 * */
import * as React from 'react'
import {
	ActivityIndicator,
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
import TenantDeleteModal from "../modals/TenantDeleteModal";


function CabeenManagement(props){
	const ADD_TENANT = gql`
		mutation ADD_TENANT(
			$userId: String,
			$houseLabel: String,
			$cabeenId: String
		){
			addTenant(
				input:{
					userId: $userId,
					houseLabel: $houseLabel,
					cabeenId: $cabeenId
				}
			){
				_id,
				userId,
				houseLabel,
				cabeenId
			}
		}
	
	`

	const GET_TENANTS = gql`
		mutation GET_TENANTS(
			$cabeenId: String
		){
			fetchTenants(
				cabeenId: $cabeenId
			){
				_id,
				userId,
				houseLabel,
				cabeenId,
			}
		}
	`

	const REMOVE_TENANT = gql`
		mutation REMOVE_TENANT(
			$_id: ID
		){
			removeTenant(
				_id: $_id
			){
				userId
			}
		}
	`

	const [removeTenant] = useMutation(REMOVE_TENANT)
	const [isRemovingTenant, setIsRemovingTenant] = React.useState(false)
	const [removeId, setRemoveId] = React.useState('')
	const [deleteType, setDeleteType] = React.useState('normal')
	const [fetchTenants] = useMutation(GET_TENANTS)
	const [tenants, setTenants] = React.useState([])
	const [isFetchingTenants, setIsFetchingTenants] = React.useState(false)
	const [isAddingTenant, setIsAddingTenant] = React.useState(false)
	const [createTenant] = useMutation(ADD_TENANT)
	const [isError, setIsError] = React.useState(false)
	const [isSuccessfully, setIsSuccessfully] = React.useState(false)
	const [isType, setIsType] = React.useState('normal')

	const addTenant = () => {

		setIsAddingTenant(true)
		setIsType('loading')
		setIsError(false)
		createTenant({variables:{
			userId: props.cabeen.tenantInfo.userId,
				houseLabel: props.cabeen.tenantInfo.houseLabel,
				cabeenId: props.cabeen.cabeenDetails._id
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

	const getTenants = () => {
		setIsFetchingTenants(true)
		fetchTenants({variables: {
			cabeenId: props.cabeen.cabeenDetails._id
			}})
			.then((res) => {
				console.log(res)
				setTenants(res.data.fetchTenants)
				setIsFetchingTenants(false)
			} )
			.catch(err => {
				console.log(err)
				setIsFetchingTenants(false)
			})
	}

	React.useEffect(() => {
		getTenants()
	},[isType, deleteType])

	const deleteTenant = () => {
		setIsRemovingTenant(true)
		setDeleteType('loading')
		removeTenant({variables: {
			_id: removeId
			}})
			.then((res) => {
				console.log(res)
				setDeleteType('success')
			})
			.catch((err) => {
				console.log(err)
				setDeleteType('error')
			})
	}

	const renderTenants = (item) => {
		return(
			<>
				<View>
					<TenantCard
						tenantName={item.item.userId}
						houseLabel={item.item.houseLabel}
						_id={item.item._id}
						onRemovePress={(id) => {
							setIsRemovingTenant(true)
							setRemoveId(id)
						}}
					/>
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
						title={props.cabeen.cabeenDetails.name}
					/>
				</View>
				<View style={{
				}}>
					<FlatList
						data={tenants}
						renderItem={(item) => renderTenants(item)}
						keyExtractor={(item, key) => item+key}
						ListEmptyComponent={() => (
							<View style={{
								alignItems: "center",
								justifyContent: "center"
							}}>
								<Text style={{
									fontSize: 20,
									fontWeight: 'bold',
									margin: 25,
									marginTop: 100,
									color: props.app.colors.secondaryText
								}}>
									When you add tenants, they will appear here
								</Text>
							</View>
						)}
						ListFooterComponent={() => <View style={{ margin: 80}}/>}
						ListHeaderComponent={() => (
							<View>
								<Text style={{
									// alignSelf: 'center',
									fontSize: 35,
									fontWeight: 'bold',
									margin: 25
								}}>
									Tenants
								</Text>
							</View>
						)}
					/>
				</View>
				{
					isFetchingTenants?
						<View style={{
							position: 'absolute',
							top: 80,
							alignSelf: "center",
							borderRadius: 50,
							padding: 10,
							elevation: 30,
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
			<TenantDeleteModal
				modalVisible={isRemovingTenant}
				isType={deleteType}
				// isError={isError}
				onRequestClose={() => {
					setIsRemovingTenant(false)
				}}
				onSubmit={() => {
					deleteTenant()
					// console.log('submitted')
				}}
				onCancel={() => {
					setIsRemovingTenant(false)
				}}

				onError={() => {
					setDeleteType('normal')
					setIsRemovingTenant(true)
				}}
				onSuccessfully={() => {
					setDeleteType('normal')
					// setIsSuccessfully(false)
					setIsRemovingTenant(false)
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

