import {Box, Image, Pressable, Text} from 'native-base';
import React from 'react';

const ProductItemCard = ({name, image, onPress}) => (
  <Pressable
    overflow="hidden"
    style={{aspectRatio: 154 / 172}}
    bgColor="white"
    borderRadius={5}
    // shadow={3}
    onPress={onPress}
    android_ripple={{color: '#ddd'}}>
    <Box
      flex={1}
      position="relative"
      alignItems="center"
      justifyContent="center"
      bgColor="primary.200">
      <Text fontSize="3xl" color="white">
        {name.substr(0, 2).toUpperCase()}
      </Text>
      <Image
        source={image}
        alt={name}
        position="absolute"
        width="100%"
        height="100%"
        resizeMode="cover"
        zIndex={1}
      />
    </Box>
    <Text
      textAlign="center"
      padding={2}
      fontSize="sm"
      noOfLines={1}
      isTruncated>
      {name}
    </Text>
  </Pressable>
);

export default ProductItemCard;
