import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, Image} from "react-native";
import { FoodServer } from '../api/FoodServer';

const FoodAnalysisScreen = ({ navigation, route }) => {
  const [food, setFood] = useState(route.params.item);
  const [result, setResult] = useState([]);

  const foodName = food.food_name;
  const postData = {'query' : foodName};
  const imgUrl = food.photo.thumb;

  useEffect(()=> {
    FoodServer.post('natural/nutrients', postData)
    .then((response)=> {
      setResult(response.data.foods[0]);
    });
  }, []);

  console.log({result});

  return (
    <SafeAreaView style={styles.container}>
        <Image style={styles.image} source={imgUrl} />
        <Text style={styles.text}>Food: {foodName}</Text>
        <Text style={styles.text}>Calories: {result.nf_calories}</Text>
        <TouchableOpacity style={styles.button}>
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
    color:'white'
  },
  button: {
    borderRadius:8,
    backgroundColor:'#1B4E3B',
    padding:10,
    marginTop:20
  }
});

export default FoodAnalysisScreen;