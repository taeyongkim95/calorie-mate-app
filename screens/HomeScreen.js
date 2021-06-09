import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableHighlight, TouchableOpacity} from "react-native";
import firebase from 'firebase/app';
import auth from 'firebase/auth';
import { SimpleLineIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {

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
      <TouchableHighlight style={styles.button} onPress={()=> navigation.navigate('Add Food')}>
        <Text>I just ate</Text>
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

export default HomeScreen;