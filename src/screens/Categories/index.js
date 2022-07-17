import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {BoxItemTopProduct, Gap, Header} from '../../components';
import {
  colors,
  fonts,
  IL_Brinjal,
  IL_Brokoli,
  IL_Cauliflawer_PNG,
  IL_Pumpkin,
  IL_RedOnion,
  IL_Tomato_PNG,
} from '../../res';
import {products} from '../../products';

const Categories = ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={styles.flex1}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.flex1}>
        {/* header */}
        <Header back cart onPress={() => navigation.goBack()} />
        <View style={styles.wrapperTittle}>
          <Text style={styles.tittle}>{route.params}</Text>
        </View>
        <Gap height={10} />
        {/* Content */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.sectionBoxTopProduct}>
            {products.map((item, index) => {
              return (
                <BoxItemTopProduct
                  key={index}
                  bgColor={item.bgColor}
                  icon={item.image}
                  text={item.title}
                  price={item.price}
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
  },
  wrapperTittle: {
    paddingHorizontal: 20,
  },
  tittle: {
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    color: colors.primary,
  },
  sectionBoxTopProduct: {
    flex1: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
