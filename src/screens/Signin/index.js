import {
  Input,
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
  Text,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Linking} from 'react-native';
import {colors} from '../../res';
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
    <Center w="100%" justifyItems={'center'} h="100%" bg={colors.white}>
      <Box
        safeArea
        py="6"
        px="8"
        w="100%"
        // maxW="350"
        bg={colors.white}
        borderRadius={10}>
        <Center mb={2}>
          <Image source={logoAmberColorSm} alt="Logo" />
        </Center>
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
              onPress={() => navigation.navigate('RequestReset')}
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: 'emerald.500',
              }}
              alignSelf="flex-end"
              mt="1">
              Lupa passowrd?
            </Link>
          </FormControl>
          <Button
            mt="2"
            isLoading={loading}
            borderRadius={20}
            colorScheme="emerald"
            variant={'solid'}
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
                color: 'emerald.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              // onPress={() => navigation.navigate('Signup')}>
              onPress={() => Linking.openURL('https://amberkopi.my.id/signup')}>
              {' '}
              Daftar
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Signin;
