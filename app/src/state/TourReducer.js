
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
                state.tourAdd.date = action.payload
                return {...state}
            }
            return state
        default:
            return state
    }
}