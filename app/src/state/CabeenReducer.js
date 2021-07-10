const INITIAL_STATE = {
    cabeenInfo: {
        name: "",
        type: '',
        description: '',
        location: '',
        currency: '',
        price: '',
        images: []
    },

    tenantInfo: {
        userId: '',
        houseLabel: ''
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
    updateCabeens: true

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
            else if (action.field === "images"){
                state.cabeenEditInfo.images = action.payload
                return {...state}
            }
            else return state

        case "UPDATE_CABEENS":
            state.updateCabeens = !state.updateCabeens
            return {...state}

        default:
            return state

    }
}