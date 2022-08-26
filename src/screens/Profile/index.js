import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Header} from '../../components';
import {colors} from '../../res';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {
  Badge,
  Box,
  HStack,
  IconButton,
  Button,
  Input,
  Stack,
  StatusBar,
  Text,
  VStack,
  Modal,
  FormControl,
  TextArea,
  Select,
  useToast,
} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faPencil,
  faTrash,
  faEyeSlash,
  faEye,
  faCopy,
  faShareAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  deleteAddresses,
  fetchAddresses,
  fetchProfile,
  resetActionResult,
  updateAddresses,
  updateProfile,
} from '../../store/actions/accountActions';
import {checkVersion} from '../../store/actions/appActions';
import {arrKabupaten, arrKecamatan, arrPropinsi} from '../Checkout/address';
import {ddMmYy} from '../../helper/utils';
import {logout} from '../../store/actions/authActions';
import {useCallback} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';

const Akun = ({navigation}) => {
  const {
    addresses,
    isLoading: addressLoading,
    actionResult,
    profile,
  } = useSelector(state => state.account);
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const {version} = useSelector(state => state.app);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, [version]);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchAddresses());
  }, [dispatch]);

  const [showDel, setShowDel] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [address, setAddress] = useState(null);
  const [idWillDelete, setIdWillDelete] = useState(0);
  const onPressDelete = id => {
    setIdWillDelete(id);
    setShowDel(true);
  };

  const onPressEdit = item => {
    setAddress(item);
    setShowEdit(true);
  };

  useEffect(() => {
    console.log('actionResult', actionResult);
    setShowDel(false);
    setShowEdit(false);
    setShowProfile(false);
    dispatch(fetchAddresses());
    dispatch(fetchProfile());
    dispatch(resetActionResult());
  }, [actionResult]);

  useEffect(() => {
    console.log('profile', profile);
  }, [profile]);

  const displayName = name => {
    if (!name) return 'NN';
    const split = name?.split(' ') || [];
    if (split.length === 0) return 'NN';
    else if (split.length === 1) return split[0].substring(0, 2)?.toUpperCase();
    else
      return `${split[0].substring(0, 1)}${split[1].substring(
        0,
        1,
      )}`?.toUpperCase();
  };

  const onLogoutPress = () => {
    dispatch(logout());
    navigation.replace('GetStarted');
  };

  const onCheckPress = () => {
    dispatch(checkVersion());
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
    if (refreshing) {
      dispatch(fetchProfile());
      dispatch(fetchAddresses());
    }
  }, [refreshing]);

  const toast = useToast();
  const toastSuccess = msg => {
    toast.show({
      title: msg,
      placement: 'bottom',
      bgColor: 'green.600',
    });
  };
  const copy = () => {
    Clipboard.setString(profile?.shareText || profile?.link);
    toastSuccess('Link disalin');
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: profile?.shareText || profile?.link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

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
        <Header title="Akun" />
      </Box>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'#34d399'}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <VStack px={4} py={4} width={'100%'} space={2}>
          <HStack space={4} height={20}>
            <HStack
              width={20}
              height={20}
              bg={'emerald.500'}
              borderRadius={100}
              alignItems={'center'}
              justifyItems={'center'}>
              <Text
                textAlign={'center'}
                fontSize={30}
                width={'100%'}
                bold
                color={'white'}>
                {displayName(profile?.name)}
              </Text>
            </HStack>
            <VStack flex={1}>
              <HStack space={2}>
                <Text fontSize={18} bold color={'gray.600'}>
                  {profile?.name}
                </Text>
                {profile?.isReseller && (
                  <Badge colorScheme={'success'}>Reseller</Badge>
                )}
              </HStack>
              <Text color={'gray.600'} fontWeight={'semibold'}>
                {profile?.phone}
              </Text>
              <Text color={'gray.600'} fontWeight={'semibold'}>
                {profile?.email}
              </Text>
            </VStack>
            <IconButton
              onPress={() => setShowProfile(true)}
              alignSelf={'baseline'}
              variant="ghost"
              width={10}
              height={10}
              icon={
                <FontAwesomeIcon
                  icon={faPencil}
                  size={16}
                  color={colors.grey}
                />
              }
            />
          </HStack>
          <HStack
            borderWidth={1}
            borderColor={'gray.300'}
            py={3}
            borderRadius={10}>
            {profile?.isReseller && (
              <VStack flex={1}>
                <Text textAlign={'center'}>Kode Reseller</Text>
                <Text
                  fontSize={16}
                  textAlign={'center'}
                  fontWeight={'semibold'}>
                  {profile?.code}
                </Text>
              </VStack>
            )}
            <VStack flex={1}>
              <Text textAlign={'center'}>Gabung sejak</Text>
              <Text fontSize={16} textAlign={'center'} fontWeight={'semibold'}>
                {ddMmYy(new Date(profile?.createdAt))}
              </Text>
            </VStack>
            <VStack flex={1}>
              <Text textAlign={'center'}>Transaksi</Text>
              <Text textAlign={'center'} fontSize={16} fontWeight={'semibold'}>
                {profile?.customerSales?.length || 0} kali
              </Text>
            </VStack>
          </HStack>

          <VStack flex={1} mt={2}>
            <Text textAlign={'left'}>
              Link {profile?.isReseller ? 'Referal' : 'Aplikasi'}
            </Text>
            <HStack mt={1} space={1}>
              <Input
                flex={1}
                isReadOnly
                py={0}
                px={2}
                fontSize={14}
                type="text"
                defaultValue={profile?.link}
              />
              <IconButton
                variant="outline"
                colorScheme={'coolGray'}
                borderColor={'gray.400'}
                width={10}
                height={10}
                onPress={() => copy()}
                icon={
                  <FontAwesomeIcon
                    icon={faCopy}
                    size={12}
                    color={colors.grey}
                  />
                }
              />
              <IconButton
                colorScheme={'gray'}
                borderColor={'gray.400'}
                variant="outline"
                width={10}
                height={10}
                onPress={() => onShare()}
                icon={
                  <FontAwesomeIcon
                    icon={faShareAlt}
                    size={12}
                    color={colors.grey}
                  />
                }
              />
            </HStack>
          </VStack>
          {profile?.isReseller && (
            <Button
              mt={4}
              variant={'outline'}
              colorScheme={'emerald'}
              onPress={() => navigation.navigate('TransaksiReseller')}>
              {`(${profile?.saleAffiliateCount}) Transaksi Reseller`}
            </Button>
          )}
          <Box py={4}>
            <Text fontWeight={'semibold'} mb={2}>
              Daftar Alamat
            </Text>
            <ModalDelete
              isLoading={addressLoading}
              show={showDel}
              setShow={setShowDel}
              action={() => dispatch(deleteAddresses(idWillDelete))}
            />
            <ModalAddAddress
              thisAddress={address}
              isLoading={addressLoading}
              show={showEdit}
              setShow={setShowEdit}
              action={value =>
                dispatch(updateAddresses({...value, id: address.id}))
              }
            />

            <ModalProfile
              profile={profile}
              isLoading={addressLoading}
              show={showProfile}
              setShow={setShowProfile}
              action={value => dispatch(updateProfile(value))}
            />
            <VStack space={2}>
              {addresses?.map(item => {
                return (
                  <Box
                    key={item.id}
                    borderWidth={1}
                    borderRadius={10}
                    px={2}
                    py={2}
                    borderColor={'gray.200'}>
                    <HStack justifyContent={'space-between'}>
                      <Text fontWeight={'semibold'} color={'gray.500'}>
                        {item.receiver} ({item.phone})
                      </Text>
                      <Badge>{item.label}</Badge>
                    </HStack>

                    <HStack justifyContent={'space-between'}>
                      <VStack flex={1}>
                        <Text>{item.address}</Text>
                        <Text>
                          {item.district.name} {item.city.name}{' '}
                          {item.province.name}{' '}
                        </Text>
                      </VStack>
                      <IconButton
                        variant="ghost"
                        width={10}
                        height={10}
                        onPress={() => onPressEdit(item)}
                        icon={
                          <FontAwesomeIcon
                            icon={faPencil}
                            size={12}
                            color={colors.grey}
                          />
                        }
                      />
                      <IconButton
                        onPress={() => onPressDelete(item.id)}
                        variant="ghost"
                        width={10}
                        height={10}
                        icon={
                          <FontAwesomeIcon
                            icon={faTrash}
                            size={12}
                            color={colors.grey}
                          />
                        }
                      />
                    </HStack>
                  </Box>
                );
              })}
            </VStack>
          </Box>
          <Button
            mt={4}
            variant={'outline'}
            colorScheme={'emerald'}
            onPress={() => onLogoutPress()}>
            Logout
          </Button>
          <Text fontSize={12} textAlign={'center'} mt={2}>
            App version 1.0.1 | 26-08-2022
          </Text>
          <Button
            mb={10}
            variant={'ghost'}
            colorScheme={'emerald'}
            onPress={() => onCheckPress()}>
            Check Version
          </Button>
        </VStack>
      </ScrollView>
      <ModalVersion
        current={3}
        version={version}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </SafeAreaView>
  );
};

const ModalVersion = ({current, version, showModal, setShowModal}) => {
  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(version?.isMandatory)}>
      <Modal.Content maxWidth="400px">
        {/* <Modal.CloseButton /> */}
        <Modal.Header>Update Aplikasi</Modal.Header>
        <Modal.Body>
          {current < version?.versionNumber ? (
            <>
              <Text mb={2} fontWeight={'semibold'}>
                Versi Terbaru {version?.versionCode} telah tersedia
              </Text>
              <Text>Perubahan :</Text>
              {version?.description?.split('|')?.map((item, index) => {
                return <Text key={index}>- {item}</Text>;
              })}
            </>
          ) : (
            <Text mb={2} fontWeight={'semibold'}>
              Aplikasi sudah terbaru versi {version?.versionCode}
            </Text>
          )}
        </Modal.Body>
        <HStack space={3} justifyContent="space-between" py={2} px={4}>
          <Button
            borderRadius={20}
            variant="ghost"
            colorScheme="blueGray"
            onPress={() => setShowModal(false)}>
            Tutup
          </Button>
          {version?.versionNumber > current && (
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
          )}
        </HStack>
      </Modal.Content>
    </Modal>
  );
};

const ModalProfile = ({profile, action, show, setShow, isLoading}) => {
  const [name, setName] = useState(profile?.name || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setName(profile?.name);
    setEmail(profile?.email);
    setPhone(profile?.phone);
  }, [profile]);

  const toast = useToast();
  const toastError = msg => {
    toast.show({
      title: msg,
      placement: 'bottom',
      bgColor: 'red.600',
    });
  };
  const onProfileSave = () => {
    console.log(name, email, phone);
    if (name === '') return toastError('Nama harus diisi');
    if (email === '') return toastError('Email harus diisi');
    if (phone === '') return toastError('No HP/WA harus diisi');
    if (password !== '' && password.length < 6)
      return toastError('Password minimal 6 karakter');

    const params = {
      id: profile.id,
      name: name,
      email: email,
      phone: phone,
    };
    if (password !== '') params['password'] = password;
    console.log(params);
    action(params);
  };

  return (
    <Modal isOpen={show} onClose={() => setShow(false)} size={'xl'}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Profile Customer</Modal.Header>
        <Modal.Body>
          <Stack space={2}>
            <FormControl flex={1}>
              <FormControl.Label>Nama</FormControl.Label>
              <Input
                type="text"
                defaultValue={profile?.name}
                placeholder="Jhone Doe"
                onChangeText={value => setName(value)}
              />
            </FormControl>
            <FormControl flex={1}>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                type="text"
                defaultValue={profile?.email}
                placeholder="JhoneDoe@gmail.com"
                keyboardType="email-address"
                onChangeText={value => setEmail(value)}
              />
            </FormControl>
            <FormControl flex={1}>
              <FormControl.Label>Nomor HP/Wa</FormControl.Label>
              <Input
                type="text"
                defaultValue={profile?.phone}
                placeholder="09899xxxx"
                keyboardType="number-pad"
                onChangeText={value => setPhone(value)}
              />
            </FormControl>
            <FormControl flex={1}>
              <FormControl.Label>Ubah Password? (Opsional)</FormControl.Label>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder=""
                onChangeText={value => setPassword(value)}
                InputRightElement={
                  <IconButton
                    icon={<FontAwesomeIcon icon={show ? faEye : faEyeSlash} />}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />
            </FormControl>
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
              colorScheme={'emerald'}
              isLoading={isLoading}
              width={100}
              borderRadius={20}
              onPress={() => {
                onProfileSave();
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

const ModalDelete = ({action, show, setShow, isLoading}) => {
  return (
    <Modal isOpen={show} onClose={() => setShow(false)}>
      <Modal.Content>
        <Modal.Body>
          <Text py={6} textAlign={'center'}>
            Anda akan menghapus Alamat ini?
          </Text>
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
              colorScheme={'error'}
              onPress={action}>
              Ya
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

const ModalAddAddress = ({
  thisAddress: addr,
  show,
  setShow,
  action,
  isLoading,
}) => {
  console.log('addr', addr);
  const [label, setLabel] = useState(addr?.label || '');
  const [isMain, setIsMain] = useState(false);
  const [receiver, setReceiver] = useState(addr?.receiver || '');
  const [address, setAddAess] = useState(addr?.address || '');
  const [provinceId, setProvinceId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [postalCode, setPostalCode] = useState(addr?.postalCode || '');
  const [phone, setPhone] = useState(addr?.phone || '');

  const onProvinceSelected = value => setProvinceId(value);

  const onCitySelected = value => setCityId(value);

  const [optCity, setOptCity] = useState([]);
  const [optDistrict, setOptDistrict] = useState([]);

  useEffect(() => {
    console.log('xx', addr?.province?.id);
    if (addr?.province?.id) setProvinceId(addr?.province?.id);

    setLabel(addr?.label);
    setReceiver(addr?.receiver);
    setPhone(addr?.phone);
    setAddAess(addr?.address);
    setPostalCode(addr?.postalCode);
  }, [addr]);

  useEffect(() => {
    console.log('xx city', addr?.city?.id);
    if (addr?.city?.id) setCityId(addr?.city?.id);
  }, [addr, optCity]);

  useEffect(() => {
    console.log('xx district', addr?.district?.id);
    if (addr?.district?.id) setDistrictId(addr?.district?.id);
  }, [addr, optDistrict]);

  useEffect(() => console.log('cityId', cityId), [cityId]);
  useEffect(() => console.log('districtId', districtId), [districtId]);

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

  const onAddressSave = () => {
    console.log('awww', label);
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
    // console.log('', params);
    action(params);
  };

  return (
    <Modal isOpen={show} onClose={() => setShow(false)} size={'xl'}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Alamat Baru</Modal.Header>
        <Modal.Body>
          <Stack space={2}>
            <HStack flexDirection={'row'} space={2}>
              <FormControl flex={1}>
                <FormControl.Label>Label </FormControl.Label>
                <Input
                  defaultValue={addr?.label}
                  placeholder="Contoh: Rumah, Kantor."
                  onChangeText={value => setLabel(value)}
                />
              </FormControl>
              {/* <FormControl flex={1} mt={8}>
                <FormControl.Label>
                  <Checkbox
                    onChange={values => setIsMain(values)}
                    accessibilityLabel="This is a dummy checkbox"
                  />{' '}
                  Alamat utama
                </FormControl.Label>
              </FormControl> */}
            </HStack>
            <FormControl flex={1}>
              <FormControl flex={1}>
                <FormControl.Label>Penerima</FormControl.Label>
                <Input
                  defaultValue={addr?.receiver}
                  placeholder="Jhone Doe"
                  onChangeText={value => setReceiver(value)}
                />
              </FormControl>
            </FormControl>
            <FormControl flex={1}>
              <FormControl.Label>Alamat</FormControl.Label>
              <TextArea
                h={16}
                defaultValue={addr?.address}
                placeholder="Alamat lengkap"
                onChangeText={value => setAddAess(value)}
              />
            </FormControl>
            <HStack flexDirection={'row'} space={2}>
              <FormControl flex={1}>
                <FormControl.Label>Propinsi</FormControl.Label>
                <Select
                  selectedValue={provinceId}
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
                  selectedValue={cityId}
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
                  selectedValue={districtId}
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
                  defaultValue={postalCode}
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
                  defaultValue={addr?.phone}
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
              colorScheme={'emerald'}
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

export default Akun;
