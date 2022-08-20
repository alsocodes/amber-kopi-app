import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';

import {Header} from '../../components';
import {colors, fonts} from '../../res';

import {getImageUri} from '../../services/api';
import {
  PermissionsAndroid,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {
  Image,
  Pressable,
  Badge,
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Input,
  ScrollView,
  Skeleton,
  Stack,
  StatusBar,
  Text,
  TextArea,
  VStack,
  useToast,
  Spacer,
  AlertDialog,
} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUpload, faCopy, faTruck} from '@fortawesome/free-solid-svg-icons';
import {
  createConfirmPayment,
  fetchBankaccounts,
  fetchResellerSale,
  fetchSale,
  fetchTracking,
  resetSale,
} from '../../store/actions/saleActions';
import {ddMmYy, formatNumber} from '../../helper/utils';

const TransaksiReseller = ({route, navigation}) => {
  const dataParams = route.params;
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';

  const {resellerSales, resellerSalesFetching} = useSelector(
    state => state.sale,
  );

  useEffect(() => {
    dispatch(fetchResellerSale());
  }, [dispatch]);

  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (refreshing) dispatch(fetchResellerSale());
  }, [refreshing]);

  useEffect(() => {
    console.log(resellerSales);
  }, [resellerSales]);

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
        <Header
          title="Transaksi Reseller"
          back={true}
          onPress={() => navigation.goBack()}
        />
      </Box>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'#34d399'}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <VStack px={3} py={4}>
          {resellerSalesFetching ? (
            <VStack>
              <BoxSkleton />
              <BoxSkleton />
              <BoxSkleton />
            </VStack>
          ) : (
            <Box>
              <VStack>
                {resellerSales?.rows?.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      borderWidth={1}
                      borderColor={'gray.300'}
                      p={2}
                      borderRadius={10}>
                      <VStack>
                        <HStack
                          justifyContent={'space-between'}
                          borderBottomWidth={1}
                          pb={2}
                          mb={2}
                          borderColor={'gray.300'}>
                          <VStack>
                            <Text bold>#{item.no}</Text>
                            <Text>{ddMmYy(new Date(item.date))}</Text>
                          </VStack>
                          <VStack alignItems={'flex-end'}>
                            <Text bold>Rp{formatNumber(item.grandTotal)}</Text>
                            <Text>{item.status.toUpperCase()}</Text>
                          </VStack>
                        </HStack>
                        <VStack>
                          {item.saleitems?.map((a, x) => {
                            return (
                              <Text key={x}>
                                - {a.qty} x {a.productName}
                              </Text>
                            );
                          })}
                        </VStack>
                      </VStack>
                    </Box>
                  );
                })}
              </VStack>
            </Box>
          )}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

const BoxSkleton = () => {
  return (
    <Box>
      <VStack
        flex={1}
        p={2}
        mb={2}
        borderRadius={10}
        borderWidth={1}
        borderColor={'gray.300'}>
        <HStack justifyContent={'space-between'} mb={1}>
          <Skeleton.Text lines={1} w={20} />
          <Skeleton.Text lines={1} w={20} />
        </HStack>
        <HStack justifyContent={'space-between'} mb={4}>
          <Skeleton.Text lines={1} w={20} />
          <Skeleton.Text lines={1} w={20} />
        </HStack>
        <Skeleton.Text lines={3} />
      </VStack>
    </Box>
  );
};

export default TransaksiReseller;

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
