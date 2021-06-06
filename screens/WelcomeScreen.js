import React, {useState} from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableHighlight} from "react-native";

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableHighlight style={styles.button}>
        <Text>Add</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3eb489',
    justifyContent:'center',
    alignItems:'center',
    fontFamily:'San Francisco'
  },
  button: {
    height:150,
    width:150,
    borderRadius:75,
    backgroundColor:'#fff',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default WelcomeScreen;