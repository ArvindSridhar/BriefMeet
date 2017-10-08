import React, { Component } from 'react';
import { Text, View, ScrollView, ActivityIndicator, ListView, StyleSheet, Button, Alert, TextInput, Image, Dimensions} from 'react-native';
import { Constants } from 'expo';
import {
  StackNavigator,
} from 'react-navigation'; // 1.0.0-beta.13
import ActionBar from 'react-native-action-bar' // 2.0.2
import { Card, List, ListItem } from 'react-native-elements'
import Modal from 'react-native-modal'

const list = [
  {
    name: 'Golden Bear Orientation',
    description: 'Very long and tiring ordeal. This seven day orientation made you not want to stay in school jk... kinda...',
    date: 'August 16'
  },
  {
    name: 'CalHacks 4.0',
    description: 'Super Fun Hackathon #CalHacks #GoBears',
    date: 'October 8'
  },  

]

function getEvents() {
  var url = 'http://127.0.0.1:5000/users/59d9a6d97deabb0728a5e5a6/events';
  return fetch(url).then((res) => res.json());
}

function getEventsUsers(eid) {
  var url = 'http://127.0.0.1:5000/events/' + eid +  '/users';
  return fetch(url).then((res) => res.json());
}

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
    header: null
  };

  state = {
    inputValue: "",
    inputValue2: ""
  };
  
  _handleButtonPress = () => {

  
    this.props.navigation.navigate('Events');
  };

  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };
  
  _handleTextChange2 = inputValue2 => {
    this.setState({ inputValue2 });
  };

  render() {
    return (
      <View style={styles.container}>
        
        <Text style={styles.paragraph}>
            BRIEFMEET
        </Text>
        
        <Image
          source={{ uri: 'https://maxcdn.icons8.com/Share/icon/p1em/Photo_Video//camera1600.png' }}
          style={{ height: 140, width: 200 }}
        />
      
        <TextInput
          value={this.state.inputValue}
          onChangeText={this._handleTextChange}
          style={{ width: 200, height: 44, padding: 8, textAlign: 'center', marginBottom: 20, marginTop: 40, backgroundColor: '#86c5da', borderRadius: 8, color: '#ffffff', width:300}}
          placeholder={'Username'}
          placeholderTextColor={'#ffffff'}
        />
      
        <TextInput
          value={this.state.inputValue2}
          onChangeText={this._handleTextChange2}
          style={{ width: 200, height: 44, padding: 8, textAlign: 'center', marginBottom: 30, backgroundColor: '#86c5da', borderRadius: 8, color: '#ffffff', width:300}}
          placeholder={'Password'}
          placeholderTextColor={'#ffffff'}
        />
      
        <Button
          title="Login"
          onPress={this._handleButtonPress}
          style={{color: '#86c5da', backgroundColor: '#86c5da'}}
          color='#4ba9c8'
        />
      
      </View>
    );
  }
  
  _handlePress = () => {
    this.props.navigation.navigate('Login');
  }
}

class EventScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      events: []
    }
  }
  componentWillMount(){
    getEvents().then((res)=> {
      this.setState({
        events: res
      })
    })
  }
  static navigationOptions = {
    title: 'Events',
    header: null,
    
  };  
  _goToRoster = () => {
    this.props.navigation.navigate('Roster');
  };

  render() {
    console.log("Events: ", this.state.events, this.state.events['description'])
    return (
      <View style= {{paddingTop: Constants.statusBarHeight, backgroundColor: '#ecf0f1'}}>
        
        <ActionBar
          backgroundColor="#86c5da"
          barStyle="light-content"
          title={'Events'}
          titleStyle={{textAlign:'center', fontSize:30, letterSpacing: 3, marginBottom:21}}
        />    
      <ScrollView >
            {
              this.state.events.map((event, index) => (
                  <Card key={index}>
                    <Text>{this.state.events[index]['headline']}</Text>
                    <Text style={{marginBottom: 10}}>
                      {this.state.events[index]['description']}
                    </Text>

                    <Button
                      icon={{name: 'code'}}
                      backgroundColor='#03A9F4'
                      fontFamily='Lato'
                      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                      title='Event Roster'
                      onPress={ this._goToRoster }/>
                  </Card>
                 
              ))
            }
      
      </ScrollView>
      </View>

    );
  }
  
  _handlePress = () => {
    this.props.navigation.navigate('Login');
  }
  
}


class RosterScreen extends Component {
  static navigationOptions = {
    title: 'Roster'
  };
 
  render() {
    return (
      <View style={styles.container}>
        
      <ScrollView >
            {
              list.map((event, index) => (
                  <Card key={index}>
                    <Text>{this.state.events['headline']}</Text>
                    <Text style={{marginBottom: 10}}>
                      {this.state.events['description']}
                    </Text>

                    <Button
                      icon={{name: 'code'}}
                      backgroundColor='#03A9F4'
                      fontFamily='Lato'
                      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                      title='Event Roster'
                      onPress={ ()=>{console.log('here')} }/>
                  </Card>
                 
              ))
            }
      
      </ScrollView>
      </View>
    );
  }
  
  _handlePress = () => {
    this.props.navigation.navigate('Login');
  }
}


export default StackNavigator({
  Login: {
      screen: LoginScreen,
  },
  Events: {
      screen: EventScreen,
  },
  Roster: {
      screen: RosterScreen,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },

  paragraph: {
    margin: 30,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
    fontFamily: 'Arial',
    letterSpacing: 8,
    paddingTop: 40,
  },
  eventBox: {
    // flexDirection: 'row',
    // height: 100,
    // backgroundColor: '#d5eaf2',
    // borderColor:'black'
  },
});
