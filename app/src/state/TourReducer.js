
const INITIAL_STATE = {
    tourAdd: {
        name: '',
        price: '',
        location: '',
        date: '',
        description: '',
        images: []
    }
}

export const tourReducer = (state=INITIAL_STATE, action) => {
    switch (action.type){
        case "ADD_TOUR":
            if (action.field === 'name'){
                state.tourAdd.name = action.payload
                return {...state}
            }
            else if (action.field === 'price'){
                state.tourAdd.price = action.payload
                return {...state}
            }
            else if (action.field === 'location'){
                state.tourAdd.location = action.payload
                return {...state}
            }
            else if (action.field === 'date'){
                state.tourAdd.date = action.payload
                return {...state}
            }
            else if (action.field === 'description'){
                state.tourAdd.description = action.payload
                return {...state}
            }
            return state

        case "SELECT_TOUR_IMAGES":
            if (action.operation === 'select'){
                state.tourAdd.images.push(action.payload)
                return {...state}
            }
            else if (action.operation === 'unselect'){
                let index = state.tourAdd.images.indexOf(action.payload)
                if (index !== -1){
                    state.tourAdd.images.splice(index,1)
                    return {...state}
                }
                return state
            }
            else if (action.operation === 'clear'){
                state.tourAdd.images = []
                return {...state}
            }

            else return state

        default:
            return state
    }
}