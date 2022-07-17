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
            <Image source={dataParams.image} style={styles.image} />
          </View>
          {/* content */}
          <View style={styles.content}>
            {/* top content */}
            <View style={styles.wrapperTopContent}>
              <View style={styles.rowTopContent}>
                <Text style={styles.name}>{dataParams.title}</Text>
                <Counter onValueChange={onCounterChange} />
              </View>
              <Text style={styles.price}>
                Rp{formatNumber(dataParams.price)} / {dataParams.weight / 1000}{' '}
                kg
              </Text>
            </View>
            {/* description */}
            <Text style={styles.excerpt}>{dataParams.excerpt}</Text>
            <Text style={styles.desc}>{dataParams.description}</Text>
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
      <View style={{margin: 8}}>
        <Button text="Add To Cart" onPress={addToCartPress} />
        {/* <Button
          // onPress={onPressLearnMore}
          color={colors.primary}
          title="Add to cart"
          style={{padding: 20}}
          padding="10"
        /> */}
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
    height: 350,
    width: '100%',
    resizeMode: 'cover',
  },
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 30,
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
});
