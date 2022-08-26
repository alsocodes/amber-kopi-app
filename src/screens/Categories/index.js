import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {BoxItemTopProduct, Header} from '../../components';
import {colors} from '../../res';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAllProductsByCat} from '../../store/actions/productActions';
import {getImageUri} from '../../services/api';

const Categories = ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const dispatch = useDispatch();
  const dataParams = route.params;
  const {productsByCat} = useSelector(state => state.product.product);
  useEffect(() => {
    if (dataParams) {
      dispatch(fetchAllProductsByCat({catProductId: dataParams.id}));
    }
  }, [dataParams]);

  return (
    <SafeAreaView style={styles.flex1}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.flex1}>
        {/* header */}
        <Header
          back
          cart
          onPress={() => navigation.goBack()}
          title={`Kategori ${route.params?.name}`}
        />
        {/* Content */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.sectionBoxTopProduct}>
            {productsByCat?.rows?.map((item, index) => {
              return (
                <BoxItemTopProduct
                  key={index}
                  bgColor={item.bgColor}
                  icon={getImageUri(item.product?.image)}
                  text={item.title}
                  price={item.price}
                  index={index}
                  onPress={() => navigation.navigate('Detail', item)}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    backgroundColor: colors.white,
  },

  sectionBoxTopProduct: {
    flex1: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});
