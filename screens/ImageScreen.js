import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image} from "react-native";
import firebase from 'firebase/app';
import auth from 'firebase/auth';
import storage from 'firebase/storage';

const ImageScreen = ({ route, navigation }) => {
  const [foodData, setFoodData] = useState(route.params.item);
  const [imageURL, setImageURL] = useState('');
  
  var reference = firebase.storage().ref(foodData.imageURL);

  useEffect(() => {
    setFoodData(route.params?.item);
    reference.getDownloadURL()
    .then(url => {setImageURL(url)})
    .catch(e => {console.log(e)});
    console.log(imageURL);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image resizeMode="contain" style={styles.image} source={{uri: imageURL}} />
      <View  style={styles.info}>
        <Text>{foodData.name}</Text>
        <Text>Calories: {foodData.calories} cal </Text>
        <Text>Date eaten: {foodData.date} </Text>
      </View>  
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
  },
  image: {
    width: 400,
    height: 400,
    zIndex: 5000
  },
  info: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 20
  }
});

export default ImageScreen;