
let isDarkMode = false

const INITIAL_STATE = {
    currentUser: {
        isActive: false,
        token: '',
        user: {}
    },
    colors: {
        background: isDarkMode ? '#5D4037': '#D7CCC8',
        buttonColor: isDarkMode ? '#FF5722': '#FF5722',
        buttonText: isDarkMode ? '#ffffff': '#ffffff',
        buttonIcon: isDarkMode ? '#ffffff': '#ffffff',
        icon: isDarkMode ? '#ffffff': '#000000',
        primaryText:isDarkMode ? '#ffffff': '#000000',
        secondaryText: isDarkMode ? '#757575': '#757575',
        errorText: isDarkMode ? '#D32F2F': '#D32F2F',
        successText: isDarkMode ? '#00ff50': '#00ff50',
        statusBar: isDarkMode ? '#5D4037': '#5D4037',
        topNavBar: isDarkMode ? '#795548': '#795548',
        bottomNavBar: isDarkMode ? '#795548': '#795548',
        whiteText: '#ffffff',
        blackText: '#000000',
        greyText: '#666666'
    },
    termsAgree: false,
    portrait:true,
    googleMapKey: 'AIzaSyB1U4VymWm4OrMmIOMmE8XZjEZQ1Gsrp28',
    signIn:{
        username: '',
        fullName:'',
        phone: '',
        password: '',
        email:'',
    },
    login:{
        email: '',
        password: ''
    },
    editProfile: {

    },
    urls: {
        cabeenImages: 'http://192.168.0.25:4000/cabeens/',
        avatars: 'http://192.168.0.25:4000/avatars/'
    }
}

export const appReducer = (state=INITIAL_STATE, action) => {
    switch (action.type){
        case "AGREE_TO_TERMS":
            state.termsAgree = !state.termsAgree;
            return {...state}
        case "ROTATE":
            if (action.payload === 'portrait'){
                state.portrait = true;
                return {...state}
            }else {
                state.portrait = false;
                return {...state}
            }
        case "UPDATE_SIGN_IN":
            if (action.field === 'phone'){
                state.signIn.phone = action.payload
                return {...state}
            }
            else if (action.field === 'fullName'){
                state.signIn.fullName = action.payload
                return {...state}
            }
            else if (action.field === 'email'){
                state.signIn.email = action.payload
                return {...state}
            }
            else if (action.field === 'password'){
                state.signIn.password = action.payload
                return {...state}
            }
            else if (action.field === 'clear'){
                state.signIn.phone = ''
                state.signIn.email = ''
                state.signIn.fullName = ''
                state.signIn.password = ''
                state.signIn.username = ''
                state.termsAgree = false
                return {...state}
            }
            else return state

        case "UPDATE_LOGIN":
            if (action.field === 'email'){
                state.login.email = action.payload
                return {...state}
            }
            else if (action.field === 'password'){
                state.login.password = action.payload
                return {...state}
            }
            else if (action.field === 'clear'){
                state.login.password = ''
                state.login.email = ''
                return {...state}
            }

            else return state

        case "EDIT_PROFILE":
            if (action.field === 'name'){
                state.editProfile.name = action.payload
                return {...state}
            }
            else if (action.field === 'email'){
                state.editProfile.email = action.payload
                return {...state}
            }
            else if (action.field === 'phone'){
                state.editProfile.phone = action.payload
                return {...state}
            }
            else if (action.field === 'avatar'){
                state.editProfile.avatar = action.payload
                return {...state}
            }
            else if (action.field === '_id'){
                state.editProfile._id = action.payload
                return {...state}
            }
            else return state

        case "AUTHENTICATE":
            if (action.field === 'activate'){
                state.currentUser.isActive = action.payload
                return {...state}
            }
            else if (action.field === 'token'){
                state.currentUser.token = action.payload
                return {...state}
            }
            else if (action.field === 'user'){
                state.currentUser.user = action.payload
                return {...state}
            }
            else if (action.field === 'logout'){
                // state.currentUser.token = ''
                // state.currentUser.isActive = false
                // state.currentUser.user = {}
                return INITIAL_STATE
            }
            else return state

        case "SET_PROFILE_EDIT_INFO":
            console.log('Settin ingo')
            state.editProfile = state.currentUser.user
            console.log('Setted')
            // state.editProfile.avatar = state.currentUser.user.avatar
            return {...state}

        default:
            return state
    }
}

