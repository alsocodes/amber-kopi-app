import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {colors, fonts} from '../../res';
import {getImageUri} from '../../services/api';

import {Header} from '../../components';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {
  Avatar,
  FlatList,
  Heading,
  HStack,
  VStack,
  Text,
  Spacer,
  Image,
  Badge,
  IconButton,
  Input,
  Box,
  Checkbox,
  ScrollView,
  AlertDialog,
  Button,
  Select,
  Modal,
  FormControl,
  TextArea,
  Stack,
  useToast,
  Radio,
  Skeleton,
  NativeBaseProvider,
  Center,
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteCarts,
  fetchCarts,
  fetchOngkir,
  fetchOutlets,
  updateCarts,
} from '../../store/actions/saleActions';

import {arrPropinsi, arrKecamatan, arrKabupaten} from './address';
import {
  createAddress,
  resetActionResult,
  fetchAddresses,
} from '../../store/actions/accountActions';
import {formatNumber} from '../../helper/utils';

const Checkout = ({navigation}) => {
  const {carts, outlets, ongkir} = useSelector(state => state.sale);
  const {addresses, isLoading, actionResult} = useSelector(
    state => state.account,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCarts());
    dispatch(fetchAddresses());
    dispatch(fetchOutlets());
  }, [actionResult, dispatch]);

  const [selectedAddress, setSelectedAddress] = useState(0);
  const [isCod, setIsCod] = useState(null);
  const [weight, setWeight] = useState(0);
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [selectedLayananCourier, setSelectedLayananCourier] = useState(null);

  const [selectedOutlet, setSelectedOutlet] = useState(0);
  const [address, setAddress] = useState(null);
  const [modalAddress, setModalAddress] = useState(false);

  useEffect(() => {
    if (carts) {
      setWeight(carts.reduce((a, b) => a + b.qty * b.variant?.weight, 0));
    }
  }, [carts]);

  const onAddressChange = value => {
    // console.log('value', value);
    if (value === 'newAddress') setModalAddress(true);
    else setSelectedAddress(value);
  };

  useEffect(() => {
    console.log(selectedAddress, 'selectedAddress');
    setAddress(addresses?.find(a => a.id === selectedAddress));
  }, [selectedAddress]);

  const [optAddress, setOptAddress] = useState([]);
  useEffect(() => {
    // console.log('addresses', addresses.length);
    if (addresses?.length > 0) {
      setOptAddress(
        addresses?.map(a => {
          return {
            value: a.id,
            label: `${a.label}`,
          };
        }, []),
      );
      setAddress(addresses?.find(a => a.id === selectedAddress));
    }
  }, [addresses]);

  //fetch ongkir
  useEffect(() => {
    if (isCod === false && selectedAddress && selectedOutlet) {
      const originId = outlets?.find(a => a.id === selectedOutlet)?.districtId;
      const destinationId = addresses?.find(a => a.id === selectedAddress)
        ?.district?.id;
      console.log('fetch ongkir param', originId, destinationId, weight);
      dispatch(fetchOngkir({originId, destinationId, weight}));
    }
  }, [selectedOutlet, selectedAddress, weight, isCod]);

  const [ongkirOpt, setOngkirOpt] = useState([]);
  const [courierOpt, setCourierOpt] = useState([]);
  useEffect(() => {
    setCourierOpt(
      ongkir?.results?.reduce((a, b) => {
        return [
          ...a,
          {
            code: b.code,
            courier: b.name,
          },
        ];
      }, []),
    );
  }, [ongkir]);

  useEffect(() => {
    console.log('ongkirOpt', ongkirOpt);
  }, [ongkirOpt]);

  useEffect(() => {
    console.log('isCod', isCod);
  }, [isCod]);

  const onSelectCourier = value => {
    // console.log('onSelectCourier', value);
    // console.log('ongkir', ongkir);
    setSelectedCourier(value);
    setOngkirOpt(
      ongkir?.results
        ?.find(a => a.code === value)
        ?.costs?.reduce((a, b) => {
          return [
            ...a,
            {
              service: b.service,
              cost: b.cost[0]?.value,
              etd: b.cost[0]?.etd,
            },
          ];
        }, []),
    );
  };

  const onSelectLayananCourier = value => {
    setSelectedLayananCourier(ongkirOpt?.find(a => a.service === value));
    console.log('onSelectLayananCourier', value);
  };

  const [total, setTotal] = useState(0);
  useEffect(() => {
    const ongkirCost = selectedLayananCourier?.cost || 0;
    const totalItem = carts?.reduce((a, b) => a + b.qty * b.variant?.price, 0);
    console.log('total', ongkirCost + totalItem);
    setTotal(totalItem + ongkirCost);
  }, [carts, selectedLayananCourier]);

  useEffect(() => {
    console.log('totalnya', total);
  }, [total]);

  return (
    <NativeBaseProvider>
      <Box bg="white">
        <Header title="Checkout" onPress={() => navigation.goBack()} />
      </Box>

      <ScrollView bg="gray.50">
        <ModalAddAddress
          show={modalAddress}
          setShow={setModalAddress}
          setSelectedAddress={value => setSelectedAddress(value)}
        />
        <Stack bg="white">
          <Box p={4} borderBottomWidth={5} borderColor="coolGray.200">
            <Text color={'emerald.600'} bold>
              Alamat Pengiriman{' '}
            </Text>
            <Select
              selectedValue={selectedAddress}
              accessibilityLabel="Pilih Alamat"
              placeholder="Pilih Alamat"
              _selectedItem={{
                bg: 'gray.200',
              }}
              mt={1}
              onValueChange={itemValue => onAddressChange(itemValue)}>
              <Select.Item
                key="newAddress"
                label="Tambah Alamat Baru"
                value="newAddress"
              />
              {optAddress?.map(a => (
                <Select.Item key={a.id} label={a.label} value={a.value} />
              ))}
            </Select>
            {address && (
              <Box p={1}>
                <Text
                  color={'gray.700'}
                  fontSize={
                    12
                  }>{`${address.receiver} (${address.phone})`}</Text>
                <Text
                  color={'gray.700'}
                  fontSize={
                    12
                  }>{`${address.address}. ${address.district?.name}, ${address.city?.name}, ${address.province?.name}. ${address.postalCode}`}</Text>
              </Box>
            )}
          </Box>
          {selectedAddress ? (
            <Box
              p={4}
              borderBottomWidth={5}
              borderTopWidth={1}
              borderColor="coolGray.200">
              <Text color={'emerald.600'} bold>
                Pilih Outlet/Gudang{' '}
              </Text>
              <Select
                accessibilityLabel="Pilih Outlet/Gudang"
                placeholder="Pilih Outlet/Gudang"
                _selectedItem={{
                  bg: 'gray.200',
                }}
                mt={1}
                onValueChange={itemValue => setSelectedOutlet(itemValue)}>
                {outlets?.map(a => (
                  <Select.Item key={a.id} label={a.name} value={a.id} />
                ))}
              </Select>
            </Box>
          ) : (
            <Box></Box>
          )}
          {selectedOutlet ? (
            <Box p={4} borderBottomWidth={5} borderColor="coolGray.200">
              <Text color={'emerald.600'} bold>
                Pilihan Pengiriman{' '}
              </Text>
              <Radio.Group
                defaultValue="1"
                name="myRadioGroup"
                onChange={value => setIsCod(value === '1')}
                accessibilityLabel="Pick your favorite number">
                <Radio value="1" my={1} size={'sm'} key={1}>
                  Ongkir COD/Bayar ditempat
                </Radio>
                <Radio value="2" my={1} size={'sm'} key={2}>
                  Bayar Barang + Ongkir
                </Radio>
              </Radio.Group>
              <Text mt="1" mb="1">
                Total Berat {formatNumber(weight / 1000)}Kg
              </Text>
              {isCod === false ? (
                <Box>
                  {ongkir === null ? (
                    <Box>
                      <Skeleton h="10" border={1} borderRadius={5} mt={2} />
                      <Skeleton h="10" border={1} borderRadius={5} mt={2} />
                    </Box>
                  ) : (
                    <Box>
                      <Select
                        accessibilityLabel="Pilih Ekspedisi"
                        placeholder="Pilih Ekspedisi"
                        _selectedItem={{
                          bg: 'gray.200',
                        }}
                        mt={1}
                        onValueChange={itemValue => onSelectCourier(itemValue)}>
                        {courierOpt?.map((a, index) => (
                          <Select.Item
                            key={index}
                            label={`${a.courier}`}
                            value={`${a.code}`}
                          />
                        ))}
                      </Select>
                      <Select
                        accessibilityLabel="Pilih Layanan"
                        placeholder="Pilih Layanan"
                        _selectedItem={{
                          bg: 'gray.200',
                        }}
                        mt={1}
                        onValueChange={itemValue =>
                          onSelectLayananCourier(itemValue)
                        }>
                        {ongkirOpt?.map((a, index) => (
                          <Select.Item
                            key={index}
                            label={`${a.service} Rp${formatNumber(a.cost)}`}
                            value={`${a.service}`}
                          />
                        ))}
                      </Select>
                    </Box>
                  )}
                </Box>
              ) : (
                <Box></Box>
              )}
            </Box>
          ) : (
            <Box></Box>
          )}
          <Box
            p={4}
            borderBottomWidth={5}
            borderTopWidth={1}
            borderColor="coolGray.200">
            <Text color={'emerald.600'} bold>
              Item Barang{' '}
            </Text>
            {carts?.map(item => (
              <ItemCart
                key={item.id}
                item={item}
                isLoading={isLoading}
                actionResult={actionResult}
                onCheckboxChange={(id, checked) =>
                  onCheckboxChange(id, checked)
                }
              />
            ))}
          </Box>
        </Stack>
      </ScrollView>
      <Box
        // flex={1}
        bg="green.300"
        safeAreaTop
        width="100%">
        {/* <Center flex={1}></Center> */}
        <HStack
          height={60}
          bg="white"
          alignItems="center"
          justifyContent={'space-between'}
          width="100%"
          safeAreaBottom
          px={4}
          shadow={6}>
          <Box>
            <Text fontSize={12}>Total Bayar</Text>
            <Text fontSize={18} bold>
              Rp{formatNumber(total)}
            </Text>
          </Box>
          <Button
            borderRadius={20}
            colorScheme="emerald"
            // onPress={() => onDeleteCart()}
            // height={10}
            fontWeight={'extrabold'}
            width="180">
            Bayar
          </Button>
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
};

const ModalAddAddress = ({show, setShow, setSelectedAddress}) => {
  // const [modalVisible, setShow] = useState(show);

  const [label, setLabel] = useState('');
  const [isMain, setIsMain] = useState(false);
  const [receiver, setReceiver] = useState('');
  const [address, setAddAess] = useState('');
  const [provinceId, setProvinceId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');

  const onProvinceSelected = value => setProvinceId(value);
  const onCitySelected = value => setCityId(value);

  const [optCity, setOptCity] = useState([]);
  const [optDistrict, setOptDistrict] = useState([]);

  useEffect(() => {
    if (provinceId) {
      setOptCity(arrKabupaten.filter(a => a.prop === provinceId, []));
    } else {
      setOptCity([]);
    }
  }, [provinceId]);

  useEffect(() => {
    if (cityId) {
      setOptDistrict(arrKecamatan.filter(a => a.kab === cityId, []));
    } else {
      setOptDistrict([]);
    }
  }, [cityId]);

  const toast = useToast();
  const toastError = msg => {
    toast.show({
      title: msg,
      placement: 'bottom',
      bgColor: 'red.600',
    });
  };

  const {isLoading, actionResult} = useSelector(state => state.account);
  const dispatch = useDispatch();
  const onAddressSave = () => {
    if (label === '') return toastError('Label harus diisi');
    if (receiver === '') return toastError('Penerima harus diisi');
    if (address === '') return toastError('Alamat harus diisi');

    if (!provinceId) return toastError('Propinsi harus diisi');
    if (!cityId) return toastError('Kota harus diisi');
    if (!districtId) return toastError('Kecamatan harus diisi');
    if (!phone) return toastError('No Telp/Whastapp harus diisi');

    const params = {
      label,
      receiver,
      address,
      provinceId,
      cityId,
      districtId,
      postalCode,
      phone,
      isMain,
    };
    // console.log(params);
    dispatch(createAddress(params));
  };

  useEffect(() => {
    if (actionResult && actionResult.type === 'addAddress') {
      console.log('set selected address new', actionResult);
      setSelectedAddress(actionResult.id);
      setShow(false);
      dispatch(resetActionResult());
    }
  }, [actionResult]);
  return (
    <Modal isOpen={show} onClose={() => setShow(false)} size={'xl'}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Alamat Baru</Modal.Header>
        <Modal.Body>
          <Stack space={2}>
            <HStack flexDirection={'row'} space={2}>
              <FormControl flex={1}>
                <FormControl.Label>Label</FormControl.Label>
                <Input
                  placeholder="Contoh: Rumah, Kantor."
                  onChangeText={value => setLabel(value)}
                />
              </FormControl>
              <FormControl flex={1} mt={8}>
                <FormControl.Label>
                  <Checkbox
                    onChange={values => setIsMain(values)}
                    accessibilityLabel="This is a dummy checkbox"
                  />{' '}
                  Alamat utama
                </FormControl.Label>
              </FormControl>
            </HStack>
            <FormControl flex={1}>
              <FormControl flex={1}>
                <FormControl.Label>Penerima</FormControl.Label>
                <Input
                  placeholder="Jhone Doe"
                  onChangeText={value => setReceiver(value)}
                />
              </FormControl>
            </FormControl>
            <FormControl flex={1}>
              <FormControl.Label>Alamat</FormControl.Label>
              <TextArea
                h={16}
                placeholder="Alamat lengkap"
                onChangeText={value => setAddAess(value)}
              />
            </FormControl>
            <HStack flexDirection={'row'} space={2}>
              <FormControl flex={1}>
                <FormControl.Label>Propinsi</FormControl.Label>
                <Select
                  accessibilityLabel="Pilih Propinsi"
                  placeholder="Pilih Propinsi"
                  _selectedItem={{
                    bg: 'gray.200',
                  }}
                  onValueChange={itemValue => onProvinceSelected(itemValue)}>
                  {arrPropinsi?.map(item => (
                    <Select.Item
                      key={item.id}
                      label={item.name}
                      value={item.id}
                    />
                  ))}
                </Select>
              </FormControl>
              <FormControl flex={1}>
                <FormControl.Label>Kota</FormControl.Label>
                <Select
                  accessibilityLabel="Pilih Kota"
                  placeholder="Pilih Kota"
                  _selectedItem={{
                    bg: 'gray.200',
                  }}
                  onValueChange={itemValue => onCitySelected(itemValue)}>
                  {optCity?.map(item => (
                    <Select.Item
                      key={item.id}
                      label={item.name}
                      value={item.id}
                    />
                  ))}
                </Select>
              </FormControl>
            </HStack>
            <HStack flexDirection={'row'} space={2}>
              <FormControl flex={1}>
                <FormControl.Label>Kecamatan</FormControl.Label>
                <Select
                  accessibilityLabel="Pilih Kecamatan"
                  placeholder="Pilih Kecamatan"
                  _selectedItem={{
                    bg: 'gray.200',
                  }}
                  onValueChange={itemValue => setDistrictId(itemValue)}>
                  {optDistrict?.map(item => (
                    <Select.Item
                      key={item.id}
                      label={item.name}
                      value={item.id}
                    />
                  ))}
                </Select>
              </FormControl>
              <FormControl flex={1}>
                <FormControl.Label>Kode Pos</FormControl.Label>
                <Input
                  placeholder="Contoh: 62192"
                  keyboardType="number-pad"
                  onChangeText={value => setPostalCode(value)}
                />
              </FormControl>
            </HStack>
            <HStack flexDirection={'row'} space={2}>
              <FormControl flex={1}>
                <FormControl.Label>No Telp/Whatsapp</FormControl.Label>
                <Input
                  placeholder="0821xxx"
                  keyboardType="phone-pad"
                  onChangeText={value => setPhone(value)}
                />
              </FormControl>
            </HStack>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2} width={200}>
            <Button
              width={90}
              borderRadius={20}
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setShow(false);
              }}>
              Cancel
            </Button>
            <Button
              isLoading={isLoading}
              width={100}
              borderRadius={20}
              onPress={() => {
                onAddressSave();
                // setShow(false);
              }}>
              Simpan
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

const ItemCart = ({item, isLoading, actionResult, onCheckboxChange}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);
  const [qty, setQty] = useState(item.qty);
  const updateQty = value => {
    if (value < 0 && qty === 1) setIsOpen(true);
    else {
      setQty(parseInt(qty, 10) + value);
      dispatch(updateCarts({id: item.id, inType: item.inType, qty: item.qty}));
    }
  };

  // const onQtyChange = value => {
  //   if (parseInt(value, 10) < 1) setIsOpen(true);
  //   else setQty(value);
  // };

  const dispatch = useDispatch();
  const onDeleteCart = () => {
    dispatch(deleteCarts(item.id));
  };

  useEffect(() => {
    if (actionResult && actionResult?.type === 'deleteCart') setIsOpen(false);
  }, [actionResult]);

  return (
    <Box
      _dark={{
        borderColor: 'gray.600',
      }}
      borderColor="coolGray.200"
      py="2">
      <HStack space={3} justifyContent="space-between" width={'100%'}>
        <VStack>
          <Text
            _dark={{
              color: 'warmGray.50',
            }}
            color="coolGray.600"
            flex={1}
            isTruncated={true}>
            {item.qty} x {item.variant?.product?.title}
          </Text>
          <HStack justifyContent={'space-between'} mt={1}>
            <HStack>
              <Badge colorScheme={'info'}>{item.variant?.name}</Badge>
              <Badge colorScheme={'info'}>
                {item.inType === 'bubuk' ? 'Bubuk' : 'Roast Bean'}
              </Badge>
            </HStack>
          </HStack>
        </VStack>
        <Spacer />
      </HStack>
    </Box>
  );
};
export default Checkout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGrey,
    height: '100%',
    // padding: 14,
  },
  pageTitle: {
    fontSize: 18,
    fontFamily: fonts.SemiBold,
    color: colors.primary,
    marginBottom: 10,
  },
  cartWrapper: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
});