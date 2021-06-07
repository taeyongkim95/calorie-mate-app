import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import Autocomplete from 'react-native-autocomplete-input';
import { FoodServer } from '../api/FoodServer';

const AddFoodScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foods, setFoods] = useState([]);
  const [selectedValue, setSelectedValue] = useState({});
  const placeholder = "What did you eat?";
  const [showList, setShowList] = useState(false);

  // useEffect(() => {
  //   getFoods((data)=> {
  //     console.log('received: ', data.common);
  //     setFoods(data.common.map(data => (data.food_name)));
  //   });
  // }, [searchQuery]);


  // const getFoods =  async (callback) => {
  //   const response = await FoodServer.get(
  //     `search/instant?query=${searchQuery}`
  //   );
  //   callback(response.data);
  // }

  const fetchData = (e) => {
    setShowList(true);
    setSearchQuery(e);
    FoodServer.get(
      `search/instant?query=${e}`
    ).then((response)=> {
      console.log(searchQuery);
      setFoods(response.data.common.map(data => (data.food_name)));
    })
  }

  return (
    <TouchableWithoutFeedback onPress={() => setShowList(false)}>
      <SafeAreaView style={styles.container}>
        <Autocomplete 
          autoCapitalize="none"
          autoCorrect={false}
          data={
            showList == true ? foods : []
          }
          value={searchQuery}
          onChangeText={(text)=>fetchData(text)}
          placeholder={placeholder}
          style={styles.input}
          inputContainerStyle={styles.inputContainer}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                console.log("yo");
                setSearchQuery(item);
              }}
              style={styles.itemText}
              >
              <Text>
                  {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity 
          onPress={() => {
            navigation.navigate('Food Analysis', {
              searchQuery
            })
          }}>
          <Text>I ate this</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3eb489',
    justifyContent:'center',
    alignItems:'center'
  },
  inputContainer: {
    borderWidth: 0,
    alignSelf: 'center'
  },
  input: {
    borderRadius:8,
    padding:10,
    backgroundColor: 'white',
    borderWidth:0
  },
  itemText: {
    fontSize:24,
    zIndex:7000
  }
});

export default AddFoodScreen;