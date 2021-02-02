import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import DatePicker from 'react-native-datepicker'
import DropDownPicker from 'react-native-dropdown-picker';

export default class AppointmentScreen extends Component {

  state = {
    date: new Date(),
    doctorlist: [],
    todaydate: new Date(),
    consultant: '',
    time: '',
    name: ''

  }


  signoutMethod(email, password) {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
      alert('Successfully Logout !!!')
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  postAppointmentdata(date, time, consultant) {


    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref(userId).once('value').then((snapshot) => {
      var name = (snapshot.val() && snapshot.val().name) || 'Anonymous';
      this.setState({ name: name })
      console.log(' in postappointment function' + name)
    })



    date = date.toString();
    var date = date.substring(0, 10);
    firebase.database().ref(date + '/' + userId).set({
      user: userId,
      date: date,
      name: this.state.name,
      time: time,
      consultant: consultant



    });
    alert('successfully submited !!!')
  }

  componentWillMount() {
    var arraylist = []
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('doctorlist/').once('value', (snap) => {
      snap.forEach((childSnapshot) => {


        var childKey = childSnapshot.key;
        var childData = childSnapshot.val().name;
        console.log(childData)
        arraylist.push(childData)
        arraylist.push(childData)
        var joined = this.state.doctorlist.concat(childData);
        this.setState({ doctorlist: joined })
        // console.log(this.state.doctorlist)
        // console.log(childKey)
        // console.log(childData)

        // console.log(childData)


        console.log('todays data is ' + this.state.todaydate)



      });


    })
  }
  render() {
    const { date } = this.state;
    console.log(this.state.date)
    console.log(this.state.consultant)


    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>

          <Text style={styles.welcome}>appointment page</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
          <Text style={{ padding: 12, fontSize: 15, fontWeight: 'bold' }}> Date </Text>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.date}
            mode="date"
            placeholder="select date"

            minDate={this.state.todaydate}
            maxDate="31-12-2099"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => { this.setState({ date: date }) }}
          />
        </View>




        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
          <Text style={{ padding: 12, fontSize: 15, fontWeight: 'normal' }}> Time </Text>
          <DropDownPicker
            items={[
              { label: '10', value: '10', hidden: true },
              { label: '11', value: '11', },
              { label: '12', value: '12', },
              { label: '1', value: '1', },
              { label: '2', value: '2', },
              { label: '3', value: '3', },
              { label: '4', value: '4', },
              { label: '5', value: '5', },
              { label: '6', value: '6', },


            ]}
            defaultValue={this.state.time}
            containerStyle={{ height: 40, width: 100 }}
            style={{ backgroundColor: '#fafafa' }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={item => this.setState({
              time: item.value
            })}
          />
        </View>


        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
          <Text style={{ padding: 12, fontSize: 15, fontWeight: 'normal' }}> Consultant </Text>
          <DropDownPicker
            items={[{ 
              label: 'A', value: 'a', hidden: true },
            { label: 'B', value: 'b', },
            { label: 'C', value: 'c', },]}
            defaultValue={this.state.consultant}
            containerStyle={{ height: 40, width: 100 }}
            style={{ backgroundColor: '#fafafa' }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={item => this.setState({ consultant: item.value })
            }
          />
        </View>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>

          <TouchableOpacity onPress={() => { this.postAppointmentdata(this.state.date, this.state.time, this.state.consultant) }}
            style={{
              backgroundColor: 'rgb(100, 37, 255)',
              padding: 10,
              margin: 15,
              height: 40,
            }}>
            <Text style={{ color: 'white' }} > Submit </Text>
          </TouchableOpacity >
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>

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

      </View >
    );
  }
}
const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});












