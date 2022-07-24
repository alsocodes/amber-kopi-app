import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {colors, fonts} from '../../res';
import {Logo_Amber} from '../../res/images/Illustrations';

const GetStarted = ({navigation}) => {
  const {loggedIn} = useSelector(state => state.auth);
  setTimeout(() => {
    if (loggedIn) navigation.replace('MainApp');
    else navigation.replace('Signin');
  }, 2000);
  return (
    <View style={styles.screen}>
      <Image source={Logo_Amber} style={styles.image} />
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
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
