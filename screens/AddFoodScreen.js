import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, View, FlatList, TouchableOpacity} from "react-native";
import { Input } from 'react-native-elements';
import { FoodServer } from '../api/FoodServer';

const AddFoodScreen = ({navigation}) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [foods, setFoods] = useState([]);
  const placeholder = "What did you eat?";

  const fetchData = (e) => {
    setSearchQuery(e);
    FoodServer.get(
      `search/instant?query=${e}`
    ).then((response)=> {
      setFoods(response.data.common);
    })
  }

  const renderFoodList = ({item}) => {
    console.log(item);
    <TouchableOpacity
      onPress={() => {
        console.log("yo");
      }}
      style={styles.itemText}
    >
        <Text>
            {item.food_name}
        </Text>
    </TouchableOpacity>
  };

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.upperHalf}>
          <View style={styles.inputContainer}>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text)=>fetchData(text)}
              placeholder={placeholder}
              style={styles.input}
            />
          </View>
        </View>
         
        <View style={styles.listContainer}>
          <View style={styles.list}>
              <FlatList
                data = {foods}
                keyExtractor = {(item, index) => index.toString()}
                extraData = {searchQuery}
                renderItem = {({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Food Analysis', {
                        item
                      })
                    }}
                    style={styles.itemText}
                  >
                      <Text>
                          {item.food_name}
                      </Text>
                  </TouchableOpacity>
                  )}
              />
          </View>
        </View>
      </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3eb489',
    justifyContent:'center',
  },
  upperHalf: {
    flex:1
  },
  inputContainer: {
    flex:1,
    position:'absolute',
    bottom:0,
    right:0,
    left:0,
    width:'100%',
    justifyContent:'center'
  },
  input: {
    borderRadius:12,
    padding:10,
    backgroundColor: 'white',
    zIndex:3000
  },
  listContainer: {
    flex:1,
    overflow:'scroll'
  },
  list: {
    borderRadius:12,
    backgroundColor: 'white',
    top:0,
    position:'absolute',
    left:'5%',
    right:0,
    width:'90%'
  },
  itemText: {
    padding:10,
  }
});

export default AddFoodScreen;