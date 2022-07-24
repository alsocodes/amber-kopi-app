import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {colors, fonts} from '../../res';
import {getImageUri} from '../../services/api';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {
  Avatar,
  FlatList,
  Heading,
  HStack,
  VStack,
  Text,
  Spacer,
  Image,
  Badge,
  IconButton,
  Input,
  Box,
  Checkbox,
  ScrollView,
  AlertDialog,
  Button,
  Select,
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteCarts,
  fetchCarts,
  updateCarts,
} from '../../store/actions/saleActions';

const Cart = ({navigation}) => {
  const {carts, isLoading, actionResult} = useSelector(state => state.sale);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCarts());
  }, [actionResult, dispatch]);

  useEffect(() => {
    console.log('carts', carts?.length);
  }, [carts]);

  // console.log('isLoading', isLoading);
  const [selectedCart, setSelectedCart] = useState([]);
  const onCheckboxChange = (id, checked) => {
    console.log('oc', id, checked);
    cartData?.map(item => console.log(item.id));
    const tmpData = cartData?.map(item => {
      const data = {
        ...item,
      };
      // console.log(item.data)
      if (item?.id === id) data['selected'] = checked;
      return data;
    }, []);
    setCartData(tmpData);
  };

  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    setCartData(carts);
  }, [carts]);

  useEffect(() => {
    console.log(
      'selected',
      cartData?.filter(a => a.selected === true, []).map(a => a.id, []),
    );
  });

  const onInTypeChange = (id, inType, qty) => {
    // console.log(id, value);
    dispatch(updateCarts({id: id, inType: inType, qty: qty}));
  };

  return (
    <SafeAreaView>
      <ScrollView bg="gray.50" h="100%">
        {/* <Text style={styles.pageTitle}>Keranjang</Text> */}
        <Box bg="white">
          <Heading fontSize="lg" p="4" pb="3" color={'gray.600'}>
            Keranjang Belanja
          </Heading>
          {cartData?.map(item => (
            <ItemCart
              key={item.id}
              data={item}
              isLoading={isLoading}
              actionResult={actionResult}
              onInTypeChange={onInTypeChange}
              onCheckboxChange={(id, checked) => onCheckboxChange(id, checked)}
            />
          ))}
          {cartData?.length > 0 && (
            <Button
              colorScheme="emerald"
              onPress={() => navigation.navigate('Checkout')}
              m="4"
              borderRadius={20}
              alignSelf={'flex-end'}
              width="200">
              Checkout
            </Button>
          )}
          {/* <FlatList
              data={carts || []}
              renderItem={({item}) => <ItemCart item={item} />}
              keyExtractor={item => item.id}
            /> */}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

const ItemCart = ({data, isLoading, actionResult, onInTypeChange}) => {
  const [item, setItem] = useState({...data});
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);
  const [qty, setQty] = useState(item.qty);
  const updateQty = value => {
    if (value < 0 && qty === 1) setIsOpen(true);
    else {
      setQty(parseInt(qty, 10) + value);
      dispatch(updateCarts({id: item.id, inType: item.inType, qty: item.qty}));
    }
  };

  // const onQtyChange = value => {
  //   if (parseInt(value, 10) < 1) setIsOpen(true);
  //   else setQty(value);
  // };

  const dispatch = useDispatch();
  const onDeleteCart = () => {
    dispatch(deleteCarts(item.id));
  };

  useEffect(() => {
    if (actionResult && actionResult?.type === 'deleteCart') setIsOpen(false);
  }, [actionResult]);

  const onSelectChange = value => {
    // item.inType = value;
    setItem({...item, inType: value});
    onInTypeChange(item.id, value, item.qty);
  };

  return (
    <Box
      borderBottomWidth="1"
      _dark={{
        borderColor: 'gray.600',
      }}
      bg={'gray.50'}
      borderColor="coolGray.200"
      pl="4"
      pr="5"
      py="5">
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          {/* <AlertDialog.Header>Hapus Item dari Keranjang</AlertDialog.Header> */}
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
                onPress={onClose}
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
      <HStack space={3} justifyContent="space-between" width={'100%'}>
        <Image
          borderRadius={20}
          source={getImageUri(item.variant?.product?.image)}
          width={'20%'}
          // height={20}
          alt={item.variant?.product?.image}
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
              bold>
              {item.variant?.product?.title}
            </Text>
          </Box>
          <HStack justifyContent={'space-between'} mt={1}>
            <Badge colorScheme={'info'}>{item.variant?.name}</Badge>
          </HStack>
        </VStack>
        <Spacer />
      </HStack>
      <HStack mt={2} justifyContent={'space-between'}>
        <Select
          selectedValue={item.inType}
          width={160}
          borderColor={colors.grey}
          height={36}
          mt={0}
          accessibilityLabel="Pilih Jenis"
          placeholder="Pilih Jenis"
          _selectedItem={{
            bg: 'gray.200',
          }}
          mt={1}
          onValueChange={itemValue => onSelectChange(itemValue)}>
          <Select.Item label="Roast Bean" value="roastbean" />
          <Select.Item label="Bubuk" value="bubuk" />
        </Select>
        <HStack space={1} width={160} mt={2}>
          <IconButton
            variant="outline"
            color={colors.grey}
            borderColor={colors.grey}
            alignItems="center"
            justifyContent="center"
            minWidth={8}
            height={36}
            _icon={{color: colors.grey}}
            icon={<FontAwesomeIcon icon={faMinus} size={12} />}
            onPress={() => updateQty(-1)}
          />
          <Input
            placeholder="0"
            value={`${qty}`}
            // onChangeText={q => onQtyChange(q)}
            px={2}
            size="sm"
            height={36}
            isReadOnly={true}
            textAlign={'center'}
            flex={1}
            borderColor={colors.grey}
            // InputRightElement={<Text pr={10}>Pcs </Text>}
          />
          <IconButton
            height={36}
            variant="outline"
            color={colors.grey}
            borderColor={colors.grey}
            alignItems="center"
            justifyContent="center"
            minWidth={8}
            _icon={{color: colors.grey}}
            icon={<FontAwesomeIcon icon={faPlus} size={12} />}
            onPress={() => updateQty(1)}
          />
        </HStack>
      </HStack>
    </Box>
  );
};
export default Cart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGrey,
    height: '100%',
    // padding: 14,
  },
  pageTitle: {
    fontSize: 18,
    fontFamily: fonts.SemiBold,
    color: colors.primary,
    marginBottom: 10,
  },
  cartWrapper: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
});
