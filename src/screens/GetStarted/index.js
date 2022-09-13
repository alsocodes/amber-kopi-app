import {Button, HStack, Modal, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Logo_Amber} from '../../res/images/Illustrations';
import {checkVersion} from '../../store/actions/appActions';

const currentVersion = 3;
const GetStarted = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'light';
  const {loggedIn} = useSelector(state => state.auth);
  const {version} = useSelector(state => state.app);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!version) return;
    if (version?.versionNumber > currentVersion) {
      setShowModal(true);
    } else {
      if (loggedIn) navigation.replace('MainApp');
      else navigation.replace('Signin');
    }
    console.log('version', version);
  }, [loggedIn, version]);

  const onSkip = () => {
    if (version?.isMandatory) return;
    if (loggedIn) navigation.replace('MainApp');
    else navigation.replace('Signin');
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkVersion());
  }, [dispatch]);
  return (
    <SafeAreaView style={styles.flex1}>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(version?.isMandatory)}>
        <Modal.Content maxWidth="400px">
          {/* <Modal.CloseButton /> */}
          <Modal.Header>Update Aplikasi</Modal.Header>
          <Modal.Body>
            <Text mb={2} fontWeight={'semibold'}>
              Versi Terbaru {version?.versionCode} telah tersedia
            </Text>
            <Text>Perubahan :</Text>
            {version?.description?.split('|')?.map((item, index) => {
              return <Text key={index}>- {item}</Text>;
            })}
          </Modal.Body>
          <HStack space={3} justifyContent="space-between" py={4} px={4}>
            {/* <Button.Group space={2}> */}
            <Button
              borderRadius={20}
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => onSkip()}>
              Lewati
            </Button>
            <Button
              borderRadius={20}
              variant="solid"
              colorScheme={'emerald'}
              onPress={() =>
                Linking.openURL(
                  'https://play.google.com/store/apps/details?id=com.amberkopi',
                )
              }>
              Update Sekarang
            </Button>
            {/* </Button.Group> */}
          </HStack>
        </Modal.Content>
      </Modal>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'#34d399'}
      />
      <View style={styles.screen}>
        <Image source={Logo_Amber} style={styles.image} />
      </View>
    </SafeAreaView>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  flex1: {flex: 1},
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#34d399',
    justifyItems: 'center',
  },
  image: {
    height: 400,
    width: 400,
    alignSelf: 'center',
  },
});
