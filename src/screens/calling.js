import * as React from 'react';
import { View, Text, TextInput, Button, StyleSheet ,TouchableOpacity } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
import Reinput from 'reinput'
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';


export default class CallScreen extends React.Component {


  signoutMethod(email, password) {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')

      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  render() {
    // This will throw an 'undefined is not a function' exception because the navigation
    // prop is undefined.
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Working ....</Text>

        <TouchableOpacity onPress={() => { this.signoutMethod() }}
          style={{
            backgroundColor: 'rgb(100, 37, 255)',
            padding: 10,
            margin: 15,
            height: 40,
          }}>
          <Text style={{ color: 'white' }} > Logout </Text>
        </TouchableOpacity >
      </View>
    )
  }
}

