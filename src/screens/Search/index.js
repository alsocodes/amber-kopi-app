import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  useColorScheme,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {BoxItemTopProduct} from '../../components';
import {colors, fonts} from '../../res';
import {searchProducts} from '../../store/actions/productActions';
import {getImageUri} from '../../services/api';
import {
  Box,
  HStack,
  IconButton,
  Input,
  Skeleton,
  VStack,
  Text,
} from 'native-base';
import {
  faShoppingBasket,
  faSearch,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const Search = ({route, navigation}) => {
  const {searches, searchFetching} = useSelector(
    state => state.product.product,
  );
  const dataParams = route.params;
  const isDarkMode = useColorScheme() === 'light';

  const [searchQuery, setSearchQuery] = useState(dataParams.searchQuery);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchProducts({search: searchQuery}));
  }, []);
  const [searchText, setSearchText] = useState(searchQuery);
  useEffect(() => {
    console.log('search', searchFetching);
  }, [searches, searchFetching]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    if (refreshing) dispatch(searchProducts({search: searchQuery}));
  }, [refreshing]);

  return (
    <SafeAreaView
      style={styles.flex1}
      style={{backgroundColor: colors.white, height: '100%'}}>
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
        <IconButton
          onPress={() => navigation.goBack()}
          variant="ghost"
          borderRadius={10}
          color={colors.grey}
          borderColor={colors.grey}
          alignItems="center"
          justifyContent="center"
          height={10}
          minWidth={8}
          _icon={{color: colors.white}}
          icon={<FontAwesomeIcon icon={faChevronLeft} size={24} />}
          // onPress={() => updateQty(-1)}
        />
        <Input
          defaultValue={searchQuery}
          onChangeText={value => setSearchQuery(value)}
          onSubmitEditing={() => {
            setSearchText(searchQuery);
            dispatch(searchProducts({search: searchQuery}));
          }}
          autoFocus={true}
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
        <IconButton
          onPress={() => navigation.navigate('Cart')}
          variant="ghost"
          borderRadius={10}
          color={colors.grey}
          borderColor={colors.grey}
          alignItems="center"
          justifyContent="center"
          height={10}
          minWidth={8}
          _icon={{color: colors.white}}
          icon={<FontAwesomeIcon icon={faShoppingBasket} size={24} />}
          // onPress={() => updateQty(-1)}
        />
      </HStack>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Box py="4" px="2">
          <Text style={styles.tittleTopProducts}>
            Hasil Pencarian : "{searchText}"
          </Text>
          <View style={styles.sectionBoxTopProduct}>
            {searchFetching ? (
              <HStack width={'100%'}>
                <VStack
                  w="48%"
                  mr="2%"
                  bg="white"
                  overflow="hidden"
                  borderRadius={10}>
                  <Skeleton height="160" />
                  <Skeleton.Text px="2" py="2" />
                </VStack>
                <VStack
                  w="48%"
                  ml="2%"
                  bg="white"
                  overflow="hidden"
                  borderRadius={10}>
                  <Skeleton height="160" />
                  <Skeleton.Text px="2" py="2" />
                </VStack>
              </HStack>
            ) : searches?.rows?.length > 0 ? (
              searches.rows.map((item, index) => {
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
              })
            ) : (
              <Text
                p="4"
                borderRadius={10}
                alignSelf={'center'}
                bg={'emerald.100'}
                flex={1}
                margin={5}
                fontSize={16}
                textAlign={'center'}>
                Upps.., tidak ada hasil pencarian
              </Text>
            )}
          </View>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  sectionBoxTopProduct: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',

    // paddingHorizontal: 20,
  },
});
