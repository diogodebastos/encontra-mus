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
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

class SplashScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome Simão!',
  };

  constructor(props) {
    super(props);
    this.state = { text: 'Insert Party Name...' };
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

          <LinearGradient colors={['#E57C7A', '#E5A27A']} style={styles.joinButton}>
            <Button
              onPress={() => navigate('Join')}
              title="Join a Friend's Session"
            >
            </Button>
          </LinearGradient>

          <LinearGradient colors={['#E57C7A', '#E5A27A']} style={styles.createButton}>
            <Button
              onPress={() => navigate('Create')}
              title="Create a Session"
            >
            </Button>
          </LinearGradient>

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
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Fourth test here!</Text>
      </View>
    );
  }
}


const mus_mark2 = StackNavigator({
  Splash: { screen: SplashScreen },
  Join: { screen: JoinSession },
  Create: { screen: CreateSession },
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
    marginTop: 12,
    borderRadius: 6,
    paddingTop: 5,
    height: 50,
    backgroundColor: "rgba(0,0,0,0)",
  },
  createButton: {
    marginTop: 12,
    borderRadius: 6,
    paddingTop: 5,
    height: 50,
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
  }
});

AppRegistry.registerComponent('mus_mark2', () => mus_mark2);
