import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {colors, fonts} from '../../res';
import {Logo_Amber} from '../../res/images/Illustrations';

const GetStarted = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'light';
  const {loggedIn} = useSelector(state => state.auth);
  console.log('GS', loggedIn);
  setTimeout(() => {
    if (loggedIn) navigation.replace('MainApp');
    else navigation.replace('Signin');
  }, 2000);
  return (
    <SafeAreaView style={styles.flex1}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'#34d399'}
      />
      <View style={styles.screen}>
        <Image source={Logo_Amber} style={styles.image} />
      </View>
    </SafeAreaView>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  flex1: {flex: 1},
  screen: {
    flex: 1,
    // paddingHorizontal: 20,
    justifyContent: 'center',
    // backgroundColor: '#49111c',
    backgroundColor: '#34d399',
    justifyItems: 'center',
  },
  image: {
    height: 400,
    width: 400,
    alignSelf: 'center',
  },
  wrapperSlogan: {marginTop: 51},
  txtSlogan: {
    fontSize: 30,
    color: colors.primary,
    textAlign: 'center',
    fontFamily: fonts.SemiBold,
  },
});
