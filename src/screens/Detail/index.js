import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  HStack,
  IconButton,
  Input,
  Select,
  Box,
  Modal,
  Button,
  useToast,
  Text,
  View,
  Image,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import {BoxRelatedItems, Header} from '../../components';
import {formatNumber} from '../../helper/utils';
import {colors} from '../../res';
import {getImageUri} from '../../services/api';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {createCart, resetActionResult} from '../../store/actions/saleActions';
import {fetchRelatedProducts} from '../../store/actions/productActions';
import RenderHTML from 'react-native-render-html';

const Detail = ({route, navigation}) => {
  const {actionResult, isLoading} = useSelector(state => state.sale);
  const {relatedProducts} = useSelector(state => state.product.product);
  const dataParams = route?.params;
  const bgColor = route?.params?.bgColor;
  const isDarkMode = useColorScheme() === 'dark';

  const [showModal, setShowModal] = useState(false);
  const [qty, setQty] = useState(1);
  const [inType, setInType] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (dataParams?.id) {
      dispatch(fetchRelatedProducts(dataParams?.id));
    }
  }, [dataParams, dispatch]);

  const updateQty = value => {
    if (value < 0 && qty === 1) return;
    setQty(parseInt(qty, 10) + value);
  };

  const onQtyChange = value => {
    if (parseInt(value, 10) < 1) setQty(1);
    else setQty(value);
  };

  useEffect(() => {
    setButtonDisabled(qty < 1 || inType === '');
  }, [qty, inType]);

  const toast = useToast();
  const toastError = msg => {
    toast.show({
      title: msg,
      placement: 'bottom',
      bgColor: 'red.600',
    });
  };
  const onAddToCart = () => {
    if (inType === '') return toastError('Pilih Jenis Roast Bean / Bubuk');
    const params = {
      variantId: dataParams?.id,
      inType: inType,
      qty: qty,
      data: dataParams,
    };
    // console.log('createCart', params);
    dispatch(createCart(params));
  };

  useEffect(() => {
    if (actionResult?.type === 'addToCart') {
      console.log(' iam trigged');
      setShowModal(true);
      dispatch(resetActionResult());
    }
  }, [actionResult]);

  const {width} = useWindowDimensions();

  return (
    <Box flex={1} bg="white" safeAreaTop width="100%" alignSelf="center">
      <VStack flex={1}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Header
          onPress={() => navigation.goBack()}
          back={true}
          title={dataParams?.title}
        />
        <ScrollView>
          <View>
            <View>
              <Image
                alt={'image-product'}
                source={getImageUri(dataParams?.product?.image)}
                style={{
                  width: '100%',
                  aspectRatio: 1600 / 1066,
                  resizeMode: 'contain',
                }}
              />
            </View>

            <View
              bgColor={'white'}
              borderTopRadius={20}
              marginTop={-3}
              py={6}
              px={4}>
              <View>
                <Text fontSize={20} fontWeight={'semibold'} color={'gray.600'}>
                  {dataParams?.title}
                </Text>
              </View>
              <Text fontSize={16}>
                Rp{formatNumber(dataParams?.price)} /{' '}
                {dataParams?.weight / 1000} kg
              </Text>
              <View bgColor={'gray.200'} px={2} py={2} borderRadius={8} my={2}>
                <Text>{dataParams?.product?.excerpt}</Text>
              </View>
              <View>
                <RenderHTML
                  contentWidth={width}
                  source={{
                    html: dataParams?.product?.description,
                  }}
                />
              </View>
              {/* <Text style={styles.desc}>{dataParams?.product?.description}</Text> */}
              <View mt={4} mb={2}>
                <Text
                  fontSize={18}
                  color={'emerald.500'}
                  fontWeight={'semibold'}
                  mb={2}>
                  Produk terkait
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {relatedProducts?.map((item, index) => {
                    return (
                      <BoxRelatedItems
                        key={index}
                        image={getImageUri(item?.product?.image)}
                        name={item.title}
                        price={item.price}
                        bgColor={item.bgColor}
                        onPress={() => navigation.navigate('Detail', item)}
                      />
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </View>
        </ScrollView>
      </VStack>
      <HStack
        alignItems="center"
        safeAreaBottom
        borderColor={'gray.200'}
        borderTopWidth={1}
        space={2}
        px={4}
        pb={2}
        bgColor={'white'}>
        <Box flex={1} pt={2}>
          <HStack space={1}>
            <IconButton
              variant="outline"
              color={colors.grey}
              borderColor={colors.grey}
              alignItems="center"
              justifyContent="center"
              minWidth={8}
              _icon={{color: colors.grey}}
              icon={<FontAwesomeIcon icon={faMinus} size={12} />}
              onPress={() => updateQty(-1)}
            />
            <Input
              placeholder="0"
              value={`${qty}`}
              onChangeText={q => onQtyChange(q)}
              px={2}
              size="md"
              height={38}
              flex={1}
              borderColor={colors.grey}
            />
            <IconButton
              variant="outline"
              color={colors.grey}
              borderColor={colors.grey}
              alignItems="center"
              justifyContent="center"
              minWidth={8}
              _icon={{color: colors.grey}}
              icon={<FontAwesomeIcon icon={faPlus} size={12} />}
              onPress={() => updateQty(1)}
            />
          </HStack>
        </Box>

        <Box flex={1}>
          <Select
            borderColor={colors.grey}
            height={39}
            accessibilityLabel="Pilih Jenis"
            placeholder="Pilih Jenis"
            _selectedItem={{
              bg: 'teal.600',
            }}
            mt={1}
            selectedValue={inType}
            onValueChange={itemValue => setInType(itemValue)}>
            <Select.Item label="Roast Bean" value="roastbean" />
            <Select.Item label="Bubuk" value="bubuk" />
          </Select>
        </Box>
        <Box flex={1} pt={2}>
          <Button
            borderRadius={20}
            variant="solid"
            colorScheme={'emerald'}
            onPress={() => {
              onAddToCart();
            }}>
            Keranjang
          </Button>
        </Box>
      </HStack>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Body>
            <Text
              style={{
                fontSize: 16,
                marginTop: 40,
                marginBottom: 20,
                alignSelf: 'center',
              }}>
              Item berhasil ditambahkan ke keranjang
            </Text>
          </Modal.Body>
          <HStack space={3} justifyContent="flex-end" py={4} px={4}>
            <Button.Group space={2}>
              <Button
                borderRadius={20}
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  dispatch(resetActionResult());
                  setShowModal(false);
                }}>
                Tambah lainnya
              </Button>
              <Button
                borderRadius={20}
                variant="solid"
                colorScheme={'emerald'}
                onPress={() => {
                  dispatch(resetActionResult());
                  navigation.replace('Cart');
                }}>
                Lihat Keranjang
              </Button>
            </Button.Group>
          </HStack>
        </Modal.Content>
      </Modal>
    </Box>
  );

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header
        onPress={() => navigation.goBack()}
        back={true}
        title={dataParams?.title}
      />
      <ScrollView>
        <View>
          <View>
            <Image
              alt={'image-product'}
              source={getImageUri(dataParams?.product?.image)}
              style={{
                width: '100%',
                aspectRatio: 1600 / 1066,
                resizeMode: 'contain',
              }}
            />
          </View>

          <View
            bgColor={'white'}
            borderTopRadius={20}
            marginTop={-4}
            py={6}
            px={4}>
            <View>
              <Text fontSize={20} fontWeight={'semibold'} color={'gray.600'}>
                {dataParams?.title}
              </Text>
            </View>
            <Text fontSize={16}>
              Rp{formatNumber(dataParams?.price)} / {dataParams?.weight / 1000}{' '}
              kg
            </Text>
            <View bgColor={'gray.200'} px={2} py={2} borderRadius={8} my={2}>
              <Text>{dataParams?.product?.excerpt}</Text>
            </View>
            <View>
              <RenderHTML
                contentWidth={width}
                source={{
                  html: `${dataParams?.product?.description} <br/> ${dataParams?.product?.description}`,
                }}
              />
            </View>
            {/* <Text style={styles.desc}>{dataParams?.product?.description}</Text> */}
            <View mt={4} mb={2}>
              <Text
                fontSize={18}
                color={'emerald.500'}
                fontWeight={'semibold'}
                mb={2}>
                Produk terkait
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {relatedProducts?.map((item, index) => {
                  return (
                    <BoxRelatedItems
                      key={index}
                      image={getImageUri(item?.product?.image)}
                      name={item.title}
                      price={item.price}
                      bgColor={item.bgColor}
                      onPress={() => navigation.navigate('Detail', item)}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
        <HStack safeAreaBottom>
          <Text>Test</Text>
        </HStack>
      </ScrollView>
      {/* <View
        // bgColor={'white'}
        borderTopWidth={1}
        borderColor={'gray.200'}
        px={4}>
        <HStack space={3} alignItems="center" justifyContent="center">
          
        </HStack>
      </View> */}
    </SafeAreaView>
  );
};

export default Detail;
