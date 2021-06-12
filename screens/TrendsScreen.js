import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableHighlight, TouchableOpacity} from "react-native";
import firebase from 'firebase/app';
import auth from 'firebase/auth';
import { LineChart } from 'react-native-chart-kit';

const TrendsScreen = ({ navigation }) => {
  const [foodHistory, setFoodHistory] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [graphData, setGraphData] = useState({});
  let xAxisArr = [];
  let yAxisArr = [];
  let processedData = [];

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
          console.log(key, '||', index, '||', data[key]);
          newArr.push({ ...data[key], id: key});
        });
        setFoodHistory(newArr);
        setFetched(true);
      } else {
        setFoodHistory([]);
      }
    })
  }

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Trends</Text>
      <LineChart 
        data = {graphData}
        width = {500}
        height = {600}
        chartConfig = {chartConfig}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3eb489',
    justifyContent:'center',
    alignItems:'center'
  }
});

export default TrendsScreen;