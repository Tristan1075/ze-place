
import React from 'react';
import {StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

type Props =  {
  type: 'back' | 'menu';
}

const Header = (props: Props) => {
  const {type} = props;
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return(
    <View>
      {type === 'back' ? 
        <TouchableOpacity style={[styles.headerContainer, styles.color]} onPress={handleBackPress}>
          <Ionicons size={30} name='arrow-back' color={Colors.primary} />
        </TouchableOpacity> :
        <TouchableOpacity style={styles.headerContainer}>
          <Ionicons size={30} name='menu' color={Colors.primary} />
        </TouchableOpacity>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  headerContainer: {
    width: 80,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  color: {
    backgroundColor: 'rgba(220, 220, 220, 0.4)',
  }
});



export default Header;