
const INITIAL_STATE = {
    tourAdd: {
        name: '',
        price: '',
        location: '',
        date: '',
        description: '',
        images: []
    },
    tourReservation: {
        spots: 1
    },
    tourDate: {
        day: 1,
        month: 'Jan',
        year: '2021'
    },
    tourDetails: {}
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
            else if (action.field === 'clear'){
                state.tourAdd = INITIAL_STATE.tourAdd
                state.tourDate = INITIAL_STATE.tourAdd
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

        case 'RESERVE_TOUR':
            if (action.field === 'spots'){
                if (action.operation === 'add'){
                    state.tourReservation.spots = state.tourReservation.spots + 1
                    return {...state}
                }
                else if (action.operation === 'subtract'){
                    if (state.tourReservation.spots > 1){
                        state.tourReservation.spots = state.tourReservation.spots - 1
                        return {...state}
                    }
                }

            }
            else if (action.field === 'clear'){
                state.tourReservation.spots = 1
                return {...state}
            }

            return state

        case "ADD_TOUR_DATE":
            if (action.field === 'day'){
                state.tourDate.day = action.payload
                return {...state}
            }
            else if (action.field === 'month'){
                state.tourDate.month = action.payload
                return {...state}
            }
            else if (action.field === 'year'){
                state.tourDate.year  = action.payload
                return {...state}
            }

            return state

        case "GET_TOUR_DETAILS":
            state.tourDetails = action.payload
            return {...state}

        default:
            return state
    }
}