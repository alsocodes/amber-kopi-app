import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  colors,
  IC_Favorite,
  IC_Favorite_color,
  IC_Home,
  IC_Home_color,
  IC_Notification,
  IC_Notification_color,
  IC_Profile,
  IC_Profile_color,
  IC_Cart,
  IC_Cart_color,
} from '../../../res';

import {faHome, faUserAlt, faReceipt} from '@fortawesome/free-solid-svg-icons';
import {Center, HStack, VStack} from 'native-base';

const Icon = ({label, isFocused}) => {
  switch (label) {
    case 'Home':
      return (
        <FontAwesomeIcon
          icon={faHome}
          size={24}
          color={isFocused ? colors.primary : colors.semiLightGrey}
        />
      );
    // return isFocused ? <IC_Home_color /> : <IC_Home />;
    case 'Transaksi':
      // return isFocused ? <IC_Cart_color /> : <IC_Cart />;
      return (
        <FontAwesomeIcon
          icon={faReceipt}
          size={24}
          color={isFocused ? colors.primary : colors.semiLightGrey}
        />
      );
    case 'Akun':
      // return isFocused ? <IC_Profile_color /> : <IC_Profile />;
      return (
        <FontAwesomeIcon
          icon={faUserAlt}
          size={24}
          color={isFocused ? colors.primary : colors.semiLightGrey}
        />
      );
    default:
      return <FontAwesomeIcon icon={faHome} size={24} color={colors.primary} />;
  }
};

const BottomNavigator = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            style={{padding: 14}}
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <Center>
              <Icon label={label} isFocused={isFocused} />
              <Text
                style={{
                  color: isFocused ? colors.primary : colors.semiLightGrey,
                  fontSize: 12,
                  paddingTop: 2,
                }}>
                {label}
              </Text>
            </Center>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 32,
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: colors.lightGrey,
  },
});
