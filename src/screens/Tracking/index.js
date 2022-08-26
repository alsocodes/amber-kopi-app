import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Header} from '../../components';
import {colors} from '../../res';

import {
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {
  Box,
  HStack,
  ScrollView,
  Skeleton,
  StatusBar,
  Text,
  VStack,
} from 'native-base';
import {fetchTracking} from '../../store/actions/saleActions';

const Tracking = ({route, navigation}) => {
  const dataParams = route.params;
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const {tracking, trackingFetching} = useSelector(state => state.sale);

  useEffect(() => {
    if (dataParams) {
      dispatch(
        fetchTracking({
          courir: dataParams?.shippingCourir,
          waybill: dataParams?.waybill,
        }),
      );
    }
  }, [dataParams]);

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
      fetchTracking({
        courir: dataParams?.shippingCourir,
        waybill: dataParams?.waybill,
      });
    }
  }, [refreshing]);

  const [manifest, setManifest] = useState([]);
  useEffect(() => {
    console.log(tracking);
    setManifest(tracking?.rajaongkir?.result?.manifest);
  }, [tracking]);

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
          title="Lacak Pengiriman"
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
        <VStack py={2} px={4} space={2}>
          <Box borderWidth={1} borderColor={'gray.300'} rounded={10} p={3}>
            <HStack justifyContent={'space-between'}>
              <Text>Ekspedisi</Text>
              <Text fontWeight={'semibold'}>
                {dataParams?.shippingCourir?.toUpperCase()}
              </Text>
            </HStack>
            <HStack justifyContent={'space-between'}>
              <Text>No Resi</Text>
              <Text fontWeight={'semibold'}>{dataParams?.waybill}</Text>
            </HStack>
          </Box>
          {trackingFetching ? (
            <Box mb={3} pl={2}>
              <VStack>
                <BoxSkleton />
                <BoxSkleton />
                <BoxSkleton />
              </VStack>
            </Box>
          ) : (
            <Box mb={3} pl={2}>
              <VStack>
                {manifest?.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      borderLeftWidth={1}
                      borderColor={'gray.400'}>
                      <HStack
                        space={3}
                        justifyItems={'center'}
                        alignItems={'center'}>
                        <Box
                          borderWidth={2}
                          borderColor={'emerald.400'}
                          w={6}
                          h={6}
                          ml={-3}
                          bg={index === 0 ? 'emerald.400' : 'white'}
                          borderRadius={100}></Box>
                        <VStack
                          flex={1}
                          borderWidth={1}
                          borderColor={'gray.300'}
                          p={2}
                          mb={2}
                          borderRadius={10}>
                          <HStack
                            justifyContent={'space-between'}
                            // borderBottomWidth={1}
                            py={1}
                            mb={1}
                            borderColor={'gray.200'}>
                            <Text fontWeight={'semibold'}>
                              {/* {ddMmYy(new Date('2022-08-04 22:57:59'))} */}
                              {item.manifest_date} {item.manifest_time}
                            </Text>
                            <Text fontWeight={'semibold'}>
                              {item.city_name}
                            </Text>
                          </HStack>
                          <Text>{item.manifest_description}</Text>
                        </VStack>
                      </HStack>
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
    <Box borderLeftWidth={1} borderColor={'gray.400'}>
      <HStack space={3} justifyItems={'center'} alignItems={'center'}>
        <Skeleton
          borderWidth={2}
          borderColor={'gray.300'}
          w={6}
          h={6}
          ml={-3}
          bg={'gray.400'}
          borderRadius={100}
        />
        <VStack
          flex={1}
          borderWidth={1}
          borderColor={'gray.300'}
          p={2}
          mb={2}
          borderRadius={10}>
          <HStack justifyContent={'space-between'} mb={2}>
            <Skeleton.Text lines={1} w={20} />
            <Skeleton.Text lines={1} w={20} />
          </HStack>
          <Skeleton.Text lines={3} />
        </VStack>
      </HStack>
    </Box>
  );
};

export default Tracking;
