import * as React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Reinput from 'reinput'
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

export default class LoginScreen extends React.Component {



    state = {
        email: '',
        password: '',
        animated: false
    }
    UNSAFE_componentDidMount() {
        this.setState({ animated: false });
    }
    handleEmail = (text) => {
        alert('hello')
    }

    signMethod(email, password) {
        this.setState({ animated: true })

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var userId = firebase.auth().currentUser.uid;
                return firebase.database().ref(userId).once('value').then((snapshot) => {
                    var usertype = (snapshot.val() && snapshot.val().usertype) || 'Anonymous';
                    var user = userCredential.user;
                    if(usertype == 'doctor'){
                        this.props.navigation.navigate('Dashboard')
    
                    }
                    else {
                        this.props.navigation.navigate('Appointment')
    
                    }                    console.log(usertype)
                    console.log(userId)
                    this.setState({ animated: false })
                    // ...
                });
                // Signed in

                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorCode, errorMessage)
                this.setState({ animated: false })

            });
    }

    render() {
        console.log(this.state.email)
        console.log(this.state.password)




        const { navigation } = this.props;
        return (

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <Reinput label='username/email' style={{ width: 200, height: 80 }} onChangeText={(text) => { this.setState({ email: text }) }} />

                <Reinput label='password' style={{ width: 200, height: 70, fontSize: 100 }} secureTextEntry={true} onChangeText={(text) => { this.setState({ password: text }) }} />





                <TouchableOpacity onPress={() => { this.signMethod(this.state.email, this.state.password) }}
                    style={{
                        backgroundColor: 'rgb(100, 37, 255)',
                        padding: 10,
                        margin: 15,
                        height: 40,
                    }}>
                    <Text style={{ color: 'white' }} > Login </Text>
                    <ActivityIndicator
                        animating={this.state.animated}
                        color='#00ff00'
                        size="large"
                        style={{
                            flex: 1,
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} />
                </TouchableOpacity >
                <Text style={{ fontSize: 20, color: 'blue', textDecorationLine: 'underline' }} onPress={() => this.props.navigation.navigate('Signup')}> New User ? </Text>
                {/* <Text style={{ fontSize: 20, color: 'blue', textDecorationLine: 'underline' }} onPress={() => this.props.navigation.navigate('Call')}> calling </Text> */}


            </View>


        );


    }
}
