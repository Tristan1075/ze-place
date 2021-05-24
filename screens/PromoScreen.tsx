import React, { useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import i18n from 'i18n-js';
import TitleWithDescription from '../components/TitleWithDescription';
import Header from '../components/Header';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {  RootStackParamList} from '../types';
import Button from '../components/Button';
import CodeText from '../components/CodeText';
import { ScrollView } from 'react-native-gesture-handler';


type RootScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Promo'>;

type Props = {
  navigation: RootScreenNavigationProp;
};

const PromoScreen = (props: Props) => {
  const {navigation} = props;
  useEffect(() => {

  }, []);

  
  return (
    <SafeAreaView style={styles.container}>
    <Header type='back'></Header>
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        
        
        <Button value={i18n.t('addCode')}
                    onPress={()=> console.log("test")
                    }
                    backgroundColor={Colors.primary}
                    textColor={Colors.white}
                    >
                    
                    </Button>
        <View>
        <Text style={styles.title}>{i18n.t('actif')}</Text>

        <TouchableOpacity style={styles.codeCard}>

        <TitleWithDescription
        title="CODE300"
        subtitle={true}
        description="06/12/1998"></TitleWithDescription>
        
      </TouchableOpacity>
      <TouchableOpacity style={styles.codeCard}>

      <TitleWithDescription
        title="CODE300"
        subtitle={true}
        description="06/12/1998"></TitleWithDescription>
        <Text style={{alignContent:"flex-end"}}>yyyyy</Text>
        
      </TouchableOpacity>

      <TouchableOpacity style={styles.codeCard}>

      <TitleWithDescription
        title="CODE300"
        subtitle={true}
        description="06/12/1998"></TitleWithDescription>
        
      </TouchableOpacity>


        </View>
        <View>
        <Text style={styles.title}>{i18n.t('innactif')}</Text>


        <TouchableOpacity style={styles.codeCard}>

        <TitleWithDescription
          title="CODE300"
          subtitle={true}
          description="06/12/1998"></TitleWithDescription>
          
        </TouchableOpacity>
        </View>
        </ScrollView>
  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    paddingTop: 130,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 40,
    paddingLeft:20,
    paddingRight:20,
  },
 
  row: {
    flex: 1,
  },
  title: {
    fontFamily: 'poppins-bold',
    fontSize: 18,
    color: Colors.primary,
    paddingBottom: 20,
    marginLeft: 10,
    marginTop: 60
  },
  codeCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    alignItems: 'flex-start',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom:20,
    flex:0.9,
  },

});

export default PromoScreen;