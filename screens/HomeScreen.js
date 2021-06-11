import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableHighlight, TouchableOpacity} from "react-native";
import firebase from 'firebase/app';
import auth from 'firebase/auth';
import { SimpleLineIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {

  var userName = firebase.auth().currentUser.displayName;

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{flexDirection:'row'}}
          onPress={() => {
            firebase.auth().signOut(), 
            navigation.navigate("Log In")
            }
          }
        >
          <SimpleLineIcons style={{marginLeft:10, marginRight:8}} name="logout" size={24} color='#3eb489' />
          <Text style={{fontSize:18, color:'#3eb489'}}>Log Out</Text>
        </TouchableOpacity>
      ),
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeMessage}>Welcome! {userName}</Text>
      <TouchableHighlight style={styles.button} onPress={()=> navigation.navigate('Add Food')}>
        <Text style={styles.buttonText}>I just ate</Text>
      </TouchableHighlight>
      <TouchableOpacity style={styles.trendButton}>
        <Text style={styles.trendButtonText}>Trends</Text>
      </TouchableOpacity>
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
  welcomeMessage: {
    color: '#fff',
    fontSize:22,
    marginBottom:40
  },
  button: {
    height:120,
    width:120,
    borderRadius:60,
    backgroundColor:'#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:'#3eb489',
    fontSize:18
  },
  trendButton: {
    backgroundColor: '#1B4E3B',
    borderRadius:8,
    padding:10,
    minWidth:150,
    marginTop:80,
    textAlign: 'center'
  },
  trendButtonText: {
    color: '#fff'
  }
});

export default HomeScreen;