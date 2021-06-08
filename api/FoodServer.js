import { FOOD_APP_KEY, FOOD_API_KEY } from './FoodKey';
import axios from 'axios';

export const FoodServer = axios.create({
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

export const getCalories = async (callback) => {
  const response = await FoodServer.post()
}

export default FoodServer;