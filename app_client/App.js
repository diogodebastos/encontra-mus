import React from 'react';
import Component from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  TextInput,
  WebView,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import axios from 'axios'

class SplashScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome Simão!',
  };

  constructor(props) {
    super(props);
    this.state = { text: '...' };

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <LinearGradient colors={['#5C258D', '#4389A2']} style={styles.linearGradient}>

          <TextInput
            style={styles.searchBox}
            onChangeText={(text) => global.username = text}
            value={global.username}
          />

          <LinearGradient colors={['#E57C7A', '#E5A27A']} style={styles.enterUser}>
            <Button
              onPress={() => navigate('Home')}
              title="Enter Username"
            >
            </Button>
          </LinearGradient>

          <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Latitude: {this.state.latitude}</Text>
            <Text>Longitude: {this.state.longitude}</Text>
            {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
          </View>

        <Text style={styles.textSplash}>müs</Text>
      </LinearGradient>
    );
  }
}

class JoinSession extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Joining...',
  });

  constructor(props) {
    super(props);
    this.state = { text: '...' };

    this.state = {
      latitude: 1,
      longitude: 1,
      error: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        fetch(`http://91adbe76.ngrok.io/room/${global.qrcode}/refresh/${global.username}/${this.state.latitude}/${this.state.longitude}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }).then((res) => console.log(res))
        .catch((err) => console.log(err))
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    return (
      <View>
        <MapView
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0,
            longitudeDelta: 0,
          }}
        style={styles.mapCreate}></MapView>

          <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Latitude: {this.state.latitude}</Text>
            <Text>Longitude: {this.state.longitude}</Text>
            {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
          </View>

      </View>
    );
  }
}

class CreateSession extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Creating...',
  });

  constructor(props) {
    super(props);
    this.state = { text: '...' };

    this.state = {
      latitude: 1,
      longitude: 1,
      error: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    return (
      <View>

        <MapView
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0,
            longitudeDelta: 0,
          }}
        style={styles.mapCreate}></MapView>

          <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Latitude: {this.state.latitude}</Text>
            <Text>Longitude: {this.state.longitude}</Text>
            {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
          </View>

      </View>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
  });

  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.state2 = { text2: '' };
  }

  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    return (
      <View>
        <LinearGradient colors={['#E57C7A', '#E5A27A']} style={styles.joinButton}>

          <TextInput
            style={styles.joinBox}
            //onChangeText={(text) => this.setState({glo: text})}
            //value={this.state.text1}
            onChangeText={(text) => global.qrcode = text}
            value={global.qrcode}
          />
          <Button
          onPress={() => {
            //console.log(this.state.text1)
            fetch(`http://91adbe76.ngrok.io/room/${global.qrcode}/join/${global.username}`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
            }).then((res) => console.log(res))
            .catch((err) => console.log(err))
            navigate('Join')}
          }
            title="Join a Friend's Party"
          >
          </Button>
        </LinearGradient>

        <LinearGradient colors={['#5C258D', '#4389A2']} style={styles.createButton}>

          <TextInput
            style={styles.createBox}
            //onChangeText={(text) => this.setState({text2: text})}
            //value={this.state.text2}
            onChangeText={(text) => global.qrcode = text}
            value={global.qrcode}
          />
          <Button
            onPress={() => {
              //console.log(this.state.text2)
              fetch(`http://91adbe76.ngrok.io/room/${global.qrcode}/create`, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                }
              }).then((res) => console.log(res))
              .catch((err) => console.log(err))
              navigate('Join')}
            }
            title="Create a Party"
          >
          </Button>
        </LinearGradient>

      </View>
    );
  }
}


const mus_mark2 = StackNavigator({
  Splash: { screen: SplashScreen },
  Join: { screen: JoinSession },
  Create: { screen: CreateSession },
  Home: { screen: HomeScreen },
});

const styles = StyleSheet.create({
  textSplash: {
    color: "#FFF",
    marginLeft: -36,
    marginRight: -90,
    marginTop: -10,
    textAlign: "left",
    fontSize: 180,
    fontFamily: "Avenir-Black",
    backgroundColor: "rgba(0,0,0,0)",
  },
  joinButton: {
    marginTop: 0,
    paddingTop: -100,
    height: 255,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 100,
    backgroundColor: "rgba(0,0,0,0)",
  },
  createButton: {
    marginTop: 0,
    paddingTop: -100,
    height: 255,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 100,
    backgroundColor: "rgba(0,0,0,0)",
  },
  linearGradient: {
    height: 505,
    paddingLeft: 25,
    paddingRight: 25,
  },
  searchBox: {
    borderRadius: 6,
    marginTop: 160,
    paddingLeft: 15,
    height: 50,
    backgroundColor: "#4389A2",
    color: 'white',
    fontFamily: "Avenir-Light",
  },
  enterUser: {
    marginTop: 12,
    borderRadius: 6,
    paddingTop: 5,
    height: 50,
    backgroundColor: "rgba(0,0,0,0)",
    marginBottom: 29,
  },
  mapCreate: {
    width: 400,
    height: 510,
  },
  createBox: {
    borderRadius: 6,
    marginTop: 90,
    paddingLeft: 15,
    height: 50,
    backgroundColor: "#4389A2",
    color: 'white',
    fontFamily: "Avenir-Light",
  },
  joinBox: {
    borderRadius: 6,
    marginTop: 90,
    paddingLeft: 15,
    height: 50,
    backgroundColor: "#4389A2",
    color: 'white',
    fontFamily: "Avenir-Light",
  },
});

AppRegistry.registerComponent('mus_mark2', () => mus_mark2);
