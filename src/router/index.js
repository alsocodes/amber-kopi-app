import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Cart, GetStarted, Home, Notification, Profile} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomNavigator from '../components/molecules/BottomNavigator';
import Categories from '../screens/Categories';
import Detail from '../screens/Detail';
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import Checkout from '../screens/Checkout';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MainApp() {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen name="Cart" component={Cart} options={{headerShown: false}} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

const Router = () => {
  const auth = useSelector(state => state.auth);
  console.log('auth', auth);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="GetStarted"
          component={GetStarted}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainApp"
          component={MainApp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signin"
          component={Signin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Categories"
          component={Categories}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({});
