export const addTour =(field, payload) => (
    {
        type: "ADD_TOUR",
        field: field,
        payload: payload
    }
)

export const selectTourImages = (operation, payload) => (
    {
        type: 'SELECT_TOUR_IMAGES',
        operation: operation,
        payload: payload
    }
)

export const reserveTour = (field, operation, payload) => (
    {
        type: "RESERVE_TOUR",
        field: field,
        operation: operation,
        payload: payload
    }
)

export const addTourDate = (field, payload) => (
    {
        type: "ADD_TOUR_DATE",
        field: field,
        payload: payload
    }
)

export const getTourDetails = (payload) => (
    {
        type: "GET_TOUR_DETAILS",
        payload: payload
    }
)
