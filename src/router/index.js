import React from 'react';
import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Cart, GetStarted, Home, Notification, Profile} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomNavigator from '../components/molecules/BottomNavigator';
import Categories from '../screens/Categories';
import Detail from '../screens/Detail';
import Signin from '../screens/Signin';
import Checkout from '../screens/Checkout';
import Transaksi from '../screens/Transaksi';
import Search from '../screens/Search';
import TransaksiDetail from '../screens/TransaksiDetail';
import Tracking from '../screens/Tracking';
import TransaksiReseller from '../screens/TransaksiReseller';
import RequestReset from '../screens/RequestReset';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MainApp() {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Transaksi"
        component={Transaksi}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Akun"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

const Router = () => {
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
          name="Cart"
          component={Cart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Search"
          component={Search}
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
        <Stack.Screen
          name="TransaksiDetail"
          component={TransaksiDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tracking"
          component={Tracking}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TransaksiReseller"
          component={TransaksiReseller}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RequestReset"
          component={RequestReset}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({});
