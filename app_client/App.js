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
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
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
  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Third test here!</Text>
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
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    return (
      <View>

        <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Latitude: {this.state.latitude}</Text>
          <Text>Longitude: {this.state.longitude}</Text>
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        </View>

        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        style={styles.mapCreate}></MapView>

      </View>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
  });
  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    return (
      <View>
        <LinearGradient colors={['#E57C7A', '#E5A27A']} style={styles.joinButton}>
          <Button
            onPress={() => navigate('Join')}
            title="Join a Friend's Party"
          >
          </Button>
        </LinearGradient>

        <LinearGradient colors={['#5C258D', '#4389A2']} style={styles.createButton}>
          <Button
            onPress={() => navigate('Create')}
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
    paddingTop: 105,
    height: 255,
    backgroundColor: "rgba(0,0,0,0)",
  },
  createButton: {
    marginTop: 0,
    paddingTop: 105,
    height: 255,
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
    height: 500,
  }
});

AppRegistry.registerComponent('mus_mark2', () => mus_mark2);
