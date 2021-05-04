import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {StackNavigationProp} from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18n-js';

import Header from '../components/Header';
import SquaredButton from '../components/SquaredButton';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import CardWithRate from '../components/CardWithRate';
import {HomeParamList, User} from '../types';
import {categories} from '../mocks';
import {getUser} from '../api/customer';
import Button from '../components/Button';
import ProfilText from '../components/ProfilText';

type RootScreenNavigationProp = StackNavigationProp<HomeParamList, 'Profil'>;

type Props = {
  navigation: RootScreenNavigationProp;
};

const ProfilScreen = (props: Props) => {
  const {navigation} = props;
  const [user,setUser] = useState<User>();

  
  useEffect(() => {
    const user = async () => setUser(await getUser());
    user();
  }, []);

  
  const handleModify = () => {
    console.log("modify");
    
  };
 

  return (
    <SafeAreaView >

      <ScrollView showsVerticalScrollIndicator={false}>
      
      <Header type='back' showProfil={false}  button="Modifier"></Header>
        {user && <View style={styles.container}>
            <Image
                source={{uri: user.avatar}}
                style={{width: 150, height: 150, borderRadius: 150/ 2}}
            />
            
        </View>}
        <Text style={styles.title}>Information personelle</Text>
        {user && <ProfilText message={"Nom: "} value={user.last_name}></ProfilText> }
        {user &&<ProfilText message={"Prenom: "} value={user.first_name}></ProfilText>}
        {user &&<ProfilText message={"Date de naissances: "} value={user.birthdate.slice(0,10)}></ProfilText>}
        {user &&<ProfilText message={"Description: "} value={user.description}></ProfilText>}
        {user &&<Text style={styles.title}>Information de connexion</Text>}
        {user &&<ProfilText message={"Email: "} value={user.email}></ProfilText>}
        {user &&<ProfilText message={"Mot de passe: "} value={"********"}></ProfilText>}



      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Layout.padding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flex: 1,
  },
  title: {
    fontFamily: 'playfair-bold',
    fontSize: 18,
    color: Colors.primary,
    paddingBottom: 20,
    marginLeft: 10,
    marginTop: 20
  },
  subtitle: {
    fontFamily: 'playfair-bold',
    fontSize: 12,
    color: Colors.primary,
    paddingVertical: 20,
    paddingLeft: Layout.padding,
    textAlign:"right",
  },
  image: {
    width: 150, 
    height: 150, 
    borderRadius: 150/ 2,
    alignItems: 'center',
    justifyContent: 'center',

  },
  input: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#2d2d2d',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontFamily: 'poppins',
  },
  iconsRow: {
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horizontalList: {
    flexDirection: 'row',
    paddingHorizontal: Layout.padding,
  },
  image: {
    width: 130,
    height: 130,
    marginRight: 10,
    borderRadius: 10,
  },
  shadow: {
    shadowColor: '#2d2d2d',
    shadowOffset: {
      width: 6,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 5,
  },
  filterText: {
    fontSize: 16,
    color: Colors.secondary,
    marginRight: 20,
  },
  tabContainer: {},
  tabbar: {
    backgroundColor: 'transparent',
  },
  tab: {
    height: 90,
    backgroundColor: 'transparent',
  },
  label: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Source Sans Pro',
    color: Colors.primary,
    transform: [{rotate: '-90deg'}],
  },
  profil: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
});

export default ProfilScreen;
