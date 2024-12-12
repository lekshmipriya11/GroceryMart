import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MyCart from './AddToCart';
import {MYCART, PRODUCT_LIST} from './utils/Constant';
import ProductsListScreen from './ProductList';
import { GREEN } from './utils/Colors';

const Tab = createMaterialBottomTabNavigator();
const HomeContainerScreen = () => {
  return (
    <Tab.Navigator activeColor="#f0edf6" inactiveColor="#3e2465" barStyle={{ backgroundColor:GREEN}}>
      <Tab.Screen name={PRODUCT_LIST} component={ProductsListScreen} />
      <Tab.Screen name={MYCART} component={MyCart} />
    </Tab.Navigator>
  );
};

export default HomeContainerScreen;
