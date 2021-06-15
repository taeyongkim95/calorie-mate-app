import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableHighlight, TouchableOpacity} from "react-native";
import firebase from 'firebase/app';
import auth from 'firebase/auth';
import { SimpleLineIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const HomeScreen = ({ navigation }) => {
  const [foodHistory, setFoodHistory] = useState([]);
  const [graphData, setGraphData] = useState({});
  let xAxisArr = [];
  let yAxisArr = [];
  let processedData = [];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    var holder = {};
    foodHistory.forEach(function(d) {
      if (holder.hasOwnProperty(d.date)) {
        holder[d.date] = holder[d.date] + d.calories;
      } else {
        holder[d.date] = d.calories;
      }
    });

    for (var prop in holder) {
      processedData.push({ date: prop, calories: holder[prop]});
    }

    xAxisArr = processedData.map((item) => {
      return item.date;
    });
    yAxisArr = processedData.map((item) => {
      return item.calories;
    });

    var tempGraphData = {labels: xAxisArr, datasets: [{data: yAxisArr}]};
    setGraphData(tempGraphData);
  }, [foodHistory]);
  
  var user = firebase.auth().currentUser;

  const fetchData = () => {
    firebase.database().ref('users/' + user.uid).on('value', (snapshot) => {
      if (snapshot.val()) {
        const data = snapshot.val();
        const newArr = [];
        Object.keys(data).map((key, index) => {
          newArr.push({ ...data[key], id: key});
        });
        setFoodHistory(newArr);
      } else {
        setFoodHistory([]);
      }
    })
  }

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
      <Animatable.View animation="pulse" easing="ease-in-out" iterationCount="infinite" >
        <TouchableHighlight style={styles.button} onPress={()=> navigation.navigate('Add Food')}>
          <Text style={styles.buttonText}>I just ate</Text>
        </TouchableHighlight>
      </Animatable.View>

      <TouchableOpacity style={styles.trendButton} onPress={()=> navigation.navigate('Trends', {foodHistory, graphData})}>
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
    borderRadius:12,
    padding:10,
    width:150,
    marginTop:80,
    textAlign: 'center'
  },
  trendButtonText: {
    color: '#fff',
    textAlign: 'center'
  }
});

export default HomeScreen;

function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}