import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, FlatList} from "react-native";
import firebase from 'firebase/app';
import auth from 'firebase/auth';
import storage from 'firebase/storage';

const ImageScreen = ({ route, navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <Text>Image</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3eb489',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:50
  }
});

export default ImageScreen;