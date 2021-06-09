/**
 *
 * The file contains the button components that will be used within the
 *
 * application
 */

import * as React from 'react'
import {
    View,
    Text
} from 'react-native'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class HalfWidthButtonStateLess extends React.PureComponent{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <>
                <View style={{
                    height: 50,
                    width: '50%',
                    backgroundColor: this.props.app.colors.buttonColor,
                    justifyContent: 'center',
                    alignContent: 'center'
                }}>
                    <Text style={{
                        color: this.props.app.colors.buttonText,
                        fontWeigh: 'bold',
                        fontSize: 20,
                    }}>
                        {this.props.name}
                    </Text>
                </View>
            </>
        )
    }
}


const mapStateToProps = state => {
    const {app} = state;
    return app
}

const mapDispatchToProps = dispatch => {
    bindActionCreators({

    }, dispatch)
}

let HalfWidthButton = connect(mapStateToProps, mapDispatchToProps)(HalfWidthButtonStateLess)
export {HalfWidthButton}
