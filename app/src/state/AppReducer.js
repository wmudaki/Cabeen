import * as React from 'react'
import {useColorScheme} from 'react-native'

let isDarkMode = useColorScheme() === 'dark';
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
    }
}

export const appReducer = (state=INITIAL_STATE, action) => {
    switch (action.type){
        default:
            return state
    }
}

