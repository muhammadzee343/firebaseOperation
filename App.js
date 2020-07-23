/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {firebaseConfig} from './config';
import firebase from 'firebase';
import {Item, Input, Label, Button} from 'native-base';

class App extends Component {
  state = {
    stateText: '',
    myList: [],
  };

  saveitem() {
    const manualAddChild = firebase.database().ref('wishes');
    manualAddChild.push({
      text: this.state.stateText,
      time: Date.now(),
    });
  }

  render() {
    return (
      <View>
        <Item floatingLabel>
          <Label>Username</Label>
          <Input
            value={this.state.stateText}
            onChangeText={(text) => this.setState({stateText: text})}
          />
        </Item>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 20,
          }}>
          <Button
            rounded
            success
            style={styles.btnstyle}
            onPress={() => this.saveitem()}>
            <Text style={styles.textstyle}>Add</Text>
          </Button>
          <Button danger rounded style={styles.btnstyle}>
            <Text style={styles.textstyle}>Delete All</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnstyle: {
    width: 160,
    padding: 15,
    justifyContent: 'center',
  },
  textstyle: {
    fontSize: 20,
  },
});

export default App;
