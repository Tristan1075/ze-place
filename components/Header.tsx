import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

type Props = {
  type: 'back' | 'menu';
  showProfil?: boolean;
  title?: string;
  profilPicture?: string;
  onBackPress?: () => void;
  color?: string;
  rightText?: string;
  onActionTap?: () => void;
};

const Header = (props: Props) => {
  const {
    type,
    showProfil,
    title,
    profilPicture,
    onBackPress,
    color,
    rightText,
    onActionTap,
  } = props;
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleProfilOption = () => {
    navigation.navigate('ProfilList');
  };
  return (
    <View style={[styles.row, !title && styles.space]}>
      {type === 'back' ? (
        <TouchableOpacity
          style={[styles.headerContainer, styles.color]}
          onPress={onBackPress ? () => onBackPress() : handleBackPress}>
          <Ionicons
            size={30}
            name="arrow-back"
            color={color ? color : Colors.white}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.headerContainer}>
          <Ionicons size={30} name="menu" color={Colors.white} />
        </TouchableOpacity>
      )}
      {title && <Text style={styles.title}>{title}</Text>}
      {showProfil && (
        <TouchableOpacity style={styles.shadow} onPress={handleProfilOption}>
          <Image
            source={{
              uri: profilPicture,
            }}
            style={styles.profil}
          />
        </TouchableOpacity>
      )}
      {rightText && (
        <TouchableOpacity style={styles.shadow} onPress={onActionTap}>
          <Text style={styles.button}>{rightText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: Layout.padding,
    paddingBottom: 20,
  },
  space: {
    justifyContent: 'space-between',
  },
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
  },
  button: {
    fontFamily: 'playfair-bold',
    fontSize: 16,
    color: Colors.white,
    paddingVertical: 20,
    paddingLeft: Layout.padding,
    textAlign: 'right',
  },
  profil: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  shadow: {
    shadowColor: '#2d2d2d',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.84,
    elevation: 5,
  },
  title: {
    paddingLeft: 20,
    justifyContent: 'flex-start',
    fontFamily: 'poppins-semiBold',
    color: Colors.secondary,
    flex: 1,
  },
});

export default Header;
