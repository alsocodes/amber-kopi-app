import {
  Input,
  Button,
  Box,
  Center,
  Heading,
  VStack,
  FormControl,
  Image,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {colors} from '../../res';

import {logoAmberColorSm} from '../../res/images/Illustrations';
import {useDispatch, useSelector} from 'react-redux';
import {
  resetActionResult,
  resetPassword,
} from '../../store/actions/authActions';

const RequestReset = ({navigation}) => {
  const dispatch = useDispatch();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    dispatch(resetActionResult());
  }, [dispatch]);

  useEffect(() => {
    setButtonDisabled(emailOrPhone === '');
  }, [emailOrPhone]);

  const onSignin = () => {
    const params = {emailOrPhone};
    dispatch(resetPassword(params));
  };

  const {actionResult, loading} = useSelector(state => state.auth);
  useEffect(() => {
    if (
      actionResult?.type === 'resetPassword' &&
      actionResult?.success === true
    ) {
      navigation.replace('Signin');
      dispatch(resetActionResult());
    }
  }, [actionResult]);

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
          <Image source={logoAmberColorSm} alt="Alternate Text" />
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
          Masukkan Email atau Nomor whatsapp untuk reset password!
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
          <Button
            mt="2"
            isLoading={loading}
            borderRadius={20}
            colorScheme="emerald"
            variant={'solid'}
            onPress={onSignin}
            disabled={buttonDisabled}>
            Reset Password
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default RequestReset;
