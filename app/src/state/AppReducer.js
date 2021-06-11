
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
        statusBar: isDarkMode ? '#5D4037': '#5D4037',
        topNavBar: isDarkMode ? '#795548': '#795548',
        bottomNavBar: isDarkMode ? '#795548': '#795548',
    },
    termsAgree: false
}

export const appReducer = (state=INITIAL_STATE, action) => {
    switch (action.type){
        case "AGREE_TO_TERMS":
            state.termsAgree = !state.termsAgree;
            return {...state}
        default:
            return state
    }
}

