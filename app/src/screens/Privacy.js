import * as React from 'react'
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {bindActionCreators} from "redux";
import {agreeToTerms, authenticate, updateSignIn} from "../state/AppActions";
import {connect} from "react-redux";
import {BackButtonTopNavBar} from "../components/NavBars";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function MainContent(props){
    return(
        <>
            <View style={{
                width: '100%',
                height: 200,
                borderRadius: 10,
                marginTop: 3,
                margin: 5,
                backgroundColor: 'white',
                elevation: 10,
                alignSelf: 'center'
            }}>
                <Image
                    source={{
                       uri:  'https://images.unsplash.com/photo-1528580152190-66d551db2e06?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzZ8fGFncmljdWx0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                    }}
                    style={{
                        width: '98%',
                        height: 190,
                        borderRadius: 10,
                        margin: 5,
                        alignSelf: 'center',
                        backgroundColor: props.app.colors.background
                    }}
                />
                <View style={{
                    backgroundColor: 'white',
                    position: 'absolute',
                    left: 160,
                    bottom: 75,
                    borderRadius: 30,
                    elevation: 10,

                }}>
                    <MaterialCommunityIcons
                        name={'play-circle'}
                        size={50}
                        color={props.app.colors.buttonColor}
                        style={{
                            // position: 'absolute',
                            // left: 160,
                            // bottom: 75
                        }}
                    />
                </View>
            </View>
        </>
    )
}

function ModuleList(props){

    let data = [
        {
        'module': "Module 2",
        'duration': '20 min',
        'instructor': 'G Kamau',
        'title': 'Harvesting techniques',
        'image': 'https://images.unsplash.com/photo-1601728693749-c1b22a0b9ca1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzB8fGFncmljdWx0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            'module': "Module 3",
            'duration': '24 min',
            'instructor': 'G Kamau',
            'title': 'Pest and disease control',
            'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaS7ttnxFLQffQAws8iKBKBsxYPAdwDzb_Xw&usqp=CAU'
        },
        {
            'module': "Module 4",
            'duration': '22 min',
            'instructor': 'G Kamau',
            'title': 'Handling and grading',
            'image': 'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFncmljdWx0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            'module': "Module 5",
            'duration': '30 min',
            'instructor': 'G Kamau',
            'title': 'Quality control',
            'image': 'https://images.unsplash.com/photo-1580982186123-27ab767589aa?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTI3fHxhZ3JpY3VsdHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            'module': "Module 6",
            'duration': '27 min',
            'instructor': 'G Kamau',
            'title': 'The magic box',
            image: 'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFncmljdWx0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            'module': "Module 7",
            'duration': '22 min',
            'instructor': 'G Kamau',
            'title': 'Produce preparation',
            'image': 'https://images.unsplash.com/photo-1524486361537-8ad15938e1a3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGFncmljdWx0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            'module': "Module 8",
            'duration': '10 min',
            'instructor': 'G Kamau',
            'title': 'Cooling protocols',
            'image': 'https://images.unsplash.com/photo-1557234195-bd9f290f0e4d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YWdyaWN1bHR1cmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            'module': "Module 9",
            'duration': '10 min',
            'instructor': 'G Kamau',
            'title': 'Safety procedures'
        },
        {
            'module': "Module 10",
            'duration': '10 min',
            'instructor': 'G Kamau',
            'title': 'Monetization'
        }
    ]
    function _renderItem(item){
        return(
            <>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View >
                        <Image
                            source={{
                                uri: item.item.image
                            }}
                            style={{
                                height: 50,
                                width: 50,
                                borderRadius: 10,
                                backgroundColor: props.app.colors.background,
                                margin: 10
                            }}
                        />
                    </View>
                    <View style={{
                        marginLeft: 10,
                        flex: 1
                        // alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: 18
                        }}>
                            {item.item.module}: {item.item.title}
                        </Text>
                        <Text style={{
                            fontSize: 15,
                            color: 'grey'
                        }}>
                            Duration: {item.item.duration} | Instructor: {item.item.instructor}
                        </Text>
                    </View>

                </View>
            </>
        )
    }
    return(
        <>
            <View>
                <FlatList
                    data={data}
                    renderItem={_renderItem}
                    keyExtractor={(item, key) => item + key}
                />
            </View>
        </>
    )
}

function MainModuleText(props) {
    return(
        <>
            <View>
                <Text style={{
                    fontSize: 20,
                    margin: 10,
                    fontWeight: 'bold'
                }}>
                    Module 1: Introduction to post harvest loss management
                </Text>
                <Text style={{
                    marginLeft: 20,
                    margin: 5,
                    fontSize: 17,
                    marginTop: 0,
                    marginBottom: 10,
                    color: 'grey'
                }}>
                   Duration: 12 min | Instructor:  G Kamau
                </Text>
                <View style={{
                    borderBottomWidth: 2,
                    margin: 10,
                    borderBottomColor: props.app.colors.background
                }}>

                </View>
            </View>
        </>
    )
}

function Buttons(props){
    return(
        <>
            <View style={{
                flexDirection: 'row',
                position: 'absolute',
                justifyContent: 'space-between',
                alignItems: 'center',
                bottom: 0,
                left: 0,
                right: 0,
                margin: 0,
                height: 60,
                padding: 5,
                backgroundColor: '#ddd'
            }}>
                <TouchableOpacity style={{
                    width: '45%',
                    height: 45,
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    borderRadius: 35,
                    borderWidth: 2,
                    borderColor: props.app.colors.background,
                    flexDirection: 'row',

                }}>
                    <MaterialCommunityIcons
                        name={'chevron-left'}
                        size={30}
                    />
                    <Text style={{
                        fontSize: 18
                    }}>
                        Previous
                    </Text>

                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: '45%',
                    height: 45,
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    borderRadius: 35,
                    elevation: 3,
                    backgroundColor: props.app.colors.buttonColor,
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontSize: 18
                    }}>
                        Next
                    </Text>
                    <MaterialCommunityIcons
                        name={'chevron-right'}
                        size={30}
                    />
                </TouchableOpacity>
            </View>
        </>
    )
}

function Privacy(props) {
    return(
        <>
            <View style={{
                flex: 1,
                backgroundColor: '#ddd'
            }}>
                <BackButtonTopNavBar
                    title={'Learning modules'}
                    icon={'search'}
                    isManager={true}
                    // onIconPress={() => {
                    //     setIsDeletingCabeen(true)
                    // }}
                />
                <FlatList
                    data={[1]}
                    listKey={'main'}
                    keyExtractor={(key, item) => key + item}
                    renderItem={() => (
                        <>
                            <MainContent
                                {...props}
                            />
                            <MainModuleText
                                {...props}
                            />
                            <ModuleList
                                {...props}
                            />

                        </>
                    )}
                />
                <Buttons
                    {...props}
                />

            </View>
        </>
    )
}


const mapStateToProps = state => {
    const {app} = state;
    return {app}
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        agreeToTerms,
        updateSignIn,
        authenticate

    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Privacy)
