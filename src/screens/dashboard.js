import React, { Component } from 'react';
import { Platform, StyleSheet, FlatList, Text, View, Button ,TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';


export default class DashboardScreen extends Component {

  state = {
    date: new Date(),
    userlist: [],
    checkname: '',
    doctorname: ''
  }

  signoutMethod(email, password) {
    firebase.auth().signOut().then(() => {
      alert('successfully Logout !!!')
      this.props.navigation.navigate('Login')


      // Sign-out successful.
    }).catch((error) => {
      alert(error)
      // An error happened.
    });

  }

  put_data = (data) => {
    this.setState({ userlist: data })
  }


  componentWillMount = () => {
    var arraylist = []
    var date = this.state.date
    var userId = firebase.auth().currentUser.uid;


    firebase.database().ref(userId).once('value').then((snapshot) => {
      var username = (snapshot.val() && snapshot.val().name) || 'Anonymous';
      username = username.toLowerCase();
      console.log('username:' + username)
      this.setState({ checkname : username })

      console.log('in firebase fun ' + this.state.checkname)

      //console.log('usernamejkljkk ' + this.state.username)
    });


    // date = date.toString();
    // date = date.substring(0, 10);

    firebase.database().ref(JSON.stringify(this.state.date).substring(1, 11)).once('value', (snap) => {
      snap.forEach((childSnapshot) => {
        var userId = firebase.auth().currentUser.uid;
        console.log(userId)
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val().name
        var doctorname = childSnapshot.val().consultant
        console.log('check type ')
        console.log(typeof this.state.doctorname)
        console.log(typeof this.state.checkname)

        this.setState({ doctorname: doctorname })
        console.log(this.state.doctorname)


      
          console.log('if condition' + this.state.username == this.state.doctorname)
          arraylist.push(childData)
          var joined = this.state.userlist.concat(childData);
          this.setState({ userlist: joined })
          console.log(this.state.userlist)
      

        // this.setState({ userlist: childData })
        //console.log(childData)

        // console.log(this.state.date)


      });

      // console.log(arraylist)
    })
  }


  render() {
    console.log(this.state.userlist)

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>

          <Text style={styles.welcome}>Today's Meeting List</Text>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
          <FlatList
            data={this.state.userlist}
            renderItem={({ item }) => <Text style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 20}}>{item}<TouchableOpacity onPress={() => { alert('calling') }}
            style={{
              backgroundColor: 'rgb(100, 37, 255)',
              padding: 10,
              margin: 15,
              height: 40,
            }}>
            <Text style={{ color: 'white' }} > calling </Text>
          </TouchableOpacity ></Text>}
          />
          
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
      </View>
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