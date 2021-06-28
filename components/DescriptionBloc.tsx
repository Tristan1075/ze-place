import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import i18n from 'i18n-js';

type Props = {
  onPress: () => void;
};

const DescriptionBloc = (props: Props) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.container} onPress={props.onPress}>
        <Text style={styles.title}>
          {i18n.t('component_description_bloc_rent_space')}
        </Text>
        <Text style={styles.description}>
          {i18n.t('component_description_bloc_rent_description')}
        </Text>
        <Text style={styles.button}>
          {i18n.t('component_description_bloc_see_more')}
        </Text>
        <Image
          source={require('../assets/images/home_cover.jpeg')}
          style={styles.image}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark,
    margin: Layout.padding,
    paddingTop: Layout.padding,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  title: {
    color: Colors.white,
    fontFamily: 'oswald-bold',
    fontSize: 24,
  },
  description: {
    color: Colors.white,
    fontFamily: 'poppins',
    paddingHorizontal: Layout.padding,
    paddingTop: 10,
    paddingBottom: Layout.padding,
    textAlign: 'center',
  },
  image: {
    marginTop: Layout.padding,
    height: 200,
    resizeMode: 'center',
  },
  button: {
    color: Colors.dark,
    fontFamily: 'poppins-semiBold',
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default DescriptionBloc;
