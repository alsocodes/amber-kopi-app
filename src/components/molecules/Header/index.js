import {Box, Hidden, Text} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../res';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';

const Header = ({drawer, back, cart, onPress, title}) => {
  return (
    <View style={styles.wrapperHeader}>
      {back ? (
        <TouchableOpacity onPress={onPress} style={{padding: 10, width: 40}}>
          <FontAwesomeIcon icon={faChevronLeft} color={colors.grey} />
        </TouchableOpacity>
      ) : (
        <Box></Box>
      )}
      {title && (
        <Text
          color={'gray.600'}
          numberOfLines={1}
          fontSize={18}
          fontWeight={'semibold'}>
          {title}
        </Text>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  wrapperHeader: {
    flexDirection: 'row',
    // justifyContent: '',
    alignItems: 'center',
    // paddingHorizontal: 20,
    paddingLeft: 10,
    paddingRight: 20,
    paddingVertical: 10,
  },
});
