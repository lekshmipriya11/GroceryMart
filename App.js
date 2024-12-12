import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import HomeScreen from './src/Home';
import LogInScreen from './src/LogIn';
import RegistrationScreen from './src/Registration';
import {RecoilLoadable, RecoilRoot} from 'recoil';
import {
  DETAILS,
  HOME,
  HOME_CONTAINER_SCREEN,
  LOGIN,
  MYCART,
  PRODUCT_LIST,
  REGISTRATION,
} from './src/utils/Constant';
import ProductsListScreen from './src/ProductList';
import Toast from 'react-native-toast-message';
import ProductDetailsScreen from './src/ProDetails';
import MyCart from './src/AddToCart';
import HomeContainerScreen from './src/HomeContainer';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const Stack = createNativeStackNavigator();
  return (
    <View style={styles.root}>
      <RecoilRoot>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={HOME}
              component={HomeScreen}
              options={{header: () => null}}
            />
            <Stack.Screen
              name={LOGIN}
              component={LogInScreen}
              options={{header: () => null}}
            />
            <Stack.Screen
              name={REGISTRATION}
              component={RegistrationScreen}
              options={{header: () => null}}
            />
            <Stack.Screen
              name={PRODUCT_LIST}
              component={ProductsListScreen}
              options={{header: () => null}}
            />
            <Stack.Screen
              name={DETAILS}
              component={ProductDetailsScreen}
              options={{header: () => null}}
            />
            <Stack.Screen
              name={MYCART}
              component={MyCart}
              options={{header: () => null}}
            />
            <Stack.Screen
              name={HOME_CONTAINER_SCREEN}
              component={HomeContainerScreen}
              options={{header: () => null}}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </RecoilRoot>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
export default App;
