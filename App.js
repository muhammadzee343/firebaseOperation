/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {firebaseConfig} from './config';
import {Item, Input, Label} from 'native-base';

class App extends Component {
  render() {
    return (
      <View>
        <Item floatingLabel>
          <Label>Username</Label>
          <Input />
        </Item>
      </View>
    );
  }
}

export default App;
