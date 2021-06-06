import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity} from "react-native";
import Autocomplete from 'react-native-autocomplete-input';
import { getFoods } from '../api/FoodServer';

const AddFoodScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foods, setFoods] = useState([]);
  const [selectedValue, setSelectedValue] = useState({});

  useEffect(() => {
    getFoods((data)=> {
      console.log('received: ', data.common);
      setFoods(data.common.map(data => (data.food_name)));
    });
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <Autocomplete 
        autoCapitalize="none"
        autoCorrect={false}
        data={foods}
        onChangeText={(text) => setSearchQuery({text})}
        placeholder="What did you eat?"
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedValue(item);
            }}>
            <Text style={styles.itemText}>
                {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3eb489',
    justifyContent:'center',
    alignItems:'center'
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default AddFoodScreen;