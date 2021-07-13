export const addCabeen = (field, payload) => (
    {
        type: "ADD_CABEEN",
        field: field,
        payload: payload

    }
)

export const addTenant = (field, payload) => (
    {
        type: "ADD_TENANT",
        field: field,
        payload: payload
    }
)

export const getCabeenDetails = (payload) => (
    {
        type: "CABEEN_DETAILS",
        payload: payload
    }
)

export const cabeenEdit = (field, payload) => (
    {
        type: "CABEEN_EDIT",
        field: field,
        payload: payload
    }
)

export const updateCabeens = () => (
    {
        type: "UPDATE_CABEENS"
    }
)

export const selectImages = (operation, payload) => (
    {
        type: 'SELECT_IMAGES',
        operation: operation,
        payload: payload
    }
)

