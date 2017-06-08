import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';

export default class GpsApp extends Component {
  render() {
    return (
      <Text>Hello world!</Text>
    );
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('GpsApp', () => GpsApp);