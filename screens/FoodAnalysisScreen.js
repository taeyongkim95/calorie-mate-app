import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, Image, View, Platform} from "react-native";
import { FoodServer } from '../api/FoodServer';
import firebase from 'firebase/app';
import auth from 'firebase/auth';
import storage from 'firebase/storage';
import { storeFoodData } from '../helper/fb-calorie-mate';
import * as ImagePicker from 'expo-image-picker';
import  moment  from 'moment';

const FoodAnalysisScreen = ({ navigation, route }) => {
  const [food, setFood] = useState(route.params.item);
  const [result, setResult] = useState([]);
  const [foodData, setFoodData] = useState({name: '', calories: '', date: ''});
  const [calories, setCalories] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [userPhoto, setUserPhoto] = useState(false);
  const [image, setImage] = useState(null);

  var urlDate = moment().format('MMDDYY');
  var user = firebase.auth().currentUser;
  const reference = firebase.storage().ref().child('/' + user.uid + '/' + food.food_name + urlDate);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setUserPhoto(true);

      
      const tempReference = '/' + user.uid + '/' + food.food_name + urlDate;
      
      setFoodData({name: foodName, calories: calories, date: currentDate, imageURL: tempReference});
      console.log(foodData);
    }
  };

  const foodName = food.food_name;
  const postData = {'query' : foodName};

  var currentTime = new Date();
  var timeStampDay = currentTime.getDay();
  var timeStampMonth = currentTime.getMonth()
  var timeStampYear = currentTime.getFullYear();
  var timestamp = `${timeStampMonth}/${timeStampDay}/${timeStampYear}`;

  useEffect(()=> {
    FoodServer.post('natural/nutrients', postData)
    .then((response)=> {
      setCalories(response.data.foods[0].nf_calories);
      setResult(response.data.foods[0]);
      setImage(food.photo.thumb);
    })
    
    var date = moment().format('MM/DD/YYYY');
    setCurrentDate(date);
  }, []);

  useEffect(() => {
    if (result && calories) {
      setFoodData({name: foodName, calories: calories, date: currentDate});
    }
  }, [result, calories]);

  function successMessage() {
    alert('Food data stored successfully! ✅ Returning to Home');
    setTimeout(function(){return true;}, 3000);
  }
 
  return (
    <SafeAreaView style={styles.container}>
        <Image resizeMode="contain" style={styles.image} source={{uri: image}} />
        <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
          <Text style={styles.text}>Take your own photo</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Food: {foodName}</Text>
        <Text style={styles.text}>Calories: {calories} </Text>
        <TouchableOpacity style={styles.button}
          onPress={async () => {
            storeFoodData(firebase.auth().currentUser.uid, {foodData});
            if (userPhoto) {
              const blob = await fetch(image);
              const imagePath = await blob.blob();
              await reference.put(imagePath);
            }
            successMessage();
            navigation.navigate('Home');
          }}>
          <Text style={styles.text}>Confirm</Text>
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
  },
  cameraButton: {
    borderRadius:12,
    backgroundColor:'#1B4E3B',
    padding:10,
    marginTop:20,
    marginBottom:40
  },
  image: {
    width:150,
    height:150
  },
  text: {
    color:'white',
    fontSize:18
  },
  button: {
    borderRadius:12,
    backgroundColor:'#1B4E3B',
    padding:10,
    marginTop:20
  }
});

export default FoodAnalysisScreen;