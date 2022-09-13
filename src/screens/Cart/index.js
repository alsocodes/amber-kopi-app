import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {colors} from '../../res';

import {
  HStack,
  VStack,
  Text,
  Box,
  ScrollView,
  AlertDialog,
  Button,
  Skeleton,
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {deleteCart, updateCart} from '../../store/actions/saleActions';
import {Header} from '../../components';
import ItemCart from './ItemCart';

const Cart = ({navigation}) => {
  const {carts, cartProducts, isLoading, actionResult} = useSelector(
    state => state.sale,
  );

  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch]);

  useEffect(() => {
    // console.log('carts', carts?.length, isLoading);
  }, [carts, isLoading]);

  const [selectedCart, setSelectedCart] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  useEffect(() => {
    setSelectedCart(carts.filter(a => a.selected === true, []));
    setSelectedBusiness(
      carts.find(a => a.selected === true)?.data?.product?.businessId || null,
    );
  }, [carts]);

  useEffect(() => {
    console.log('xyyy ', selectedBusiness, selectedCart?.length);
  }, [selectedCart, selectedBusiness]);

  const onInTypeChange = (id, inType, qty) => {
    // console.log(id, value);
    dispatch(updateCart({id: id, inType: inType, qty: qty}));
  };

  const [deleteModal, setDeleteModal] = useState(false);
  const cancelRef = useRef(null);
  useEffect(() => {
    if (actionResult && actionResult?.type === 'deleteCart')
      setDeleteModal(false);
  }, [actionResult]);

  const onDeleteCart = () => {
    dispatch(deleteCart(deleteModal));
    setDeleteModal(false);
  };

  return (
    <SafeAreaView>
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
          title="Keranjang Belanja"
          onPress={() => navigation.goBack()}
          back={true}
        />
      </Box>
      <ScrollView bg="white" h="100%">
        {isLoading ? (
          <Box>
            <VStack
              py={4}
              px={4}
              borderBottomWidth={1}
              borderColor={'gray.200'}>
              <HStack flex={1} space={1} width={'100%'}>
                <Skeleton height={'20'} width={'20'} borderRadius={10} />
                <Skeleton.Text px="2" flex={1} />
              </HStack>
              <HStack
                flex={1}
                justifyContent={'space-between'}
                width={'100%'}
                mt={2}>
                <Skeleton height={'10'} width={'40'} borderRadius={10} />
                <Skeleton height={'10'} width={'40'} borderRadius={10} />
              </HStack>
            </VStack>
            <VStack
              py={4}
              px={4}
              borderBottomWidth={1}
              borderColor={'gray.200'}>
              <HStack flex={1} space={1} width={'100%'}>
                <Skeleton height={'20'} width={'20'} borderRadius={10} />
                <Skeleton.Text px="2" flex={1} />
              </HStack>
              <HStack
                flex={1}
                justifyContent={'space-between'}
                width={'100%'}
                mt={2}>
                <Skeleton height={'10'} width={'40'} borderRadius={10} />
                <Skeleton height={'10'} width={'40'} borderRadius={10} />
              </HStack>
            </VStack>
          </Box>
        ) : (
          <Box bg="white">
            {carts?.length === 0 ? (
              <Text
                p="4"
                borderRadius={10}
                alignSelf={'center'}
                bg={'emerald.100'}
                flex={1}
                margin={5}
                fontSize={16}
                textAlign={'center'}>
                Upps.., Belum ada transaksi
              </Text>
            ) : (
              <Box>
                {carts?.map(item => {
                  // console.log('cartItem', item);
                  return (
                    <ItemCart
                      setDeleteModal={setDeleteModal}
                      selectedBusiness={selectedBusiness}
                      key={item.id}
                      data={item}
                      isLoading={isLoading}
                      actionResult={actionResult}
                      onInTypeChange={onInTypeChange}
                    />
                  );
                })}

                <Button
                  isDisabled={selectedCart?.length < 1}
                  colorScheme="emerald"
                  onPress={() => navigation.navigate('Checkout')}
                  m="4"
                  borderRadius={20}
                  alignSelf={'flex-end'}
                  width="200">
                  {`(${selectedCart?.reduce((a, b) => a + b.qty, 0)}) Checkout`}
                </Button>
              </Box>
            )}
          </Box>
        )}
      </ScrollView>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(false)}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Body pt="20">
            <Text fontSize={16} textAlign="center">
              Hapus Item dari Keranjang
            </Text>
          </AlertDialog.Body>
          <HStack space={3} justifyContent="flex-end" py={4} px={4}>
            <Button.Group space={2} width={200}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={() => setDeleteModal(false)}
                width={90}
                ref={cancelRef}>
                Batal
              </Button>
              <Button
                borderRadius={20}
                isLoading={isLoading}
                colorScheme="danger"
                width={100}
                onPress={() => onDeleteCart()}>
                Ya
              </Button>
            </Button.Group>
          </HStack>
        </AlertDialog.Content>
      </AlertDialog>
    </SafeAreaView>
  );
};

export default Cart;
