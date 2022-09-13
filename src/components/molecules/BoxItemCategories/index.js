import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../../res';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import {faMugSaucer} from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';
import {Text, View} from 'native-base';

const BoxItemCategories = ({text, color, icon, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View
        borderWidth={1}
        borderColor={'gray.200'}
        borderRadius={8}
        px={3}
        py={2}>
        <FontAwesomeIcon size={24} icon={faCoffee} color={colors.primary} />
      </View>
      <Text color={'gray.600'} fontSize={16}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default BoxItemCategories;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 17,
    marginTop: 2,
  },

  icon: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
  },

  wrapperImg: color => ({
    height: 60,
    width: 60,
    backgroundColor: color,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  }),
});
