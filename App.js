/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {firebaseConfig} from './config';
import firebase from 'firebase';
import {Item, Input, Label, Button, List, ListItem} from 'native-base';

class App extends Component {
  state = {
    stateText: '',
    myList: [],
  };

  // post data method

  saveitem() {
    const manualAddChild = firebase.database().ref('wishes');
    manualAddChild.push().set({
      text: this.state.stateText,
      time: Date.now(),
    });
    this.setState({stateText: ''});
  }

  //fetch data from firebase method and change the state and save fetched data in array

  showdata() {
    const fetchdata = firebase.database().ref('wishes');
    fetchdata.on('value', (datasnap) => {
      this.setState({myList: Object.values(datasnap.val())});
    });
  }

  render() {
    // move data from array to list

    const myitems = this.state.myList.map((item) => {
      return (
        <ListItem>
          <Text>{item.text}</Text>
          <Text>{item.time}</Text>
        </ListItem>
      );
    });
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
          <Button
            danger
            rounded
            style={styles.btnstyle}
            onPress={() => this.showdata()}>
            <Text style={styles.textstyle}>Delete All</Text>
          </Button>
        </View>

        <View>{myitems}</View>
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
