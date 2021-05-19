import React, { useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import i18n from 'i18n-js';

import Header from '../components/Header';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {  RootStackParamList} from '../types';
import Button from '../components/Button';

type RootScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfilList'>;

type Props = {
  navigation: RootScreenNavigationProp;
};

const ProfilListScreen = (props: Props) => {
  const {navigation} = props;
  useEffect(() => {

  }, []);

  const handleProfilpress = () => {

    navigation.navigate('Profil');

  };
  return (
    <SafeAreaView style={styles.container}>
        <Header type='back'></Header>
        <View style={styles.container}>
            <Button value={i18n.t('profil')}
                    onPress={handleProfilpress}
                    backgroundColor={Colors.white}
                    textColor={Colors.primary}></Button>
        </View>
        <View style={styles.container}>
            <Button value={i18n.t('paiementMethod')}
                    onPress={()=> console.log("Pay")}
                    backgroundColor={Colors.white}
                    textColor={Colors.primary}></Button>
        </View>
        <View style={styles.container}>
            <Button value={i18n.t('myAnnonces')}
                    onPress={()=> console.log("Annonces")}
                    backgroundColor={Colors.white}
                    textColor={Colors.primary}></Button>

        </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    paddingHorizontal: Layout.padding,
    backgroundColor: Colors.background,
  },
  row: {
    flex: 1,
  },
//   title: {
//     fontFamily: 'playfair-bold',
//     fontSize: 32,
//     color: Colors.primary,
//     paddingBottom: 20,
//   },
//   subtitle: {
//     fontFamily: 'playfair-bold',
//     fontSize: 26,
//     color: Colors.primary,
//     paddingVertical: 20,
//     paddingLeft: Layout.padding,
//   },
//   input: {
//     backgroundColor: Colors.white,
//     padding: 20,
//     borderRadius: 15,
//     shadowColor: '#2d2d2d',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     fontFamily: 'poppins',
//   },
//   iconsRow: {
//     paddingVertical: 30,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   horizontalList: {
//     flexDirection: 'row',
//     paddingHorizontal: Layout.padding,
//   },
//   image: {
//     width: 130,
//     height: 130,
//     marginRight: 10,
//     borderRadius: 10,
//   },
//   shadow: {
//     shadowColor: '#2d2d2d',
//     shadowOffset: {
//       width: 6,
//       height: 0,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 1.84,
//     elevation: 5,
//   },
//   filterText: {
//     fontSize: 16,
//     color: Colors.secondary,
//     marginRight: 20,
//   },
//   tabContainer: {},
//   tabbar: {
//     backgroundColor: 'transparent',
//   },
//   tab: {
//     height: 90,
//     backgroundColor: 'transparent',
//   },
//   label: {
//     textAlign: 'center',
//     fontSize: 12,
//     fontFamily: 'Source Sans Pro',
//     color: Colors.primary,
//     transform: [{rotate: '-90deg'}],
//   },
//   profile:{
//     alignSelf: 'flex-end',
//   }
});

export default ProfilListScreen;