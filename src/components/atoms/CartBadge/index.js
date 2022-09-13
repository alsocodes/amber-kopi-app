import {faShoppingBasket} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Box, HStack, IconButton, Text} from 'native-base';
import React from 'react';
import {colors} from '../../../res';

const CartBadge = ({onPress, dark, value}) => {
  return (
    <HStack justifyContent={'center'} w={10}>
      <IconButton
        onPress={onPress}
        variant="ghost"
        borderRadius={10}
        color={colors.grey}
        borderColor={colors.grey}
        alignItems="center"
        justifyContent="center"
        height={10}
        minWidth={8}
        _icon={{color: dark ? colors.white : colors.grey}}
        icon={<FontAwesomeIcon icon={faShoppingBasket} size={24} />}
      />
      {value > 0 && (
        <Box
          w={4}
          h={4}
          borderRadius={8}
          bgColor={'danger.500'}
          p={0}
          ml={-6}
          mt={0}>
          <Text
            color={'white'}
            bold
            textAlign={'center'}
            fontSize={10}
            alignSelf={'center'}
            p={0}>
            {value}
          </Text>
        </Box>
      )}
    </HStack>
  );
};

export default CartBadge;
