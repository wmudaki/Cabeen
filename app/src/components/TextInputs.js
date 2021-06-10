/**
 * The file creates text input components
 *
 */
import * as React from 'react'
import {
    View,
    TextInput
} from 'react-native'

class RegularTextInput extends React.PureComponent{
    render(){
        return(
            <>
                <View>
                    <TextInput/>
                </View>
            </>
        )
    }
}