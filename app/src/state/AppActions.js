export const changeTheme = (theme) => (
  {
    type: 'CHANGE_THEME',
    payload: theme
  }
);

export const agreeToTerms = () => (
    {
        type: "AGREE_TO_TERMS",
    }
)

export const rotate = (orientation) => (
    {
        type: 'ROTATE',
        payload: orientation
    }
)

export const updateSignIn = (field, payload) => (
    {
        type: "UPDATE_SIGN_IN",
        field: field,
        payload: payload
    }
)

export const updateLogin = (field, payload) => (
    {
        type: "UPDATE_LOGIN",
        field: field,
        payload: payload
    }
)

export const editProfile = (field, payload) => (
    {
        type: "EDIT_PROFILE",
        field: field,
        payload: payload
    }
)

export const authenticate = (field, payload) => (
    {
        type: "AUTHENTICATE",
        field: field,
        payload: payload
    }
)

export const setProfileEditInfo = () => (
    {
        type: "SET_PROFILE_EDIT_INFO"
    }
)

export const updateUrls = (field, payload) => (
    {
        type: "UPDATE_URLS",
        field: field,
        payload: payload
    }
)

export const refreshApp = () => (
    {
        type: 'REFRESH_APP'
    }
)