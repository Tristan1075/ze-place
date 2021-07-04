import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import UserStore from '../store/UserStore';

type Props = {
  type: 'back' | 'menu';
  showProfil?: boolean;
  title?: string;
  button?: string;
  onBackPress?: Function;
  color?: string;
  rightText?: string;
  onActionTap?: () => void;
};

const Header = (props: Props) => {
  const {
    type,
    showProfil,
    title,
    onBackPress,
    color,
    rightText,
    onActionTap,
  } = props;

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleMenuPress = () => {
    navigation.navigate('Menu');
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
        <TouchableOpacity style={styles.headerContainer} />
      )}
      {title && <Text style={styles.title}>{title}</Text>}
      {type === 'menu' && (
        <TouchableOpacity style={styles.shadow} onPress={handleMenuPress}>
          <Image
            source={{
              uri: UserStore.user && UserStore.user.avatar,
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
    paddingTop:20,
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
    ...Layout.shadow,
    backgroundColor: Colors.white,
    padding: 2,
    borderRadius: 10,
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
