import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Header} from '../../components';
import {colors} from '../../res';

import {getImageUri} from '../../services/api';
import {
  PermissionsAndroid,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {
  Image,
  Pressable,
  Badge,
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  ScrollView,
  Skeleton,
  Stack,
  StatusBar,
  Text,
  VStack,
  useToast,
  Spacer,
  AlertDialog,
} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUpload, faCopy, faTruck} from '@fortawesome/free-solid-svg-icons';
import {
  createConfirmPayment,
  fetchBankaccounts,
  fetchSale,
  resetActionResult,
  resetSale,
} from '../../store/actions/saleActions';
import {ddMmYyHhIi, formatNumber} from '../../helper/utils';
// import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const TransaksiDetail = ({route, navigation}) => {
  const dataParams = route.params;
  const {id} = dataParams;
  const isDarkMode = useColorScheme() === 'dark';
  // console.log(dataParams);

  const {sale, saleFetching, bankaccounts, actionResult, isLoading} =
    useSelector(state => state.sale);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetSale());
    dispatch(resetActionResult());
    dispatch(fetchSale(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log('xxxxxxxxxx', saleFetching, sale?.length);
    if (sale?.status === 'pending') dispatch(fetchBankaccounts());
  }, [sale]);

  useEffect(() => {
    // console.log(saleFetching, sale);
    // if (sale?.status === 'pending') dispatch(fetchBankaccounts());
    if (actionResult?.success == true) dispatch(fetchSale(id));
  }, [actionResult]);

  const [filePath, setFilePath] = useState({});

  useEffect(() => {
    console.log('filePath', filePath?.assets?.[0]?.uri);
  }, [filePath]);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        //alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: true,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: false,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          //alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          //alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          //alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          //alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        // setFilePath(response);
        setFilePath(response?.assets?.[0]);
      });
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        //alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        //alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        //alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        //alert(response.errorMessage);
        return;
      }
      // console.log('base64 -> ', response);
      console.log('base64 -> ', response.base64);
      // console.log('uri -> ', response.uri);
      // console.log('width -> ', response.width);
      // console.log('height -> ', response.height);
      // console.log('fileSize -> ', response.fileSize);
      // console.log('type -> ', response.type);
      // console.log('fileName -> ', response.fileName);
      setFilePath(response?.assets?.[0]);
    });
  };

  const [paymentName, setPaymentName] = useState('');
  const [paymentBank, setPaymentBank] = useState('');
  const [paymentAccount, setPaymentAccount] = useState('');
  const [paymentNominal, setPaymentNominal] = useState('');

  const toast = useToast();
  const toastError = msg => {
    toast.show({
      title: msg,
      placement: 'bottom',
      bgColor: 'red.600',
    });
  };

  const onConfirmBayar = () => {
    if (paymentName === '') return toastError('Nama Rek harus diisi');
    if (paymentAccount === '') return toastError('Nomor Rek harus diisi');
    if (paymentBank === '') return toastError('Nama Bank harus diisi');
    if (paymentNominal === '') return toastError('Nominal harus diisi');
    if (!filePath?.uri) return toastError('Upload bukti transfer');

    const data = {
      id: sale?.id,
      confirmPaymentName: paymentName,
      confirmPaymentBank: paymentBank,
      confirmPaymentAmount: paymentNominal,
      confirmPaymentAccount: paymentAccount,
      paymentSlip: filePath.base64,
    };
    dispatch(createConfirmPayment(data));
  };

  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (refreshing) dispatch(fetchSale(id));
  }, [refreshing]);

  const [modalUpload, setModalUpload] = useState(false);

  return (
    <SafeAreaView style={{backgroundColor: colors.white, height: '100%'}}>
      <Box
        bg="white"
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 1,
        }}>
        <Header
          title="Detail Transaksi"
          back={true}
          onPress={() => navigation.goBack()}
        />
      </Box>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'#34d399'}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Stack py={2} px={4}>
          {saleFetching ? (
            <VStack>
              <Box
                p={2}
                _dark={{
                  borderColor: 'gray.600',
                }}
                borderColor="coolGray.200"
                py="2"
                borderWidth={1}
                borderRadius={5}
                mb={2}
                px="2">
                <VStack space={3}>
                  <HStack justifyContent={'space-between'}>
                    <Skeleton.Text lines={1} width={'20%'} />
                    <Skeleton.Text lines={1} width={'30%'} />
                  </HStack>
                  <HStack justifyContent={'space-between'}>
                    <Skeleton.Text lines={1} width={'15%'} />
                    <Skeleton.Text lines={1} width={'25%'} />
                  </HStack>
                  <HStack justifyContent={'space-between'}>
                    <Skeleton.Text lines={1} width={'20%'} />
                    <Skeleton.Text lines={1} width={'40%'} />
                  </HStack>
                  <HStack justifyContent={'space-between'}>
                    <Skeleton.Text lines={1} width={'15%'} />
                    <Skeleton.Text lines={1} width={'25%'} />
                  </HStack>
                </VStack>
              </Box>
              <Box
                p={2}
                _dark={{
                  borderColor: 'gray.600',
                }}
                borderColor="coolGray.200"
                py="2"
                borderWidth={1}
                borderRadius={5}
                mb={2}
                px="2">
                <VStack space={3}>
                  <HStack justifyContent={'space-between'}>
                    <Skeleton.Text lines={1} width={'20%'} />
                    <Skeleton.Text lines={1} width={'30%'} />
                  </HStack>
                </VStack>
              </Box>
              <Box
                p={2}
                _dark={{
                  borderColor: 'gray.600',
                }}
                borderColor="coolGray.200"
                py="2"
                borderWidth={1}
                borderRadius={5}
                mb={2}
                px="2">
                <VStack space={3}>
                  <HStack justifyContent={'space-between'}>
                    <Skeleton.Text lines={1} width={'60%'} />
                    <Skeleton.Text lines={1} width={'30%'} />
                  </HStack>
                  <HStack justifyContent={'space-between'}>
                    <Skeleton.Text lines={1} width={'40%'} />
                    <Skeleton.Text lines={1} width={'30%'} />
                  </HStack>
                  <HStack justifyContent={'space-between'}>
                    <Skeleton.Text lines={1} width={'20%'} />
                    <Skeleton.Text lines={1} width={'60%'} />
                  </HStack>
                  <HStack justifyContent={'space-between'}>
                    <Skeleton.Text lines={1} width={'20%'} />
                    <Skeleton.Text lines={1} width={'50%'} />
                  </HStack>
                </VStack>
              </Box>
            </VStack>
          ) : (
            <>
              <Box
                p={2}
                _dark={{
                  borderColor: 'gray.600',
                }}
                borderColor="coolGray.200"
                py="2"
                borderWidth={1}
                borderRadius={5}
                mb={2}
                px="2">
                <HStack
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  mb={1}>
                  <Text fontSize={14}>No Transaksi</Text>
                  <Text fontSize={14} bold color={'gray.600'}>
                    #{sale?.no}
                  </Text>
                </HStack>
                <HStack
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  mb={1}>
                  <Text fontSize={14}>Tanggal</Text>
                  <Text fontSize={14} bold color={'gray.600'}>
                    {ddMmYyHhIi(new Date(sale?.date))}
                  </Text>
                </HStack>
                <HStack
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  mb={1}>
                  <Text fontSize={14}>Total</Text>
                  <Text fontSize={14} bold color={'gray.600'}>
                    Rp{formatNumber(sale?.grandTotal || 0)}
                  </Text>
                </HStack>
                <HStack
                  justifyContent={'space-between'}
                  alignItems={'baseline'}
                  mb={1}>
                  <Text fontSize={14}>Status</Text>
                  <VStack alignItems={'flex-end'}>
                    <Text fontSize={14} bold color={'gray.600'}>
                      {sale?.status?.toUpperCase()}
                    </Text>
                    <Badge colorScheme={'info'}>
                      {sale?.status === 'pending'
                        ? 'Menunggu pembayaran'
                        : sale?.status === 'paid'
                        ? 'Pembayaran diterima'
                        : sale?.status === 'delivery'
                        ? 'Barang dalam pengiriman'
                        : sale?.status === 'received'
                        ? 'Barang diterima'
                        : 'Transaksi Selesai'}
                    </Badge>
                  </VStack>
                </HStack>
                {sale?.status === 'done' && (
                  <HStack
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    mb={1}>
                    <Text fontSize={14}>Selesai pada</Text>
                    <Text fontSize={14} bold color={'gray.600'}>
                      {ddMmYyHhIi(new Date(sale?.doneAt))}
                    </Text>
                  </HStack>
                )}
              </Box>
              <Box
                p={2}
                _dark={{
                  borderColor: 'gray.600',
                }}
                borderColor="coolGray.200"
                py="2"
                borderWidth={1}
                borderRadius={5}
                mb={2}
                px="2">
                <Text py={2} bold>
                  Pembayaran
                </Text>
                {sale?.status === 'pending' && sale?.confirmPaymentAt !== null && (
                  <Badge borderRadius={5} colorScheme={'info'}>
                    Pembayaran sedang divalidasi
                  </Badge>
                )}
                {sale?.status !== 'pending' && sale?.paidAt !== null && (
                  <Badge
                    borderRadius={5}
                    py={2}
                    colorScheme={'info'}
                    textAlign={'center'}>
                    <Text fontSize={14}>
                      Pembayaran telah diterima pada{' '}
                      {ddMmYyHhIi(new Date(sale?.paidAt))}
                    </Text>
                  </Badge>
                )}
                {sale?.status === 'pending' && sale?.confirmPaymentAt === null && (
                  <Box>
                    <Text>
                      {bankaccounts?.length === 1
                        ? `Silakan transfer nominal Rp${formatNumber(
                            sale?.grandTotal || 0,
                          )} ke rekening berikut :`
                        : ''}
                      {bankaccounts?.length > 1
                        ? `Silakan transfer nominal Rp${formatNumber(
                            sale?.grandTotal || 0,
                          )} ke salah satu rekening berikut :`
                        : ''}
                    </Text>
                    {bankaccounts?.map(item => (
                      <VStack px={4} mb={2} key={item.account}>
                        <HStack>
                          <Text>
                            {item.bank} - {item.account}
                          </Text>
                        </HStack>
                        <Text>a.n {item.name}</Text>
                      </VStack>
                    ))}

                    <Text mt={2}>
                      Jika telah melakukan transfer, silakan konfirmasi
                    </Text>
                    <HStack space={2}>
                      <FormControl flex={1}>
                        <FormControl.Label>Rek Atas Nama</FormControl.Label>
                        <Input
                          placeholder="Rek Atas Nama"
                          onChangeText={value => setPaymentName(value)}
                        />
                      </FormControl>
                      <FormControl flex={1}>
                        <FormControl.Label>No Rekening</FormControl.Label>
                        <Input
                          placeholder="No Rekening"
                          keyboardType="number-pad"
                          onChangeText={value => setPaymentAccount(value)}
                        />
                      </FormControl>
                    </HStack>
                    <HStack space={2}>
                      <FormControl flex={1}>
                        <FormControl.Label>Bank</FormControl.Label>
                        <Input
                          placeholder="Nama Bank"
                          onChangeText={value => setPaymentBank(value)}
                        />
                      </FormControl>
                      <FormControl flex={1}>
                        <FormControl.Label>Nominal</FormControl.Label>
                        <Input
                          placeholder="nominal"
                          type="number"
                          keyboardType="number-pad"
                          onChangeText={value => setPaymentNominal(value)}
                        />
                      </FormControl>
                    </HStack>
                    <Pressable onPress={() => setModalUpload(true)}>
                      {({isHovered, isFocused, isPressed}) => {
                        return (
                          <Box
                            bg={
                              isPressed
                                ? 'coolGray.100'
                                : isHovered
                                ? 'coolGray.100'
                                : 'white'
                            }>
                            <HStack
                              justifyContent={'center'}
                              alignItems={'center'}
                              borderWidth={1}
                              py={2}
                              mt={2}
                              mb={2}
                              space={2}
                              borderColor={'gray.200'}>
                              <FontAwesomeIcon
                                icon={faUpload}
                                size={12}
                                color={colors.grey}
                              />
                              <Text color={'gray.600'}>
                                Upload bukti transfer
                              </Text>
                            </HStack>
                          </Box>
                        );
                      }}
                    </Pressable>
                    {filePath?.uri && (
                      <Box borderRadius={10} bg={'gray.100'} mb={2}>
                        <Image
                          source={{
                            uri: filePath.uri,
                          }}
                          alt="bukti transffer"
                          style={{
                            width: '100%',
                            height: 150,
                            margin: 5,
                            resizeMode: 'contain',
                          }}
                        />
                      </Box>
                    )}
                    <Button
                      isLoading={isLoading}
                      onPress={() => onConfirmBayar()}
                      colorScheme="emerald">
                      Konfirmasi
                    </Button>
                  </Box>
                )}
              </Box>
              <Box
                p={2}
                _dark={{
                  borderColor: 'gray.600',
                }}
                borderColor="coolGray.200"
                py="2"
                borderWidth={1}
                borderRadius={5}
                mb={2}
                px="2">
                <Text py={2} bold>
                  Info Pengiriman
                </Text>
                <VStack space={2}>
                  {sale?.isCod ? (
                    <HStack>
                      <Text width={'30%'} fontSize={14}>
                        COD
                      </Text>
                      <Text width={'2%'}>:</Text>
                      <Text fontSize={14} bold color={'gray.600'}>
                        Ya
                      </Text>
                    </HStack>
                  ) : (
                    <>
                      <HStack>
                        <Text width={'30%'} fontSize={14}>
                          Kurir
                        </Text>
                        <Text width={'2%'}>:</Text>
                        <Text fontSize={14} bold color={'gray.600'}>
                          {`${sale?.shippingCourir?.toUpperCase()} - ${
                            sale?.shippingService
                          }`}
                        </Text>
                      </HStack>
                      <HStack justifyItems={'center'} alignItems={'center'}>
                        <Text width={'30%'} fontSize={14}>
                          No Resi
                        </Text>
                        <Text width={'2%'}>:</Text>
                        <Text fontSize={14} bold color={'gray.600'}>
                          {sale?.waybill || '-'}
                        </Text>
                        {['delivery', 'received', 'done'].includes(
                          sale?.status,
                        ) &&
                          sale.waybill && (
                            <Button
                              colorScheme={'emerald'}
                              variant={'outline'}
                              ml={2}
                              py={1}
                              bold
                              onPress={() =>
                                navigation.navigate('Tracking', sale)
                              }
                              size={'sm'}>
                              Lacak
                            </Button>
                          )}
                      </HStack>
                    </>
                  )}
                  <HStack>
                    <Text width={'30%'} fontSize={14}>
                      Penerima
                    </Text>
                    <Text width={'2%'}>:</Text>
                    <VStack>
                      <Text fontSize={14} bold color={'gray.600'}>
                        {sale?.name}
                      </Text>
                      <Text fontSize={14}>{sale?.phone}</Text>
                      <Text fontSize={14}>{sale?.address}</Text>
                      <Text fontSize={14}>
                        {sale?.districtName} {sale?.cityName}{' '}
                        {sale?.provinceName}
                      </Text>
                      <Text fontSize={14}>{sale?.postalCode}</Text>
                    </VStack>
                  </HStack>
                  {['delivery', 'received', 'done'].includes(sale?.status) && (
                    <HStack>
                      <Text width={'30%'} fontSize={14}>
                        Dikirim pada
                      </Text>
                      <Text width={'2%'}>:</Text>
                      <Text fontSize={14} bold color={'gray.600'}>
                        {ddMmYyHhIi(new Date(sale?.deliveryAt))}
                      </Text>
                    </HStack>
                  )}
                  {['received', 'done'].includes(sale?.status) && (
                    <HStack>
                      <Text width={'30%'} fontSize={14}>
                        Diterima pada
                      </Text>
                      <Text width={'2%'}>:</Text>
                      <Text fontSize={14} bold color={'gray.600'}>
                        {ddMmYyHhIi(new Date(sale?.receivedAt))}
                      </Text>
                    </HStack>
                  )}
                </VStack>
              </Box>
              <Box
                p={2}
                _dark={{
                  borderColor: 'gray.600',
                }}
                borderColor="coolGray.200"
                py="2"
                borderWidth={1}
                borderRadius={5}
                mb={2}
                px="2">
                <Text py={2} bold>
                  Barang yang dibeli
                </Text>
                {sale?.saleitems?.map((item, index) => (
                  <ItemSale item={item} key={index} />
                ))}
              </Box>
              <Box
                p={2}
                _dark={{
                  borderColor: 'gray.600',
                }}
                borderColor="coolGray.200"
                py="2"
                borderWidth={1}
                borderRadius={5}
                mb={6}
                px="2">
                <Text py={2} bold>
                  Ringkasan
                </Text>
                <VStack space={2}>
                  <HStack
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    mb={1}>
                    <Text fontSize={14}>Total Barang</Text>
                    <Text fontSize={14} bold color={'gray.600'}>
                      Rp{formatNumber(sale?.totalItem || 0)}
                    </Text>
                  </HStack>
                  <HStack
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    mb={1}>
                    <Text fontSize={14}>Biaya Kirim</Text>
                    <Text fontSize={14} bold color={'gray.600'}>
                      Rp{formatNumber(sale?.shippingCost || 0)}
                    </Text>
                  </HStack>
                  <HStack
                    mt={2}
                    pt={2}
                    borderTopWidth={1}
                    borderColor={'gray.200'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    mb={1}>
                    <Text fontSize={14}>Total</Text>
                    <Text fontSize={14} bold color={'gray.600'}>
                      Rp{formatNumber(sale?.grandTotal || 0)}
                    </Text>
                  </HStack>
                </VStack>
              </Box>
            </>
          )}
        </Stack>
      </ScrollView>

      <AlertDialog
        // leastDestructiveRef={cancelRef}
        isOpen={modalUpload}
        onClose={() => setModalUpload(false)}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          {/* <AlertDialog.Body pt="20"> */}
          {/* <Text fontSize={16} textAlign="center">
              Hapus Item dari Keranjang
            </Text> */}
          {/* </AlertDialog.Body> */}
          <VStack
            space={3}
            justifyContent="center"
            py={4}
            px={4}
            mt={12}
            mb={4}>
            <Button
              variant="outline"
              colorScheme="emerald"
              borderRadius={20}
              onPress={() => {
                captureImage('photo');
                setModalUpload(false);
              }}
              // ref={cancelRef}
            >
              Camera
            </Button>
            <Button
              variant="outline"
              borderRadius={20}
              isLoading={isLoading}
              colorScheme="emerald"
              onPress={() => {
                chooseFile('photo');
                setModalUpload(false);
              }}>
              Buka Galeri
            </Button>
            <Button.Group space={2} w={'100%'}></Button.Group>
          </VStack>
        </AlertDialog.Content>
      </AlertDialog>
    </SafeAreaView>
  );
};

const ItemSale = ({item, navigation}) => {
  console.log(item?.variant?.product?.image);
  return (
    <Box
      _dark={{
        borderColor: 'gray.600',
      }}
      borderColor="coolGray.200"
      py="2"
      borderWidth={1}
      borderRadius={5}
      mb={2}
      px="2"
      p="5">
      <HStack space={3} justifyContent="space-between" width={'100%'}>
        <Image
          borderRadius={10}
          source={getImageUri(item?.variant?.product?.image)}
          width={'18%'}
          height={16}
          alt={'image'}
        />
        <VStack width={'78%'}>
          <Text
            _dark={{
              color: 'warmGray.50',
            }}
            color="coolGray.600"
            // flex={1}
            // isTruncated={true}
            // numberOfLines={2}
            // bg="yellow.100"
          >
            {item.qty} x {item?.productName} -{' '}
            {item.inType === 'roastbean' ? 'Roast Bean' : 'Bubuk'}
          </Text>
          <Text
            _dark={{
              color: 'warmGray.50',
            }}
            color="coolGray.600">
            Rp{formatNumber(item.price)}
          </Text>
        </VStack>
        <Spacer />
      </HStack>
    </Box>
  );
};

export default TransaksiDetail;
