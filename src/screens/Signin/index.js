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
  IconButton,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import {Button, Gap} from '../../components';
import {colors, fonts} from '../../res';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons';

import {logoAmberColorSm} from '../../res/images/Illustrations';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../store/actions/authActions';

const Signin = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    setButtonDisabled(password === '' || emailOrPhone === '');
  }, [emailOrPhone, password]);

  const dispatch = useDispatch();
  const onSignin = () => {
    const params = {emailOrPhone, password};
    // console.log(params);
    dispatch(login(params));
  };

  const {loading, loggedIn} = useSelector(state => state.auth);
  useEffect(() => {
    // Navigate to main interface after successfully logged in
    if (loggedIn) {
      navigation.replace('MainApp');
    }
  }, [loggedIn]);

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
        {/* <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}>
          Selamat datang
        </Heading> */}
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          textAlign={'center'}
          size="xs">
          Sign in untuk melanjutkan!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email/Phone</FormControl.Label>
            <Input
              autoComplete="off"
              autoCapitalize="none"
              // defaultValue={emailOrPhone}
              onChangeText={setEmailOrPhone}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type={show ? 'text' : 'password'}
              InputRightElement={
                <IconButton
                  icon={<FontAwesomeIcon icon={show ? faEye : faEyeSlash} />}
                  onPress={() => setShow(!show)}
                />
              }
              // defaultValue={password}
              onChangeText={setPassword}
            />
            <Link
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: 'indigo.500',
              }}
              alignSelf="flex-end"
              mt="1">
              Lupa passowrd?
            </Link>
          </FormControl>
          <Button
            mt="2"
            // isLoading={loading}
            colorScheme="primary"
            onPress={onSignin}
            disabled={buttonDisabled}>
            Masuk
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}>
              Saya belum punya akun.{' '}
            </Text>
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              onPress={() => navigation.replace('Signup')}>
              Daftar
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Signin;

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
