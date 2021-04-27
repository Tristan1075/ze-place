import {Ionicons} from '@expo/vector-icons';
import { IconProps } from '@expo/vector-icons/build/createIconSet';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';

type Props = {
  value: string;
  isActive?: boolean;
  icon?: any;
  onPress: () => void;
};

const SelectableItem = ({value, isActive, onPress, icon}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {icon && <Ionicons name={icon} size={24} color={Colors.dark} style={styles.icon} />}
        <Text style={[styles.text, isActive && isActive && styles.active]}>
          {value}
        </Text>
        {isActive && isActive && (
          <Ionicons name="checkmark" size={24} color={Colors.success} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'oswald-light',
    fontSize: 18,
    paddingVertical: 5,
    paddingLeft: 10,
    flex: 1,
  },
  active: {
    fontFamily: 'oswald-bold',
  },
  icon: {
    marginRight: 5,
    alignItems: 'center',
  },
});

export default SelectableItem;
