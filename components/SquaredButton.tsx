import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


import Colors from '../constants/Colors';

type Props = {
  onPress: () => void;
  icon: any;
  isActive: boolean;
}

const SquaredButton = (props: Props) => {
  const {onPress, icon, isActive} =  props;
  return(
    <View style={styles.shadow}>
      <TouchableOpacity style={[styles.categoryButton, isActive && styles.categoryButtonActive]} onPress={onPress}>
          <Ionicons size={24} name={icon} color={isActive ? Colors.white : Colors.primary} style={styles.icon} />
      </TouchableOpacity>    
    </View> 
  );
};


const styles = StyleSheet.create({
  categoryButton: {
    width: 61,
    height: 61,
    backgroundColor: 'rgba(200, 200, 200, 0.6)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryButtonActive: {
    backgroundColor: Colors.primary,
  },
  icon: {
    shadowColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  shadow: {
    shadowColor: "#2d2d2d",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.84,
    elevation: 5,
  },
});

export default SquaredButton;