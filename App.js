import * as React from 'react';
import { View, Text, Slider, TextInput, Button, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Reinput from 'reinput'
import RadioButtonRN from 'radio-buttons-react-native';

import LoginScreen from './src/screens/login';
import SignupScreen from './src/screens/signup';
import CallScreen  from './src/screens/calling';
import DashboardScreen  from './src/screens/dashboard';
import AppointmentScreen  from './src/screens/appointment';



import  config from './firebase/config'



import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(100, 37, 255)',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

const Stack = createStackNavigator();

export default function App() {
  console.log(config)
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Call" component={CallScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Appointment" component={AppointmentScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
});


// <Text style={{ fontSize: 30 }}>username:-</Text>
// <TextInput  placeholder="emali"
//   style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }} />
// <Text style={{ fontSize: 30 }}  >password:-</Text>
// <TextInput placeholder="password"
//   style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }} />