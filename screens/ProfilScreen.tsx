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
import isEmail from 'validator/lib/isEmail';
import {Entypo} from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Carousel from 'react-native-snap-carousel';
import {StackNavigationProp} from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18n-js';
import SimpleInput from '../components/SimpleInput';
import moment from 'moment';

import Header from '../components/Header';

import SquaredButton from '../components/SquaredButton';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import CardWithRate from '../components/CardWithRate';
import {HomeParamList, User,SignupForm} from '../types';
import {categories} from '../mocks';
import {getUser,modifyUser} from '../api/customer';
import * as ImagePicker from 'expo-image-picker';

import Button from '../components/Button';
import ProfilText from '../components/ProfilText';
import { State } from 'react-native-gesture-handler';

type RootScreenNavigationProp = StackNavigationProp<HomeParamList, 'Profil'>;

type Props = {
  navigation: RootScreenNavigationProp;
};
const input: SignupForm = {
  avatar: '',
  firstname: '',
  birthdate: undefined,
  lastname: '',
  phoneNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
  description: '',
};

const ProfilScreen = (props: Props) => {
  const {navigation} = props;
  const [user,setUser] = useState<User>();
  const [allowModification, setAllowModification] = useState<boolean>(true);
  const [form, setForm] = useState<SignupForm>(input);

  const [errors, setErrors] = useState<SignupForm>(input);
  const [showDateTimePicker, setShowDateTimePicker] = useState<boolean>(false);

  useEffect(() => {
    const getUservar = async () => setUser(await getUser());
    getUservar();  

  }, []);

  const verifyForm = (): boolean => {
    let isValid = true;
    let e: any = {};

    if (form.avatar.length === 0) {
      e.avatar = 'The avatar is required';
      isValid = false;
    }
    if (form.firstname.length === 0) {
      e.firstname = 'The field is required';
      isValid = false;
    }
    if (form.lastname.length === 0) {
      e.lastname = 'The field is required';
      isValid = false;
    }
    if (!form.birthdate) {
      e.birthdate = 'The field is required';
      isValid = false;
    }
    if (form.phoneNumber.length !== 10) {
      e.phoneNumber = 'The format is not valid';
      isValid = false;
    }
    if (!isEmail(form.email)) {
      e.email = 'The format is not valid';
      isValid = false;
    }
    if (form.password.length < 8) {
      e.password = 'The password must contain at leat 8 characters';
      isValid = false;
    }
    if (form.confirmPassword !== form.password) {
      e.confirmPassword = 'The password is not the same';
      isValid = false;
    }
    setErrors(e);

    
    return isValid;
  };
  
  const handleSigninPress = async () => {
    const isFormValid = verifyForm();
    
    if (isFormValid) {
      try {
        const changeUser = async () => await modifyUser(form,user._id);
        changeUser();

        setAllowModification(true);

      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSelectAvatarPress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {

      setForm({...form, avatar: result.uri});
      setErrors({...errors, avatar: ''});
    }
  };

  const handleConfirmDatePress = (value: Date) => {

    
    setErrors({...errors, birthdate: undefined});
    setForm({...form, birthdate: value});
    
    setShowDateTimePicker(false);
  };
const setValues = ()=>{
  setErrors({...errors,form})
  form.avatar = user.avatar;
  form.firstname = user.first_name;
  form.lastname = user.last_name;
  form.email = user.email;
  form.description = user.description;
  form.birthdate = new Date(user.birthdate) ;    
    
}
  
  const handleModify = () => {
    
    if( allowModification){
     

      setAllowModification(false);
      setValues()  ;
    }else{
      handleSigninPress();
      }
  };
  return (
    <SafeAreaView style={styles.container}>
     
     { allowModification ? <Header type='back' showProfil={false}  rightText={i18n.t('modify')} onActionTap={handleModify}></Header> :
    <Header type='back' showProfil={false} rightText={i18n.t('validate')} onActionTap={handleModify}></Header>
    }
     
      {allowModification ? 

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} contentContainerStyle={scrollStyles.center}> 


        {user && <View style={styles.avatarContainer}>


            <Image
                source={{uri: user.avatar}}
                style={{width: 150, height: 150, borderRadius: 150/ 2}}
            />


        </View>}
        <Text style={styles.title}>{i18n.t('personalInfo')}</Text>
        {user && <ProfilText message={i18n.t('lastname')} value={user.last_name}></ProfilText> }
        {user &&<ProfilText message={i18n.t('firstname')} value={user.first_name}></ProfilText>}
        {user &&<ProfilText message={i18n.t('birthdate')} value={user.birthdate.slice(0,10)}></ProfilText>}
        {user &&<ProfilText message={i18n.t('desc')} value={user.description}></ProfilText>}
        {user &&<Text style={styles.title}>{i18n.t('connexionInfo')}</Text>}
        {user &&<ProfilText message={i18n.t('mail')} value={user.email}></ProfilText>}
        {user &&<ProfilText message={i18n.t('password')} value={"********"}></ProfilText>}



      </ScrollView> : <ScrollView style={styles.scrollView}> 
      
        <View >
          <Text style={styles.title}>Veuillez changer les informations de votre comptes</Text>
          <View style={styles.avatarContainer}>
          <TouchableOpacity
            

            onPress={handleSelectAvatarPress}>
            {form.avatar ? (
              <Image source={{uri: form.avatar}} style={styles.selectedImage} />
            ) : (user &&
              <Image source={{uri: user.avatar}} style={styles.selectedImage} />
            )}
            <View style={styles.cameraIcon}>
              <Entypo size={16} name="camera" color={Colors.primary} />
            </View>
          </TouchableOpacity>
          </View>
          {errors.avatar ? (
            <Text style={styles.error}>{errors.avatar}</Text>
          ) : null}
          <SimpleInput
      style={styles.button}
            onChange={() => setErrors({...errors, firstname: ''})}
            onChangeText={(v) => setForm({...form, firstname: v})}
            placeholder={user && user.first_name}
            error={errors.firstname}
          />
          <SimpleInput
          style={styles.button}
            onChange={() => setErrors({...errors, lastname: ''})}
            onChangeText={(v) => setForm({...form, lastname: v})}
            placeholder={user && user.last_name}
            error={errors.lastname}
          />
          <SimpleInput
          style={styles.button}
            onPress={() => setShowDateTimePicker(true)}
            isEditable={false}
            onChange={() => setErrors({...errors, lastname: ''})}
            onChangeText={(v) => setForm({...form, lastname: v})}
            placeholder="Birthdate"
            value={form.birthdate ? moment(form.birthdate).format('ll') : user.birthdate.slice(0,10)}
            error={errors.birthdate ? 'The fiels is required' : ''}
          />
          <SimpleInput
          style={styles.button}
            onChange={() => setErrors({...errors, phoneNumber: ''})}
            onChangeText={(v) => setForm({...form, phoneNumber: v})}
            placeholder={user && user.phoneNumber}
            error={errors.phoneNumber}

          />
          <SimpleInput
          style={styles.button}
            onChange={() => setErrors({...errors, email: ''})}
            onChangeText={(v) => setForm({...form, email: v.toLowerCase()})}
            placeholder={user && user.email}
            error={errors.email}
          />
          <SimpleInput
          style={styles.button}
            onChange={() => setErrors({...errors, password: ''})}
            onChangeText={(v) => setForm({...form, password: v})}
            placeholder="Password"
            secureTextEntry={true}
            error={errors.password}
          />
          <SimpleInput
          style={styles.button}
            onChange={() => setErrors({...errors, confirmPassword: ''})}
            onChangeText={(v) => setForm({...form, confirmPassword: v})}
            placeholder="Confirmation password"
            secureTextEntry={true}
            error={errors.confirmPassword}
          />
          <SimpleInput
          style={styles.button}
            onChangeText={(v) => setForm({...form, description: v})}
            placeholder={user && user.description}
            error={errors.description}
            multiline={true}
            numberOfLines={1}
          />

          
        </View>
      </ScrollView>
    }{user && <DateTimePickerModal
      isVisible={showDateTimePicker}
      
      date={form.birthdate ? form.birthdate : user.birthdate}
      mode="date"
      onConfirm={handleConfirmDatePress}
      onCancel={() => setShowDateTimePicker(false)}
      customConfirmButtonIOS={({onPress}) => (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.customConfirmButton}>Confirmer</Text>
        </TouchableOpacity>
      )}
      customCancelButtonIOS={({onPress}) => (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.customCancelButton}>Annuler</Text>
        </TouchableOpacity>
      )}
    />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.background,
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 14,
    color: Colors.primary,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  button: {
    marginVertical: 20,
  },
  avatarContainer: {
    position: 'relative',
    maxWidth: 70,
    height: 70,
    marginVertical: 10,
    paddingVertical: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
  },
  selectedImage: {
    width: 70,
    height: 70,
    borderRadius: 20,
  },
  cameraIcon: {
    position: 'absolute',
    right: -10,
    bottom: 0,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: Colors.white,
    shadowColor: '#2d2d2d',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    fontFamily: 'poppins',
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
  },
  customConfirmButton: {
    padding: 20,
    fontFamily: 'poppins-bold',
    textAlign: 'center',
    color: Colors.white,
    backgroundColor: Colors.primary,
  },
  customCancelButton: {
    padding: 20,
    marginBottom: 30,
    fontFamily: 'poppins-bold',
    textAlign: 'center',
    color: Colors.primary,
    backgroundColor: Colors.white,
    borderRadius: 15,
    overflow: 'hidden',
  },
  error: {
    paddingBottom: 10,
    color: Colors.error,
    fontFamily: 'poppins',
  },
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
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  row: {
    flex: 1,
  },
  title: {
    fontFamily: 'poppins-bold',
    fontSize: 18,
    color: Colors.dark,
    paddingBottom: 20,
    marginLeft: 10,
    marginTop: 40
  },
  subtitle: {
    fontFamily: 'poppins-bold',
    fontSize: 12,
    color: Colors.dark,
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
    fontFamily: 'poppins',
    alignSelf: 'flex-end',
  },
});

const scrollStyles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});

export default ProfilScreen;
