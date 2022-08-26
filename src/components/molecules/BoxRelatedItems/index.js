import {Image, Text, View} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';

const BoxRelatedItems = ({image, name, price, bgColor, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 150,
        marginRight: 15,
        overflow: 'hidden',
      }}>
      <Image
        borderRadius={8}
        alt={'product-image-alt'}
        source={image}
        style={{width: '100%', resizeMode: 'cover', aspectRatio: 4 / 3}}
      />
      <View>
        <Text flex="1" numberOfLines={2} color={'gray.600'}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BoxRelatedItems;
