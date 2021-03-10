import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

type Props = {
  type: 'back' | 'menu';
  showProfil?: boolean;
};

const Header = (props: Props) => {
  const {type, showProfil} = props;
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.row}>
      {type === 'back' ? (
        <TouchableOpacity
          style={[styles.headerContainer, styles.color]}
          onPress={handleBackPress}>
          <Ionicons size={30} name="arrow-back" color={Colors.primary} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.headerContainer}>
          <Ionicons size={30} name="menu" color={Colors.primary} />
        </TouchableOpacity>
      )}
      {showProfil && (
        <TouchableOpacity style={styles.shadow}>
          <Image
            source={{
              uri:
                'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}
            style={styles.profil}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: Layout.padding,
    paddingBottom: 20,
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
});

export default Header;
