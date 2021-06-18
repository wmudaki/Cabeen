/**
 *
 * The file contains the button components that will be used within the
 *
 * application
 */

import * as React from 'react'
import {
    View,
    Text, TouchableOpacity,
} from "react-native";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";

class HalfWidthButtonStateLess extends React.PureComponent{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <>
                <View style={{
                    height: 50,
                    width: '80%',
                    backgroundColor: this.props.isSecondary ? null: this.props.app.colors.buttonColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50,
                    elevation: this.props.isSecondary ? null: 20,
                    borderWidth: this.props.isSecondary ? 3: null,
                    borderColor: this.props.isSecondary ? this.props.app.colors.statusBar: null
                }}>
                    <Text style={{
                        color: this.props.isSecondary ? this.props.app.colors.primaryText: this.props.app.colors.buttonText,
                        fontWeight: 'bold',
                        fontSize: 20,
                    }}>
                        {this.props.name}
                    </Text>
                </View>
            </>
        )
    }
}

class FloatingActonButtonStateless extends React.PureComponent{
    render(){
        return(
            <>
                <TouchableOpacity style={{
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                    elevation: 10,
                    backgroundColor: this.props.app.colors.buttonColor,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Entypo
                        name={'plus'}
                        size={30}
                        color={this.props.app.colors.primaryText}
                    />

                </TouchableOpacity>
            </>
        )
    }
}


const mapStateToProps = state => {
    const {app} = state;
    return {app}
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({

    }, dispatch)
)

let HalfWidthButton = connect(mapStateToProps, mapDispatchToProps)(HalfWidthButtonStateLess)
let FloatingActionButton = connect(mapStateToProps, mapDispatchToProps)(FloatingActonButtonStateless)
export {HalfWidthButton, FloatingActionButton}
