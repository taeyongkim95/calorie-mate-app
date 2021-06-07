import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableWithoutFeedback, TouchableHighlight} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
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
      <SafeAreaView style={styles.container}>
        <View style={styles.inputAndButton}>
          <Autocomplete 
            autoCapitalize="none"
            autoCorrect={false}
            data={foods}
            OnFocus={() => setShowList(true)}
            onBlur={() => setShowList(false)}
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

          <TouchableHighlight 
            onPress={() => {
              navigation.navigate('Food Analysis', {
                searchQuery
              })
            }}
            style={styles.button}>
            <Text style={{color:'white'}}>I ate this</Text>
          </TouchableHighlight>

        </View>
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
  inputAndButton: {
    zIndex:7000,
    flexDirection: 'row',
    position:'absolute'
  },
  inputContainer: {
    borderWidth: 0,
    alignSelf: 'center'
  },
  input: {
    borderRadius:8,
    padding:10,
    backgroundColor: 'white',
    borderWidth:0,
    flex:5,
    fontFamily: 'OpenSans_400Regular',
    zIndex:6000
  },
  itemText: {
    zIndex:7000,
    position:'absolute'
  },
  button: {
    flex:1,
    padding:10,
    borderRadius:8,
    backgroundColor:'#1B4E3B',
    marginLeft:10
  }
});

export default AddFoodScreen;