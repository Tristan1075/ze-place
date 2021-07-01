import React from 'react';
import {View, Image, Text, StyleSheet, ImageSourcePropType} from 'react-native';

type Props = {
  title: string;
  image: ImageSourcePropType;
  size: number;
};

const EmptyBloc = ({title, image, size}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={[styles.image, {width: size, height: size}]}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginVertical: 20,
  },
  title: {
    paddingTop: 20,
    fontFamily: 'oswald-light',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default EmptyBloc;
