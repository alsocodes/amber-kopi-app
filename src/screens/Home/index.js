import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  useColorScheme,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {
  BoxItemCategories,
  BoxItemTopProduct,
  Gap,
  Header,
} from '../../components';
// import {products} from '../../products';
import {
  colors,
  fonts,
  IC_Bakery,
  IC_Bakery2,
  IC_Drinks,
  IC_Fruits,
  IC_Search,
  IC_Vegetables,
  IL_Cauliflawer_PNG,
  IL_Grapes_PNG,
  IL_Greentea_PNG,
  IL_Tomato_PNG,
} from '../../res';
import {
  fetchAllCatProducts,
  fetchAllProducts,
} from '../../store/actions/productActions';
import {getImageUri} from '../../services/api';
import {Box, Flex, Heading, IconButton, Input, Stack} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FlatGrid} from 'react-native-super-grid';
import ProductItemCard from '../../components/molecules/ProductItemCard';

const Home = ({navigation}) => {
  const {catProducts, products} = useSelector(state => state.product.product);
  const isDarkMode = useColorScheme() === 'light';
  const dispatch = useDispatch();
  const {height: windowHeight} = useWindowDimensions();
  const itemDimensionSize = Math.max((windowHeight - 250) / 3, 100);
  useEffect(() => {
    // console.log('triggered');
    dispatch(fetchAllCatProducts());
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    // console.log('catProducts', products);
  }, [products]);

  return (
    <SafeAreaView style={styles.flex1}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'#34d399'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box px="3" py="4" backgroundColor={'white'}>
          <Stack space={4}>
            <Input
              bg="white"
              size={14}
              placeholder="Cari produk Amber Kopi"
              borderRadius={20}
              type={'text'}
              keyboardType="web-search"
              InputRightElement={
                <IconButton
                  icon={<FontAwesomeIcon icon={faSearch} color={colors.grey} />}
                />
              }
            />
            <Box>
              <Text style={styles.tittleTopProducts}>Kategori</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {catProducts?.map(item => {
                  return (
                    <BoxItemCategories
                      key={item.id}
                      color="rgba(169, 178, 169, 0.5)"
                      text={item.name}
                      onPress={() => navigation.navigate('Categories', item)}
                    />
                  );
                })}
              </ScrollView>
            </Box>

            <Box>
              <Text style={styles.tittleTopProducts}>Top Products</Text>
              <View style={styles.sectionBoxTopProduct}>
                {products?.rows?.map((item, index) => {
                  return (
                    <BoxItemTopProduct
                      key={index}
                      bgColor={item.bgColor}
                      icon={getImageUri(item?.product?.image)}
                      text={item.title}
                      price={item.price}
                      index={index}
                      onPress={() => navigation.navigate('Detail', item)}
                    />
                  );
                })}
              </View>
            </Box>
          </Stack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  flex1: {flex: 1},
  wrapperSearch: {
    height: 40,
    backgroundColor: colors.lightGrey,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  titleCategories: {
    fontSize: 18,
    fontFamily: fonts.SemiBold,
    color: colors.primary,
    padding: 20,
  },
  scrollViewCategories: {
    paddingLeft: 20,
  },
  wrapperHeadTopProducts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  tittleTopProducts: {
    color: colors.primary,
    fontFamily: fonts.SemiBold,
    fontSize: 20,
    marginBottom: 4,
  },
  textSeeAll: {
    color: colors.black,
    fontFamily: fonts.Medium,
    fontSize: 12,
  },
  sectionBoxTopProduct: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',

    // paddingHorizontal: 20,
  },
});
