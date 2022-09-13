import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  useColorScheme,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  useWindowDimensions,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {BoxItemCategories, BoxItemTopProduct} from '../../components';
import {colors, fonts} from '../../res';
import {
  fetchAllBanners,
  fetchAllCatProducts,
  fetchAllProducts,
} from '../../store/actions/productActions';
import {getImageUri} from '../../services/api';
import {
  Box,
  HStack,
  IconButton,
  Image,
  Input,
  Skeleton,
  Stack,
  Text,
} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch, faShoppingBasket} from '@fortawesome/free-solid-svg-icons';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CartBadge from '../../components/atoms/CartBadge';

const ItemBanner = ({item, index}) => {
  return (
    <Box key={index} height={150}>
      <Image
        borderRadius={10}
        overflow={'hidden'}
        source={getImageUri(item.image)}
        alt={item.title}
        width={'100%'}
        height={'100%'}
      />
    </Box>
  );
};

const Home = ({navigation}) => {
  const {catProducts, products, bannerFetching, banners} = useSelector(
    state => state.product.product,
  );

  const {carts} = useSelector(state => state.sale);
  const isDarkMode = useColorScheme() === 'light';
  const dispatch = useDispatch();
  const {height: windowHeight} = useWindowDimensions();

  useEffect(() => {
    // console.log('triggered');
    dispatch(fetchAllCatProducts());
    dispatch(fetchAllProducts());
    dispatch(fetchAllBanners());
  }, [dispatch]);

  useEffect(() => {
    // console.log('catProducts', products);
  }, [products]);

  const SLIDER_WIDTH = Dimensions.get('window').width + 80;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.78);
  const isCarousel = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const [searchText, setSearchText] = useState('');
  const onSubmitSearch = () => {
    // console.log(searchText);
    navigation.navigate('Search', {searchQuery: searchText});
  };

  useEffect(() => {
    // console.log('banner  ', bannerFetching, banners);
  }, [bannerFetching, banners]);

  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (refreshing) {
      dispatch(fetchAllCatProducts());
      dispatch(fetchAllProducts());
      dispatch(fetchAllBanners());
    }
  }, [refreshing]);
  return (
    <SafeAreaView style={styles.flex1}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'#34d399'}
      />
      <HStack
        bg={'#34d399'}
        justifyItems={'center'}
        justifyContent={'center'}
        space={1}
        py={3}
        px={3}>
        <Input
          onChangeText={value => setSearchText(value)}
          onSubmitEditing={() => onSubmitSearch()}
          backgroundColor={'white'}
          flex={1}
          size={14}
          height={10}
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
        <CartBadge
          onPress={() => navigation.navigate('Cart')}
          dark={true}
          value={carts?.reduce((a, b) => a + b.qty, 0)}
        />
      </HStack>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Box px="3" py="4" backgroundColor={'white'}>
          <Stack space={4}>
            <Box>
              {bannerFetching === true && banners?.length === 0 ? (
                <Skeleton height={150} borderRadius={10} />
              ) : (
                <Carousel
                  ref={isCarousel}
                  data={banners}
                  renderItem={ItemBanner}
                  sliderWidth={SLIDER_WIDTH}
                  itemWidth={ITEM_WIDTH}
                  inactiveSlideShift={0}
                  useScrollView={true}
                  snapToAlignment="start"
                  activeSlideAlignment="start"
                  autoplay={true}
                  autoplayInterval={5000}
                  autoplayDelay={5000}
                  layout="default"
                  loop={true}
                  onSnapToItem={index => setActiveIndex(index)}
                  style={{backgroundColor: colors.grey}}
                  // hasParallaxImages={true}
                />
              )}
            </Box>
            <Box mt={0}>
              <Text
                mt={2}
                fontSize={18}
                color={'emerald.500'}
                fontWeight={'semibold'}>
                Kategori
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {catProducts?.rows?.map(item => {
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
              <Text
                mt={2}
                fontSize={18}
                color={'emerald.500'}
                fontWeight={'semibold'}
                mt={2}>
                Produk
              </Text>
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

  scrollViewCategories: {
    paddingLeft: 20,
  },
  wrapperHeadTopProducts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  sectionBoxTopProduct: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',

    // paddingHorizontal: 20,
  },
});
