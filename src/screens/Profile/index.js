import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

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
import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native';
import {
  Box,
  Center,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  ScrollView,
  Skeleton,
  StatusBar,
  VStack,
} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {Logo_Amber} from '../../res/images/Illustrations';

const Home = ({navigation}) => {
  const {catProducts, products} = useSelector(state => state.product.product);
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log('triggered');
    dispatch(fetchAllCatProducts());
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    // console.log('catProducts', products);
  }, [products]);

  return (
    // <SafeAreaView>
    <ScrollView>
      <StatusBar barStyle="light-content" backgroundColor="#10b981" />
      <Box py="5" px="3">
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
        {/* <Image source={Logo_Amber} width={30} /> */}
        <Heading fontSize={16} mt={2} color={'gray.600'}>
          Kategori
        </Heading>

        {/* <Center w="100%">
          <VStack
            w="90%"
            maxW="400"
            borderWidth="1"
            space={8}
            overflow="hidden"
            rounded="md"
            _dark={{
              borderColor: 'coolGray.500',
            }}
            _light={{
              borderColor: 'coolGray.200',
            }}>
            <Skeleton h="40" />
            <Skeleton.Text px="4" />
            <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
          </VStack>
        </Center> */}
      </Box>
    </ScrollView>
    // </SafeAreaView>
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
