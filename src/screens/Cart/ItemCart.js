import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  AlertDialog,
  Badge,
  Box,
  Button,
  Checkbox,
  HStack,
  IconButton,
  Image,
  Input,
  Select,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {formatNumber} from '../../helper/utils';
import {colors} from '../../res';
import {getImageUri} from '../../services/api';
import {deleteCart, updateCart} from '../../store/actions/saleActions';

const ItemCart = ({
  data,
  isLoading,
  setDeleteModal,
  onInTypeChange,
  selectedBusiness,
}) => {
  const dispatch = useDispatch();
  const [item, setItem] = useState({...data});
  const [qty, setQty] = useState(item.qty);
  const updateQty = value => {
    if (value < 0 && qty === 1) setDeleteModal(item.id);
    else {
      const val = parseInt(qty, 10) + value;
      setQty(val);
      dispatch(updateCart({id: item.id, inType: item.inType, qty: val}));
    }
  };

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
      <Text mb={2} fontSize={13}>
        Dikirim dari {item.data?.product?.business?.label}
      </Text>
      <HStack space={3} justifyContent="space-between" width={'100%'}>
        <Checkbox
          isDisabled={
            selectedBusiness !== null &&
            selectedBusiness !== item?.data?.product?.businessId
          }
          defaultIsChecked={item.selected === true}
          onChange={value =>
            dispatch(
              updateCart({
                id: item.id,
                inType: item.inType,
                qty: item.qty,
                selected: value,
              }),
            )
          }
          colorScheme={'emerald'}
          value={item.id}
          accessibilityLabel="This is a dummy checkbox"
        />
        <Image
          borderRadius={10}
          source={getImageUri(item.data?.product?.image)}
          width={'20%'}
          alt={'image-product'}
        />
        <VStack width={'78%'}>
          <Box height={10}>
            <Text
              _dark={{
                color: 'warmGray.50',
              }}
              color={'gray.600'}
              flex={1}
              isTruncated={true}
              numberOfLines={2}
              fontWeight={'semibold'}>
              {item.data?.product?.title} @Rp{formatNumber(item.data?.price)}
            </Text>
          </Box>
          <HStack justifyContent={'space-between'} mt={1}>
            <Badge colorScheme={'info'}>{item.data?.name}</Badge>
          </HStack>
        </VStack>
        <Spacer />
      </HStack>
      <HStack mt={2} justifyContent={'space-between'} pl={7}>
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

export default ItemCart;
