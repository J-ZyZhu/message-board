import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import Constants from "expo-constants";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      massage: " ",
    };
    
    this.addItem = this.addItem.bind(this)
  }

  addItem () {
    //firebase to send data
  }
  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.msgBox}>
          <TextInput
            placeholder="Enter your massage"
            onChangeText={(text) => this.setState({ message: text })}
            style = {styles.txtInput}
          />
          <Button title="Send" onPress = {this.addItem}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    marginTop: Constants.statusBarHeight,
  },
  msgBox: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#fff",
  },
  txtInput: {
    flex: 1,
  },
});
