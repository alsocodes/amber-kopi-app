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
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {BoxRelatedItems, Gap, Header} from '../../components';
import {formatNumber} from '../../helper/utils';
import {colors, fonts} from '../../res';
import {getImageUri} from '../../services/api';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {createCart, resetActionResult} from '../../store/actions/saleActions';
import {fetchRelatedProducts} from '../../store/actions/productActions';

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

  return (
    <SafeAreaView style={styles.flex1(bgColor)}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView>
        <View>
          <Header
            onPress={() => navigation.goBack()}
            back={true}
            title={dataParams?.title}
          />
          <View style={styles.wrapperImg}>
            <Image
              source={getImageUri(dataParams?.product?.image)}
              style={styles.image}
            />
          </View>

          <View style={styles.content}>
            <View style={styles.wrapperTopContent}>
              <View style={styles.rowTopContent}>
                <Text style={styles.name}>{dataParams?.title}</Text>
              </View>
              <Text style={styles.price}>
                Rp{formatNumber(dataParams?.price)} /{' '}
                {dataParams?.weight / 1000} kg
              </Text>
            </View>
            <Text style={styles.excerpt}>{dataParams?.product?.excerpt}</Text>
            <Text style={styles.desc}>{dataParams?.product?.description}</Text>
            <View style={styles.wrapperRelatedItems}>
              <Text style={styles.titleRelatedItems}>Related Items</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.wrapperBoxRelatedItems}>
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
                </View>
              </ScrollView>
            </View>
            {/* <Gap height={50} /> */}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <HStack space={3} alignItems="center" justifyContent="center">
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
              // isLoading={isLoading}
              borderRadius={20}
              // disabled={buttonDisabled}
              variant="solid"
              colorScheme={'emerald'}
              onPress={() => {
                onAddToCart();
              }}>
              Keranjang
            </Button>
          </Box>
        </HStack>
      </View>
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
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 100,
    alignSelf: 'flex-end',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  flex1: bgColor => ({
    flex: 1,
    backgroundColor: bgColor,
    position: 'relative',
  }),
  wrapperImg: {
    // backgroundColor: '#f00f00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    // height: 350,
    width: '100%',
    aspectRatio: 1600 / 1066,
    resizeMode: 'contain',
  },
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -15,
    paddingTop: 34,
  },
  wrapperTopContent: {
    marginBottom: 28,
    paddingHorizontal: 20,
  },
  rowTopContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: fonts.SemiBold,
    fontSize: 20,
    width: '80%',
  },
  price: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    color: colors.black,
  },
  excerpt: {
    backgroundColor: colors.lightGrey,
    marginHorizontal: 20,
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  desc: {
    paddingHorizontal: 20,
    lineHeight: 20,
    fontSize: 15,
  },
  wrapperRelatedItems: {
    marginTop: 25,
  },
  titleRelatedItems: {
    fontFamily: fonts.SemiBold,
    fontSize: 14,
    color: colors.primary,
    paddingHorizontal: 20,
  },
  wrapperBoxRelatedItems: {
    flexDirection: 'row',
    marginTop: 20,
    paddingLeft: 20,
  },

  bottomBar: {
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: colors.lightGrey,
    borderTopWidth: 1,
    backgroundColor: colors.white,
  },
  btnAtc: {
    backgroundColor: colors.primary,
    height: 37,
    width: 150,
    paddingHorizontal: 10,
    borderRadius: 6,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  btnAtcText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: colors.white,
    textAlign: 'center',
  },
});
