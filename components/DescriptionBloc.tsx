import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Button from './Button';

type Props = {
  onPress: () => void;
};

const DescriptionBloc = (props: Props) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.container} onPress={props.onPress}>
        <Text style={styles.title}>Rent your space</Text>
        <Text style={styles.description}>
          Vous pouvez louer votre m2, venez découvrir cette fonctionalitée
        </Text>
        <Text style={styles.button}>En savoir plus</Text>
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
