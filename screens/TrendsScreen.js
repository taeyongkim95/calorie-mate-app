import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, FlatList, TouchableOpacity } from "react-native";
import firebase from 'firebase/app';
import auth from 'firebase/auth';
import { LineChart } from 'react-native-chart-kit';

const TrendsScreen = ({ route, navigation }) => {
  const [foodHistory, setFoodHistory] = useState(route.params?.foodHistory);
  const [graphData, setGraphData] = useState(route.params?.graphData);

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    if (route.params?.foodHistory) {
      setFoodHistory(route.params.foodHistory);
    }
    if (route.params?.graphData) {
      setGraphData(route.params.graphData);
    }
  }, [route.params?.foodHistory, route.params?.graphData])

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(27, 78, 59, ${opacity})`,
    strokeWidth: 4,
    barPercentage: 0.3,
    propsForLabels: {fontFamily: 'OpenSans_400Regular'},
    decimalPlaces:0
  };

  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>  
      <Text style={styles.historyText}>Food: {item.name}</Text>
      <Text style={styles.historyText}>Calories: {item.calories} </Text>
      <Text style={styles.historyDate}>Date: {item.date}</Text>
      {item.imageURL &&
        <TouchableOpacity onPress={()=> navigation.navigate('Image', {item})}>
          <Text style={styles.historyPhotoText}>View your photo</Text>
        </TouchableOpacity>
      }
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chartContainer}>
          <LineChart 
            data = {graphData}
            width = {screenWidth * 0.9}
            height = {330}
            chartConfig = {chartConfig}
            fromZero = {true}
            renderDotContent={({x, y, index, indexData}) => 
              <Text key={x + y} style={{fontSize:10, position:'absolute', top: y - 8, left:x + 8}}>
                {round(indexData, 0)} cal
              </Text>
            }
          />
      </View>
      <ScrollView style={styles.historyContainer}>
          <Text style={styles.historyHeader}>Consumption History</Text>
          <FlatList 
            keyExtractor = {item => item.id}
            data = {foodHistory}
            renderItem = {renderItem}
          />
      </ScrollView>
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
  dotLabel: {
    fontSize:50
  },
  chartContainer: {
    borderRadius: 12,
    flex: 1
  },
  historyContainer: {
    flex: 1,
    width: '90%',
    borderRadius: 12,
    marginTop: 40,
    marginBottom:40
  },
  historyHeader: {
    fontSize:22,
    color: 'white',
    paddingBottom:30,
    textAlign: 'center'
  },
  historyItem: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    width: '100%',
    borderRadius: 12,
    marginTop:10
  },
  historyText: {
    fontSize:18
  },
  historyPhotoText: {
    fontSize: 16,
    color:'#1B4E3B',
    fontWeight: 'bold',
    textAlign:'center'
  },
  historyDate: {
    textAlign: 'right',
    fontSize: 10
  }
});

export default TrendsScreen;

function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}