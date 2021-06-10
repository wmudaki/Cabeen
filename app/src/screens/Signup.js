/**
 * The file creates a  signup screen for new users
 *
 * */

import * as React from 'react'
import {
    View,
    Text
} from 'react-native'

class Signup extends React.PureComponent{
    render(){
        return(
            <>
                <View style={{
                    flex: 1,
                    backgroundColor: this.props.app.colors.background
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 30,
                        color: this.props.app.colors.background
                    }}>
                        Signup
                    </Text>
                </View>
            </>
        )
    }
}