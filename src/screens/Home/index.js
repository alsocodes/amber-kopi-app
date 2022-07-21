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

const Home = ({navigation}) => {
  const {catProducts, products} = useSelector(state => state.product.product);
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('triggered');
    dispatch(fetchAllCatProducts());
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log('catProducts', products);
  }, [products]);

  return (
    <SafeAreaView style={styles.flex1}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.flex1}>
        {/* Header */}
        {/* <Header drawer /> */}
        <View style={{height: 30}}></View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* search */}
          <View style={{paddingHorizontal: 20}}>
            <View style={styles.wrapperSearch}>
              <TextInput placeholder="Search" style={styles.textInputSearch} />
              <IC_Search />
            </View>
          </View>
          {/* categories */}
          <View>
            <Text style={styles.titleCategories}>Categories</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.scrollViewCategories}>
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
          </View>
          <Gap height={24} />
          {/* top products */}
          <View>
            <View style={styles.wrapperHeadTopProducts}>
              <Text style={styles.tittleTopProducts}>Top Products</Text>
              <TouchableOpacity>
                {/* <Text style={styles.textSeeAll}>See All</Text> */}
              </TouchableOpacity>
            </View>
            <View style={styles.sectionBoxTopProduct}>
              {products?.rows?.map((item, index) => {
                return (
                  <BoxItemTopProduct
                    key={index}
                    bgColor={item.bgColor}
                    icon={getImageUri(item?.product?.image)}
                    text={item.title}
                    price={item.price}
                    onPress={() => navigation.navigate('Detail', item)}
                  />
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
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
    gap: 10,

    // paddingHorizontal: 20,
  },
});
