import React, { Component } from 'react';
import { TouchableOpacity, Slider, Image, Picker, ScrollView, Vibration,Text, View, ActivityIndicator, ListView, StyleSheet, Button, Alert, TextInput, Dimensions} from 'react-native';
import { Camera, Video, FileSystem, Permissions, Constants } from 'expo';
import {
  StackNavigator,
} from 'react-navigation'; // 1.0.0-beta.13
import ActionBar from 'react-native-action-bar' // 2.0.2
import { Card, List, ListItem } from 'react-native-elements'
import Modal from 'react-native-modal'
// import ActionButton from 'react-native-action-button'



import GalleryScreen from './GalleryScreen';

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};


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

function getEvents(user) {
  var url = 'http://127.0.0.1:5000/users/' + user + '/events';
  console.log(url)
  return fetch(url).then((res) => res.json()).catch(function(error){console.error(error)});
}

function getEventsUsers(eid) {
  console.log('eidin', eid)
  var url = 'http://127.0.0.1:5000/events/' + eid +  '/users';
  console.log(url)
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
    //change back to Event
    //make login request here
    user = this.state.inputValue
    passhash = this.state.inputValue2

    var url = 'http://127.0.0.1:5000/login'
    var val = '';
    val = fetch(url, {
      method: 'POST',
      headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
      body: JSON.stringify({
          username: user,
          passhash: passhash
        })
    })
    .then((response) => response.text())
    .then((responseText) => {
      console.log(responseText);
      val = responseText;

      if (val == "Login successful") {
          this.props.navigation.navigate('Events', {user: user});
      } 
    })
    .catch((error) => {
      console.log(error);
    });
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
      events: [],
      index: 0,
    }
  }
  componentWillMount(){
    getEvents(this.props.navigation.state.params.user).then((res)=> {
      this.setState({
        events: res
      })
    })
  }
  static navigationOptions = {
    title: 'Events',
    header: null,
  };  
  _goToRoster = (eid) => {
    console.log('eid',eid)
    this.props.navigation.navigate('Roster', {event_id: eid});
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
                      onPress={ ()=>{this._goToRoster(this.state.events[index]['_id']['$oid'])}}/>
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
  constructor(props){
    super(props);
    this.state = {
      users: [],
      index: 0,
    }
  }

  _goToAdd = () => {
    this.props.navigation.navigate('Add');
  };


  componentWillMount(){
    getEventsUsers(this.props.navigation.state.params.event_id).then((res)=> {
      this.setState({
        users: res
      })
    })
  }


  static navigationOptions = {
    //nav bar removed title
  };
 

  render() {
    console.log("Users: ", this.state.users)
    return (
      <View>  

      <ActionBar
        backgroundColor="#86c5da"
        barStyle="light-content"
        title={'Roster'}
        titleStyle={{textAlign:'center', fontSize:30, letterSpacing: 3, marginBottom:21}}
        rightIcons={[
          {
            name: 'plus',
            onPress: () => console.log('Right Plus !'),
          }
          ]}
      />    
      <ScrollView >
            {
              this.state.users.map((user, index) => (
                  <Card key={index}>
                    <Text>{this.state.users[index].fullname}</Text>
                    <Text style={{marginBottom: 10}}>
                      {this.state.users[index].description}
                    </Text>
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


class CameraScreen extends React.Component {
  static navigationOptions = {
    title: 'Add'
  };  
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    ratios: [],
    photoId: 1,
    showGallery: false,
    photos: [],
  };

  componentDidMount() {
    FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + 'photos'
    ).catch(e => {
      console.log(e, 'Directory exists');
    });
  }

  getRatios = async function() {
    const ratios = await this.camera.getSupportedRatios();
    return ratios;
  };

  toggleView() {
    this.setState({
      showGallery: !this.state.showGallery,
    });
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  setRatio(ratio) {
    this.setState({
      ratio,
    });
  }

  toggleWB() {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance],
    });
  }

  toggleFocus() {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
    });
  }

  zoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
    });
  }

  zoomIn() {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
    });
  }

  setFocusDepth(depth) {
    this.setState({
      depth,
    });
  }

  takePicture = async function() {
    if (this.camera) {
      this.camera.takePictureAsync().then(data => {
        FileSystem.moveFile({
          from: data,
          to: `${FileSystem.documentDirectory}photos/Photo_${this.state
            .photoId}.jpg`,
        }).then(() => {
          this.setState({
            photoId: this.state.photoId + 1,
          });
          Vibration.vibrate();
        });
      });
    }
  };

  renderGallery() {
    return <GalleryScreen onPress={this.toggleView.bind(this)} />;
  }

  renderCamera() {
    return (
      <Camera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}>
        <View
          style={{
            flex: 0.5,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={this.toggleFacing.bind(this)}>
            <Text style={styles.flipText}> FLIP </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={this.toggleFlash.bind(this)}>
            <Text style={styles.flipText}>
              {' '}FLASH: {this.state.flash}{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={this.toggleWB.bind(this)}>
            <Text style={styles.flipText}>
              {' '}WB: {this.state.whiteBalance}{' '}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.4,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}>
          <Slider
            style={{ width: 150, marginTop: 15, alignSelf: 'flex-end' }}
            onValueChange={this.setFocusDepth.bind(this)}
            value={this.state.depth}
            step={0.1}
            disabled={this.state.autoFocus === 'on'}
          />
        </View>
        <View
          style={{
            flex: 0.1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomIn.bind(this)}>
            <Text style={styles.flipText}> + </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomOut.bind(this)}>
            <Text style={styles.flipText}> - </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
            onPress={this.toggleFocus.bind(this)}>
            <Text style={styles.flipText}>
              {' '}AF : {this.state.autoFocus}{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.flipButton,
              styles.picButton,
              { flex: 0.3, alignSelf: 'flex-end' },
            ]}
            onPress={this.takePicture.bind(this)}>
            <Text style={styles.flipText}> SNAP </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.flipButton,
              styles.galleryButton,
              { flex: 0.25, alignSelf: 'flex-end' },
            ]}
            onPress={this.toggleView.bind(this)}>
            <Text style={styles.flipText}> Gallery </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.showGallery ? this.renderGallery() : this.renderCamera()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ivory',
  },
  navigation: {
    flex: 1,
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  item: {
    margin: 4,
    backgroundColor: 'indianred',
    height: 35,
    width: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  galleryButton: {
    backgroundColor: 'indianred',
  },
  row: {
    flexDirection: 'row',
  }, 
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
  Add: {
    screen: CameraScreen,
  }
});

