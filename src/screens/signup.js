import * as React from 'react';
import { View, Text, Slider, TextInput, Button, StyleSheet, useState } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Reinput from 'reinput'
import RadioButtonRN from 'radio-buttons-react-native';


import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

export default class SignupScreen extends React.Component {

    state = {
        usertype: '',
        name: '',
        email: '',
        gender: ''

    }
    onPress = gender => this.setState({ gender });

    database = firebase.database();


    writeUserData(usertype , name, email, password, age, city, mobile, gender) {
       

        firebase.auth().createUserWithEmailAndPassword(email, password , )
            .then((userCredential) => {
                var userId = firebase.auth().currentUser.uid;
                // Signed in 
                //var user = userCredential.user;
                console.log(userId)
                firebase.database().ref(userId).set({
                    usertype : usertype ,
                    name: name,
                    email: email,
                    password: password,
                    age: age,
                    city: city,
                    mobile: mobile,
                    gender: gender,
        
                });
                if(usertype == 'doctor'){
                    this.props.navigation.navigate('Dashboard')
                    firebase.database().ref('doctorlist/' + new Date().getTime()).set({
                        name: name,
                       
                    });


                }
                else {
                    this.props.navigation.navigate('Appointment')

                }


                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage , errorCode)
                // ..
            });
        
        console.log('posted data')
    }


    render() {
        console.log(this.state.usertype)
        console.log(this.state.name)



        return (
            <ScrollView>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                        <Text style={{ padding: 12, fontSize: 15, fontWeight: 'bold' }}> User Type:- </Text>
                        <DropDownPicker
                            items={[
                                { label: 'Doctor', value: 'doctor', hidden: true },
                                { label: 'Patient', value: 'patient' },

                            ]}
                            containerStyle={{ height: 40, width: 100 }}
                            style={{ backgroundColor: 'rgb(100, 37, 255)' }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}
                            onChangeItem={item => this.setState({
                                usertype: item.value
                            })}

                        />
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 1 }}>

                        <Reinput label='Name:-' style={{ width: 200, height: 80 }} onChangeText={(name) => { this.setState({ name: name }) }} />

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 1 }}>

                        <Reinput label='email' style={{ width: 200, height: 80 }} onChangeText={(email) => { this.setState({ email: email }) }} />

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 1 }}>

                        <Reinput label='create 6-digit password' style={{ width: 200, height: 70, fontSize: 100 }} secureTextEntry={true} onChangeText={(password) => { this.setState({ password: password }) }} />
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 1 }}>
                        <Reinput label='age' style={{ width: 200, height: 80 }} onChangeText={(age) => { this.setState({ age: age }) }} />

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                        <Text style={{ padding: 12, fontSize: 15, fontWeight: 'normal' }}> Gender:- </Text>
                        <DropDownPicker
                            items={[
                                { label: 'Male', value: 'male', hidden: true },
                                { label: 'Female', value: 'female' },

                            ]}
                            containerStyle={{ height: 40, width: 100 }}
                            style={{ backgroundColor: 'rgb(100, 37, 255)' }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}
                            onChangeItem={item => this.setState({
                                gender: item.value
                            })}

                        />
                    </View>




                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 1 }}>

                        <Reinput label='City/village' style={{ width: 200, height: 80 }} onChangeText={(city) => { this.setState({ city: city }) }} />

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 1 }}>

                        <Reinput label='Mobile number' style={{ width: 200, height: 80 }} onChangeText={(mobile) => { this.setState({ mobile: mobile }) }} />

                    </View>

                    <TouchableOpacity onPress={() => {
                        this.writeUserData(this.state.usertype , this.state.name, this.state.email, this.state.password, this.state.age, this.state.city, this.state.mobile, this.state.gender)
                    }} style={{
                        backgroundColor: 'rgb(100, 37, 255)',
                        padding: 10,
                        margin: 15,
                        height: 40,
                    }}>
                        <Text style={{ color: 'white' }}> Sign Up </Text>
                    </TouchableOpacity >


                    <Text style={{ fontSize: 20, color: 'blue', textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Login')}> Back to Login </Text>


                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>                   </Text>

                </View>
            </ScrollView>
        );
    }

}
