import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, Image} from "react-native";
import { FoodServer } from '../api/FoodServer';
import firebase from 'firebase/app';
import auth from 'firebase/auth';
import { storeFoodData } from '../helper/fb-calorie-mate';
import { Platform } from 'react-native';
import  moment  from 'moment';

const FoodAnalysisScreen = ({ navigation, route }) => {
  const [food, setFood] = useState(route.params.item);
  const [result, setResult] = useState([]);
  const [foodData, setFoodData] = useState({name: '', calories: '', date: ''});
  const [calories, setCalories] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const foodName = food.food_name;
  const postData = {'query' : foodName};
  const imgUrl = food.photo.thumb;

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
    })

    var date = moment().format('MM/DD/YYYY')
    setCurrentDate(date);
    console.log(currentDate);
  }, []);

  useEffect(() => {
    if (result && calories) {
      console.log(timestamp);
      setFoodData({name: foodName, calories: calories, date: currentDate});
      console.log(foodData);
    }
  }, [result, calories]);

  function successMessage() {
    alert('Food data stored successfully! ✅ Returning to Home');
    setTimeout(function(){return true;}, 3000);
  }
 
  return (
    <SafeAreaView style={styles.container}>
        <Image style={styles.image} source={imgUrl} />
        <Text style={styles.text}>Food: {foodName}</Text>
        <Text style={styles.text}>Calories: {calories} </Text>
        <TouchableOpacity style={styles.button}
          onPress={() => {
            storeFoodData(firebase.auth().currentUser.uid, {foodData});           
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
  image: {
    width:100,
    height:100,
    marginBottom:20
  },
  text: {
    color:'white',
    fontSize:18
  },
  button: {
    borderRadius:8,
    backgroundColor:'#1B4E3B',
    padding:10,
    marginTop:20
  }
});

export default FoodAnalysisScreen;