import {
  Icon,
  Input,
  Stack,
  Button,
  HStack,
  Box,
  Center,
  Heading,
  VStack,
  FormControl,
  Link,
  Image,
} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import {Button, Gap} from '../../components';
import {colors, fonts} from '../../res';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons';

import {logoAmberColorSm} from '../../res/images/Illustrations';

const Signup = ({navigation}) => {
  const [show, setShow] = useState(false);
  return (
    <Center w="100%" justifyItems={'center'} h="100%" bg={colors.lightGrey}>
      <Box
        safeArea
        p="8"
        w="80%"
        // maxW="350"
        bg={colors.white}
        borderRadius={10}>
        <Center mb={2}>
          <Image source={logoAmberColorSm} alt="Alternate Text" />
        </Center>
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}>
          Daftar akun
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs">
          Lengkapi data berikut ini!
        </Heading>

        <VStack space={2} mt="5">
          <FormControl>
            <FormControl.Label>Nama</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Phone</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" />
          </FormControl>
          <Button mt="2" colorScheme="primary">
            Daftar
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}>
              Saya sudah punya akun.{' '}
            </Text>
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              onPress={() => navigation.replace('Signin')}>
              Masuk
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Signup;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
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
