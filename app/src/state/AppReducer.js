
let isDarkMode = false

const INITIAL_STATE = {
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
    signIn:{
        username: '',
        fullName:'',
        phone: '',
        password: '',
        email:''
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
            if (action.field === 'username'){
                state.signIn.username = action.payload
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
            else return state

        default:
            return state
    }
}

