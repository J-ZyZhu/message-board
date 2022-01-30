import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, FlatList} from "react-native";
import Constants from "expo-constants";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDmUwfNjLPX0rwn0eLNyfamgMZpezwBV5g",
  authDomain: "message-board-ef401.firebaseapp.com",
  projectId: "message-board-ef401",
  storageBucket: "message-board-ef401.appspot.com",
  messagingSenderId: "667922338265",
  appId: "1:667922338265:web:3c800e75b37f43f3a7c9c8",
  measurementId: "G-QS39Y9B47W",
};
firebase.initializeApp(firebaseConfig);


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: " ",
      messages: [],
    };

    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    firebase
      .database()
      .ref()
      .child("messages")
      .once("value", (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data) {
          const initMessages = [];
          Object.keys(data).forEach((message) =>
            initMessages.push(data[message])
          );
          this.setState({
            messages: initMessages,
          });
        }
      });

    firebase
      .database()
      .ref()
      .child("messages")
      .on("child_added", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.setState((prevState) => ({
            messages: [data, ...prevState.messages],
          }));
        }
      });
  }

  addItem() {
    if (!this.state.message) return;

    const newMessage = firebase.database().ref().child("messages").push();
    newMessage.set(this.state.message, () => this.setState({ message: "" }));
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.msgBox}>
          <TextInput
            placeholder="Enter your message"
            onChangeText={(text) => this.setState({ message: text })}
            style={styles.txtInput}
          />
          <Button title="Send" onPress={this.addItem} />
        </View>
        <FlatList
          data={this.state.messages}
          renderItem={({ item }) => (
            <View style={styles.listItemContainer}>
              <Text style={styles.listItem}>{item}</Text>
            </View>
          )}
        />
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
  listItemContainer: {
    backgroundColor: "#fff",
    margin: 5,
    borderRadius: 5,
  },
  listItem: {
    fontSize: 20,
    padding: 10,
  },
});
