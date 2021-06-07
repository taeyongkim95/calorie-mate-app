import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView} from "react-native";

const FoodAnalysisScreen = ({ navigation, route }) => {
  const [food, setFood] = useState(route.params.searchQuery);

  return (
    <SafeAreaView style={styles.container}>
        <Text>{food}</Text>
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

export default FoodAnalysisScreen;