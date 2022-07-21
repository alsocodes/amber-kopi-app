import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {HStack, IconButton, Input, Select, Box} from 'native-base';
import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Modal,
  Alert,
} from 'react-native';
import {BoxRelatedItems, Counter, Button, Gap, Header} from '../../components';
import {formatNumber} from '../../helper/utils';
import {products} from '../../products';
import {
  colors,
  fonts,
  IL_Cauliflawer_PNG,
  IL_Grapes_PNG,
  IL_Greentea_PNG,
  IL_Tomato_PNG,
} from '../../res';
import {getImageUri} from '../../services/api';
import {
  // faChevronDown,
  faMinus,
  faPlus,
  // faStar,
} from '@fortawesome/free-solid-svg-icons';

const Detail = ({route, navigation}) => {
  const dataParams = route.params;
  const bgColor = route.params.bgColor;
  const isDarkMode = useColorScheme() === 'dark';
  const [totalItem, setTotalItem] = useState(1);

  const dataRelatedItems = [...products].filter((a, i) => i < 3);

  const onCounterChange = value => {
    setTotalItem(value);
  };

  const [modalVisible, setModalVisible] = useState(true);

  const [qty, setQty] = useState(1);
  const updateQty = value => {
    if (value < 0 && qty === 1) return;
    setQty(parseInt(qty, 10) + value);
  };

  const onQtyChange = value => {
    if (parseInt(value, 10) < 1) setQty(1);
    else setQty(value);
  };

  const addToCartPress = () => {
    Alert.alert('Add to cart', 'Produk berhasil ditambahkan ke keranjang', [
      {
        text: 'Tambahkan lainya',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Lihat Keranjang', onPress: () => navigation.navigate('Cart')},
    ]);
  };

  return (
    <SafeAreaView style={styles.flex1(bgColor)}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <StatusBar barStyle="dark-content" backgroundColor={colors.lightGrey} />
      <ScrollView>
        <View>
          {/* header */}
          <Header onPress={() => navigation.goBack()} />
          {/* image */}
          <View style={styles.wrapperImg}>
            <Image
              source={getImageUri(dataParams.product?.image)}
              style={styles.image}
            />
          </View>
          {/* content */}
          <View style={styles.content}>
            {/* top content */}
            <View style={styles.wrapperTopContent}>
              <View style={styles.rowTopContent}>
                <Text style={styles.name}>{dataParams.title}</Text>
              </View>
              <Text style={styles.price}>
                Rp{formatNumber(dataParams.price)} / {dataParams.weight / 1000}{' '}
                kg
              </Text>
            </View>
            {/* description */}
            <Text style={styles.excerpt}>{dataParams.product?.excerpt}</Text>
            <Text style={styles.desc}>{dataParams.product?.description}</Text>
            {/* related items */}
            <View style={styles.wrapperRelatedItems}>
              <Text style={styles.titleRelatedItems}>Related Items</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.wrapperBoxRelatedItems}>
                  {dataRelatedItems.map((item, index) => {
                    return (
                      <BoxRelatedItems
                        key={index}
                        image={item.image}
                        name={item.title}
                        price={item.price}
                        bgColor={item.bgColor}
                      />
                    );
                  })}
                </View>
              </ScrollView>
            </View>
            {/* button add to cart */}
            <Gap height={50} />
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        {/* <Button
          style={styles.btnAtc}
          text="Add To Cart"
          onPress={addToCartPress}
        /> */}
        {/* <Counter onValueChange={onCounterChange} /> */}
        <HStack space={3} alignItems="center" justifyContent="center">
          <Box flex={1} pt={2}>
            <HStack space={1}>
              <Input
                placeholder="0"
                value={`${qty}`}
                onChangeText={q => onQtyChange(q)}
                px={2}
                size="md"
                height={34}
                flex={1}
                borderColor={colors.grey}
                InputRightElement={<Text pr={10}>Pcs </Text>}
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
            </HStack>
          </Box>

          <Box flex={1}>
            <Select
              // flex={1}
              // selectedValue={service}
              // minWidth="140"
              borderColor={colors.grey}
              height={36}
              accessibilityLabel="Pilih Jenis"
              placeholder="Pilih Jenis"
              _selectedItem={{
                bg: 'teal.600',
                // endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              // onValueChange={itemValue => setService(itemValue)}
            >
              <Select.Item label="Roast Bean" value="roastbean" />
              <Select.Item label="Bubuk" value="bubuk" />
            </Select>
          </Box>
          <Box flex={1} pt={2}>
            <TouchableOpacity style={styles.btnAtc}>
              <Text style={styles.btnAtcText}>Keranjang</Text>
            </TouchableOpacity>
          </Box>
        </HStack>
      </View>
      {/* <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
      
          </View>
        </View>
      </Modal> */}
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
    marginTop: -20,
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
