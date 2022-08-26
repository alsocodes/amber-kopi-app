import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Header} from '../../components';
import {colors} from '../../res';

import {getImageUri} from '../../services/api';
import {RefreshControl, SafeAreaView, useColorScheme} from 'react-native';
import {
  Badge,
  Box,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Skeleton,
  Spacer,
  Stack,
  StatusBar,
  Text,
  VStack,
} from 'native-base';
import {ddMmYy, formatNumber} from '../../helper/utils';

import {fetchActiveSales, fetchSales} from '../../store/actions/saleActions';

const Transaksi = ({navigation}) => {
  const {sales, activeSales, salesFetching, activesalesFetching} = useSelector(
    state => state.sale,
  );
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log('triggered');
    dispatch(fetchSales());
    dispatch(fetchActiveSales());
  }, [dispatch]);

  useEffect(() => {
    console.log(
      sales?.rows?.length,
      activeSales?.rows?.length,
      salesFetching,
      activesalesFetching,
    );
  }, [sales, activeSales, salesFetching, activesalesFetching]);

  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (refreshing) {
      dispatch(fetchSales());
      dispatch(fetchActiveSales());
    }
  }, [refreshing]);
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
        <Header title="Transaksi" />
      </Box>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'#34d399'}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Stack px={4} py={2}>
          <Text my={2} bold fontSize={16} color={'gray.600'}>
            Transaksi sedang aktif ({activeSales?.rows?.length || 0})
          </Text>
          {activesalesFetching ? (
            <Loading />
          ) : activeSales?.rows?.length > 0 ? (
            activeSales?.rows?.map((item, index) => {
              return (
                <ItemSale key={index} item={item} navigation={navigation} />
              );
            })
          ) : (
            <Text
              px={4}
              py={2}
              borderRadius={10}
              alignSelf={'center'}
              bg={'emerald.100'}
              flex={1}
              margin={5}
              fontSize={14}
              textAlign={'center'}>
              Upps.., Belum ada transaksi
            </Text>
          )}
          <Text my={2} mt={3} bold fontSize={16} color={'gray.600'}>
            Transaksi Selesai ({sales?.rows?.length || 0})
          </Text>
          {salesFetching ? (
            <Loading />
          ) : sales?.rows?.length > 0 ? (
            sales?.rows?.map((item, index) => {
              return (
                <ItemSale key={index} item={item} navigation={navigation} />
              );
            })
          ) : (
            <Text
              px="4"
              py={2}
              borderRadius={10}
              alignSelf={'center'}
              bg={'emerald.100'}
              flex={1}
              margin={5}
              fontSize={14}
              textAlign={'center'}>
              Upps.., Belum ada transaksi
            </Text>
          )}
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
};

const Loading = () => {
  return (
    <Box
      _dark={{
        borderColor: 'gray.600',
      }}
      borderColor="coolGray.200"
      py="2"
      borderWidth={1}
      borderRadius={5}
      mb={2}
      px="2"
      p="5">
      <HStack
        space={3}
        justifyContent="space-between"
        width={'100%'}
        borderBottomWidth={1}
        mb={2}
        py={1}
        flex={1}
        borderColor={'gray.200'}>
        <VStack width={'30%'}>
          <Skeleton.Text lines={1} rounded={'sm'} />
          <Skeleton.Text lines={1} mt={1} rounded={'sm'} />
        </VStack>
        <VStack alignItems={'flex-end'} width={'40%'}>
          <Skeleton.Text lines={1} width={'50%'} rounded={'sm'} />
          <Skeleton.Text lines={1} mt={1} rounded={'sm'} />
        </VStack>
      </HStack>
      <HStack
        space={3}
        width={'100%'}
        borderBottomWidth={1}
        mb={2}
        py={1}
        flex={1}
        borderColor={'gray.200'}>
        <Skeleton height={'10'} rounded={'sm'} width={'15%'} />
        <Skeleton.Text mt={1} lines={2} rounded={'sm'} width={'70%'} />
      </HStack>
      <HStack
        space={3}
        justifyContent="space-between"
        width={'100%'}
        mb={2}
        py={1}
        flex={1}
        borderColor={'gray.200'}>
        <Skeleton.Text mt={1} lines={1} rounded={'sm'} width={'30%'} />
        <Skeleton.Text mt={1} lines={1} rounded={'sm'} width={'40%'} />
      </HStack>
    </Box>
  );
};

const ItemSale = ({item, navigation}) => {
  // console.log(Object.keys(item));
  return (
    <Pressable
      onPress={() => navigation.navigate('TransaksiDetail', {id: item.id})}>
      {({isHovered, isFocused, isPressed}) => {
        return (
          <Box
            _dark={{
              borderColor: 'gray.600',
            }}
            borderColor="coolGray.200"
            py="2"
            borderWidth={1}
            borderRadius={5}
            mb={2}
            px="2"
            bg={
              isPressed ? 'coolGray.100' : isHovered ? 'coolGray.100' : 'white'
            }
            p="5">
            <HStack
              space={3}
              justifyContent="space-between"
              width={'100%'}
              borderBottomWidth={1}
              mb={2}
              py={1}
              borderColor={'gray.200'}>
              <VStack>
                <Text bold>#{item.no}</Text>
                <Text>{ddMmYy(new Date(item.date))}</Text>
              </VStack>
              <VStack alignItems={'flex-end'}>
                <Text>{item.status.toUpperCase()}</Text>
                <Badge colorScheme={'info'}>
                  {item.status === 'pending'
                    ? 'Menunggu pembayaran'
                    : item.status === 'paid'
                    ? 'Pembayaran diterima'
                    : item.status === 'delivery'
                    ? 'Barang dalam pengiriman'
                    : item.status === 'received'
                    ? 'Barang diterima'
                    : 'Selesai'}
                </Badge>
              </VStack>
            </HStack>
            <HStack space={3} justifyContent="space-between" width={'100%'}>
              <Image
                borderRadius={10}
                source={getImageUri(
                  item.saleitems?.[0]?.variant?.product?.image,
                )}
                width={'14%'}
                // height={20}
                alt={'image'}
              />
              <VStack width={'78%'}>
                <Box height={10}>
                  <Text
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color="coolGray.600"
                    flex={1}
                    isTruncated={true}
                    numberOfLines={2}
                    // bg="yellow.100"
                  >
                    {item.saleitems?.[0].qty} x{item.saleitems?.[0].productName}
                  </Text>
                </Box>
              </VStack>
              <Spacer />
            </HStack>
            <HStack
              borderTopWidth={1}
              borderColor={'gray.200'}
              space={3}
              justifyContent="space-between"
              alignItems={'center'}
              width={'100%'}
              py={1}
              mt={3}>
              <Text fontSize={12}>{item.saleitems?.length} barang</Text>
              <Text bold>Rp{formatNumber(item.grandTotal)}</Text>
            </HStack>
          </Box>
        );
      }}
    </Pressable>
  );
};

export default Transaksi;
