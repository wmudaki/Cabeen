const INITIAL_STATE = {
    cabeenInfo: {
        name: "",
        type: '',
        description: '',
        location: '',
        currency: '',
        features: '',
        price: '',
        images: []
    },

    tenantInfo: {
        userId: '',
        houseLabel: '',
        cabeenId: ''
    },
    cabeenDetails: {},
    cabeenEditInfo: {
        name: "",
        type: '',
        description: '',
        location: '',
        currency: '',
        price: '',
        images: []
    },
    updateCabeens: true,
    cabeenImages : [],
    accessLevel: 'user',
    contactPerson: {},
    cabeenReservation: {
        checkIn: {
            day: '01',
            month: 'Jan',
            year: '2021'
        },
        checkOut: {
            day: '02',
            month: 'Jan',
            year: '2021'
        },
    }

}

export const cabeenReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "ADD_CABEEN":
            if (action.field === 'name'){
                state.cabeenInfo.name = action.payload
                return {...state}
            }
            else if (action.field === 'type'){
                state.cabeenInfo.type = action.payload
                return {...state}
            }
            else if (action.field === 'description'){
                state.cabeenInfo.description = action.payload
                return {...state}
            }
            else if (action.field === 'location'){
                state.cabeenInfo.location = action.payload
                return {...state}
            }
            else if (action.field === 'price'){
                state.cabeenInfo.price = action.payload
                return {...state}
            }
            else if (action.field === 'currency'){
                state.cabeenInfo.currency = action.payload
                return {...state}
            }
            else if (action.field === "images"){
                state.cabeenInfo.images = action.payload
                return {...state}
            }
            else if(action.field === 'features'){
                state.cabeenInfo.features = action.payload
                return {...state}
            }
            else if(action.field === 'clear'){
                state.cabeenInfo.name = ''
                state.cabeenInfo.type = ''
                state.cabeenInfo.price = ''
                state.cabeenInfo.currency = ''
                state.cabeenInfo.description = ''
                state.cabeenInfo.location = ''
                state.cabeenInfo.features = ''
                return {...state}
            }
            else return state
            //
        case "ADD_TENANT":
            if (action.field === 'userId'){
                state.tenantInfo.userId = action.payload
                return {...state}
            }
            else if (action.field === 'houseLabel'){
                state.tenantInfo.houseLabel = action.payload
                return {...state}
            }
            else if (action.field === 'cabeenId'){
                state.tenantInfo.cabeenId = action.payload
                return {...state}
            }
            else if (action.field === 'clear'){
                state.tenantInfo.userId = ''
                state.tenantInfo.houseLabel = ''
                state.tenantInfo.cabeenId = ''
                return {...state}
            }
            else return state

        case "CABEEN_DETAILS":
            state.cabeenDetails = action.payload
            return {...state}

        case "CABEEN_EDIT":
            if (action.field === 'name'){
                state.cabeenEditInfo.name = action.payload
                return {...state}
            }
            else if (action.field === 'type'){
                state.cabeenEditInfo.type = action.payload
                return {...state}
            }
            else if (action.field === 'description'){
                state.cabeenEditInfo.description = action.payload
                return {...state}
            }
            else if (action.field === 'location'){
                state.cabeenEditInfo.location = action.payload
                return {...state}
            }
            else if (action.field === 'price'){
                state.cabeenEditInfo.price = action.payload
                return {...state}
            }
            else if (action.field === 'currency'){
                state.cabeenEditInfo.currency = action.payload
                return {...state}
            }
            else if (action.field === 'features'){
                state.cabeenEditInfo.features = action.payload
                return {...state}
            }
            else if (action.field === "images"){
                state.cabeenEditInfo.images = action.payload
                return {...state}
            }
            else if (action.field === 'clear'){
                state.cabeenEditInfo.type = ''
                state.cabeenEditInfo.currency = ''
                state.cabeenEditInfo.name = ''
                state.cabeenEditInfo.description = ''
                state.cabeenEditInfo.price = ''
                state.cabeenEditInfo.images = ''
                state.cabeenEditInfo.location = ''
                return {...state}
            }
            else return state

        case "UPDATE_CABEENS":
            state.updateCabeens = !state.updateCabeens
            return {...state}

        case "SELECT_IMAGES":
            if (action.operation === 'select'){
                state.cabeenImages.push(action.payload)
                return {...state}
            }
            else if (action.operation === 'unselect'){
                let index = state.cabeenImages.indexOf(action.payload)
                if (index !== -1){
                    state.cabeenImages.splice(index,1)
                    return {...state}
                }
                return state
            }
            else if (action.operation === 'clear'){
                state.cabeenImages = []
                return {...state}
            }

            else return state

        case 'LIKE_CALLBACK':
            if (action.operation === 'like'){
                state.cabeenDetails.likes.push(action.payload)
                return {...state}
            }
            else if (action.operation === 'unlike'){
                let index = state.cabeenDetails.likes.indexOf(action.payload)
                if (index !== -1){
                    state.cabeenDetails.likes.splice(index, 1)
                    return {...state}
                }
                return state
            }
            else return state

        case "SET_EDIT_INFO":
            state.cabeenEditInfo.name = state.cabeenDetails.name
            state.cabeenEditInfo.location = state.cabeenDetails.location
            state.cabeenEditInfo.type = state.cabeenDetails.type
            state.cabeenEditInfo.features = state.cabeenDetails.features
            state.cabeenEditInfo.price = state.cabeenDetails.price
            state.cabeenEditInfo.currency = state.cabeenDetails.currency
            state.cabeenEditInfo.images = state.cabeenDetails.images
            state.cabeenEditInfo.description = state.cabeenDetails.description
            return {...state}

        case "SET_ACCESS_LEVEL":
            state.accessLevel = action.payload
            return {...state}

        case "FIND_CONTACT_PERSON":
            state.contactPerson = action.payload
            return {...state}

        case "RESERVE_CABEEN":
            if (action.operation === 'checkIn'){
                if (action.field === 'day'){
                    state.cabeenReservation.checkIn.day = action.payload
                    return {...state}
                }
                else if (action.field === 'month'){
                    state.cabeenReservation.checkIn.month = action.payload
                    return {...state}
                }
                else if (action.field === 'year'){
                    state.cabeenReservation.checkIn.year  = action.payload
                    return {...state}
                }
                return state
            }
            else if(action.operation === 'checkOut'){
                if (action.field === 'day'){
                    state.cabeenReservation.checkOut.day = action.payload
                    return {...state}
                }
                else if (action.field === 'month'){
                    state.cabeenReservation.checkOut.month = action.payload
                    return {...state}
                }
                else if (action.field === 'year'){
                    state.cabeenReservation.checkOut.year  = action.payload
                    return {...state}
                }
                return state
            }
            else if (action.operation === 'clear'){
                state.cabeenReservation.checkOut = INITIAL_STATE.cabeenReservation.checkOut
                state.cabeenReservation.checkIn = INITIAL_STATE.cabeenReservation.checkIn
                return {...state}
            }
            return state

        default:
            return state

    }
}