import { AsyncStorage } from 'react-native';
import { FOOD_APP_KEY, FOOD_API_KEY } from './FoodKey';
import axios from 'axios';
import { returnQuery } from '../screens/AddFoodScreen';

const FoodServer = axios.create({
  baseURL: 'https://trackapi.nutritionix.com/v2/',
});

FoodServer.interceptors.request.use(
  async (config) => {
    config.headers.common['x-app-id'] = FOOD_APP_KEY;
    config.headers.common['x-app-key'] = FOOD_API_KEY;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const getFoods = async (callback) => {
  const response = await FoodServer.get(
    `search/instant?query=`
  );
  callback(response.data);
}

export const getCalories = async (callback) => {
  const response = await FoodServer.post()
}

export default FoodServer;