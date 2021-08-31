/**
 * The file creates text input components
 *
 */
import * as React from 'react'
import {
    View,
    TextInput
} from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons";

class RegularTextInput extends React.PureComponent{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent:'center',
                    borderWidth: 3,
                    borderRadius: 25,
                    padding: 5,
                    width: "80%",
                    alignSelf: 'center',
                    borderColor: this.props.borderColor,

                }}>
                    <Ionicons
                        name={this.props.iconName}
                        size={25}
                        color={this.props.iconColor}
                    />
                    <TextInput
                        placeholder={this.props.placeholder}
                        placeholderTextColor={this.props.placeholderTextColor}
                        style={{
                            height: 50,
                            width: '80%',
                            borderRadius: 0,
                            padding: 10,
                            fontSize: 20,
                            color: this.props.textColor,
                            alignSelf: 'center',
                            fontWeight: 'bold',
                        }}
                        secureTextEntry={this.props.secureTextEntry}
                        onChangeText={this.props.onChangeText}
                        selectionColor={this.props.borderColor}
                        multiline={this.props.multiline}
                        keyboardType={this.props.keyboardType}
                    />
                </View>
            </>
        )
    }
}

export {RegularTextInput}
