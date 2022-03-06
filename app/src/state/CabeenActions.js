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

export const setEditInfo = () => (
    {
        type: "SET_EDIT_INFO"
    }
)

export const setAccessLevel = (payload) => (
    {
        type: "SET_ACCESS_LEVEL",
        payload: payload
    }
)

export const likeCallback = (operation, payload) => (
    {
        type: "LIKE_CALLBACK",
        operation: operation,
        payload: payload
    }
)

export const findContactPerson = (payload) => (
    {
        type: "FIND_CONTACT_PERSON",
        payload: payload
    }
)

export const reserveCabeen = (operation, field, payload) => (
    {
        type: "RESERVE_CABEEN",
        operation: operation,
        field: field,
        payload: payload
    }
)