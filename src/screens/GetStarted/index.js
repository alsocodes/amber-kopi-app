import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button, Gap} from '../../components';
import {colors, fonts} from '../../res';
import {IL_GetStarted_PNG, Logo_Amber} from '../../res/images/Illustrations';

const GetStarted = ({navigation}) => {
  setTimeout(() => {
    navigation.replace('MainApp');
  }, 2000);
  return (
    <View style={styles.screen}>
      <Image source={Logo_Amber} style={styles.image} />
      {/* <View style={styles.wrapperSlogan}>
        <Text style={styles.txtSlogan}>Shop Your Daily </Text>
        <Text style={styles.txtSlogan}>Necessary</Text>
      </View>
      <Gap height={90} />
    */}
      {/* <Button
        onPress={() => navigation.replace('MainApp')}
        text="Get Started"
      /> */}
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
    backgroundColor: colors.darkGreen,
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
