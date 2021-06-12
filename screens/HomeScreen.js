import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableHighlight, TouchableOpacity} from "react-native";
import firebase from 'firebase/app';
import auth from 'firebase/auth';
import { SimpleLineIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

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
      <Animatable.View animation="pulse" easing="ease-in-out" iterationDelay="800" delay="800" iterationCount="infinite" >
        <TouchableHighlight style={styles.button} onPress={()=> navigation.navigate('Add Food')}>
          <Text style={styles.buttonText}>I just ate</Text>
        </TouchableHighlight>
      </Animatable.View>

      <TouchableOpacity style={styles.trendButton} onPress={()=> navigation.navigate('Trends')}>
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
    alignItems:'center'
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
    width:150,
    marginTop:80,
    textAlign: 'center'
  },
  trendButtonText: {
    color: '#fff'
  }
});

export default HomeScreen;