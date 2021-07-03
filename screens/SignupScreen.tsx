import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Fold} from 'react-native-animated-spinkit';

import {
  REACT_APP_BUCKET_NAME,
  REACT_APP_REGION,
  REACT_APP_ACCESS_ID,
  REACT_APP_ACCESS_KEY,
  environnment,
} from '../env';

import {StackNavigationProp} from '@react-navigation/stack';
import {CommonActions} from '@react-navigation/routers';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Entypo, Ionicons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import moment from 'moment';
import i18n from 'i18n-js';
import isEmail from 'validator/lib/isEmail';
import {RNS3} from 'react-native-aws3';
import {RootStackParamList, SignupForm, Location, User} from '../types';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import Header from '../components/Header';
import SimpleInput from '../components/SimpleInput';
import {register, uploadID} from '../api/auth';
import TitleWithDescription from '../components/TitleWithDescription';
import {ModalContent, BottomModal} from 'react-native-modals';
import SelectableItem from '../components/SelectableItem';

type RootScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Signup'
>;

type Props = {
  navigation: RootScreenNavigationProp;
};

export type Token = {
  user: User;
  access_token: string;
};

import avatar from '../assets/images/man.png';
import {ModalContext} from '../providers/modalContext';
import SearchPlaceScreen from './SearchPlaceScreen';
import UserStore from '../store/UserStore';
import CameraScreen from './CameraScreen';
import {getUserByEmail} from '../api/customer';
import { compressImage } from '../utils';
const input: SignupForm = {
  gender: '',
  avatar: '',
  firstname: '',
  birthdate: undefined,
  lastname: '',
  phoneNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
  description: '',
  IDRecto: '',
  IDVerso: '',
  location: undefined,
};

const SignupScreen = (props: Props) => {
  const today = new Date();
  const {navigation} = props;
  const [errors, setErrors] = useState<SignupForm>(input);
  const [form, setForm] = useState<SignupForm>(input);
  const [showDateTimePicker, setShowDateTimePicker] = useState<boolean>(false);
  const [genderVisible, setGenderVisible] = useState<boolean>(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayText, setOverlayText] = useState('Preparing the registration');
  const {handleModal} = useContext(ModalContext);

  const verifyForm = async (): Promise<boolean> => {
    let isValid = true;
    const e: any = {};

    if (form.gender.length === 0) {
      e.gender = i18n.t('sign_up_gender_required');
      isValid = false;
    }
    if (form.avatar.length === 0) {
      e.avatar = i18n.t('sign_up_avatar_required');
      isValid = false;
    }
    if (form.firstname.length === 0) {
      e.firstname = i18n.t('sign_up_field_required');
      isValid = false;
    }
    if (form.lastname.length === 0) {
      e.lastname = i18n.t('sign_up_field_required');
      isValid = false;
    }

    if (form.location?.address?.length === 0) {
      e.location = i18n.t('sign_up_field_required');
      isValid = false;
    }

    if (!form.birthdate) {
      e.birthdate = i18n.t('sign_up_field_required');
      isValid = false;
    }
    if (form.phoneNumber.length !== 10) {
      e.phoneNumber = i18n.t('sign_up_invalid_format');
      isValid = false;
    }
    if (!isEmail(form.email)) {
      e.email = i18n.t('sign_up_invalid_format');
      isValid = false;
    }

    if (form.password.length < 8 || form.password.length > 64) {
      e.password = i18n.t('sign_up_password_size');
      isValid = false;
    }
    if (form.confirmPassword !== form.password) {
      e.confirmPassword = i18n.t('sign_up_password_different');
      isValid = false;
    }
    if (!form.location) {
      e.location = i18n.t('sign_up_location_required');
      isValid = false;
    }
    if (
      (form.IDRecto.length === 0 || form.IDVerso.length === 0) &&
      environnment === 'production'
    ) {
      e.IDRecto = i18n.t('sign_up_imageID_required');
      isValid = false;
    }
    setErrors(e);
    return isValid;
  };

  const uploadToS3 = async () => {

    const newurl =  await compressImage(form.avatar);
    const file = {
      uri: newurl.uri,
      name: `${form.email}${form.lastname}.png`,
      type: 'image/png',
    };
    const options = {
      bucket: REACT_APP_BUCKET_NAME,
      region: REACT_APP_REGION,
      accessKey: REACT_APP_ACCESS_ID,
      secretKey: REACT_APP_ACCESS_KEY,
      successActionStatus: 201,
    };
    RNS3.put(file, options).then((response) => {
      if (response.status !== 201) {
        throw new Error('Failed to upload image to S3');
      }
      return response;
    });
  };

  const handleSigninPress = async () => {
    const isFormValid = verifyForm();
    if (await isFormValid) {
      setOverlayVisible(true);
      try {
        await uploadToS3();
      } catch (err) {
        setOverlayVisible(false);
      }
      setOverlayText('Verification of your documents');
      uploadID(form.IDRecto, form.IDVerso)
        .then(async (res) => {
          try {
            setForm({...form, avatar: `${form.email}${form.lastname}.png`});
            const token = await register(form, res);
            await SecureStore.setItemAsync('access-token', token.access_token);
            await UserStore.updateUser(token.user);
            setOverlayVisible(false);
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Tab'}],
              }),
            );
          } catch (err) {
            setOverlayVisible(false);
          }
        })
        .catch((err) => setOverlayVisible(false));
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

  const handleTakPicturePress = async (type: string) => {
    handleModal({
      child: <CameraScreen onPress={(photo) => takePhoto(photo, type)} />,
    });
  };

  const takePhoto = (photo, type: string) => {
    if (photo) {
      if (type === 'recto') {
        setForm({...form, IDRecto: photo.uri});
      } else {
        setForm({...form, IDVerso: photo.uri});
      }
      setErrors({...errors, IDRecto: ''});
      handleModal();
    }
  };

  const handleSearchPress = () => {
    handleModal({
      child: <SearchPlaceScreen onLocationPress={handleLocationPress} />,
    });
  };

  const handleLocationPress = (location: Location) => {
    setForm({...form, location: location});
    handleModal();
  };

  const checkMail = async (email: string) => {
    if (isEmail(email)) {
      const emailExist = await getUserByEmail(email);
      if (emailExist) {
        setErrors({...errors, email: i18n.t('sign_up_user_exist')});
      }
    }
  };

  return (
    <>
      <SafeAreaView style={styles.flex}>
        <ScrollView>
          <Header type="back" />
          <View style={styles.container}>
            <Text style={styles.title}>{i18n.t('sign_up_title')}</Text>
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={handleSelectAvatarPress}>
              {form.avatar ? (
                <Image
                  source={{uri: form.avatar}}
                  style={styles.selectedImage}
                />
              ) : (
                <Image source={avatar} style={styles.avatar} />
              )}
              <View style={styles.cameraIcon}>
                <Entypo size={16} name="camera" color={Colors.primary} />
              </View>
            </TouchableOpacity>
            {errors.avatar ? (
              <Text style={styles.error}>{errors.avatar}</Text>
            ) : null}

            <SimpleInput
              style={styles.input}
              value={form.gender}
              placeholder={i18n.t('sign_up_gender_placeholder')}
              isEditable={false}
              onPress={() => setGenderVisible(true)}
              suffix={
                <Ionicons name="chevron-down" size={20} color={Colors.dark} />
              }
              error={errors.gender}
            />
            <SimpleInput
              onChange={() => setErrors({...errors, firstname: ''})}
              onChangeText={(v) => setForm({...form, firstname: v})}
              placeholder={i18n.t('sign_up_firstname_placeholder')}
              error={errors.firstname}
              style={styles.input}
            />
            <SimpleInput
              onChange={() => setErrors({...errors, lastname: ''})}
              onChangeText={(v) => setForm({...form, lastname: v})}
              placeholder={i18n.t('sign_up_lastname_placeholder')}
              error={errors.lastname}
              style={styles.input}
            />

            <SimpleInput
              style={styles.input}
              value={form.location?.address}
              placeholder={i18n.t('sign_up_address_placeholder')}
              isEditable={false}
              onPress={handleSearchPress}
              suffix={
                <Ionicons name="chevron-down" size={20} color={Colors.dark} />
              }
              error={errors.location}
            />

            <SimpleInput
              onPress={() => setShowDateTimePicker(true)}
              isEditable={false}
              onChange={() => setErrors({...errors, lastname: ''})}
              onChangeText={(v) => setForm({...form, lastname: v})}
              placeholder={i18n.t('sign_up_birthdate_placeholder')}
              suffix={
                <Ionicons name="chevron-down" size={20} color={Colors.dark} />
              }
              value={form.birthdate ? moment(form.birthdate).format('ll') : ''}
              error={errors.birthdate ? i18n.t('sign_up_field_required') : ''}
              style={styles.input}
            />

            <SimpleInput
              onChange={() => setErrors({...errors, phoneNumber: ''})}
              onChangeText={(v) => setForm({...form, phoneNumber: v})}
              placeholder={i18n.t('sign_up_phone_placeholder')}
              error={errors.phoneNumber}
              type={'phone-pad'}
              style={styles.input}
              maxLength={10}
            />
            <SimpleInput
              onChange={() => setErrors({...errors, email: ''})}
              onChangeText={(v) => setForm({...form, email: v.toLowerCase()})}
              onEndEditing={() => checkMail(form.email)}
              placeholder={i18n.t('sign_up_email_placeholder')}
              error={errors.email}
              type={'email-address'}
              style={styles.input}
            />
            <SimpleInput
              onChange={() => setErrors({...errors, password: ''})}
              onChangeText={(v) => setForm({...form, password: v})}
              placeholder={i18n.t('sign_up_password_placeholder')}
              secureTextEntry={true}
              error={errors.password}
              style={styles.input}
            />
            <SimpleInput
              onChange={() => setErrors({...errors, confirmPassword: ''})}
              onChangeText={(v) => setForm({...form, confirmPassword: v})}
              placeholder={i18n.t('sign_up_confirm_password_placeholder')}
              secureTextEntry={true}
              error={errors.confirmPassword}
              style={styles.input}
            />
            <SimpleInput
              onChangeText={(v) => setForm({...form, description: v})}
              placeholder={i18n.t('sign_up_about_me_placeholder')}
              error={errors.description}
              multiline={true}
              numberOfLines={1}
            />
            <TitleWithDescription
              title={i18n.t('sign_up_id_card_placeholder')}
              subtitle={true}
            />
            <View style={styles.row}>
              {form.IDRecto ? (
                <View>
                  <Image source={{uri: form.IDRecto}} style={styles.image} />
                  <TouchableOpacity
                    style={styles.closeIconRecto}
                    onPress={() => setForm({...form, IDRecto: ''})}>
                    <Ionicons size={20} name="close" color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.buttonImage}
                  onPress={() => handleTakPicturePress('recto')}>
                  <Ionicons
                    name="add-circle-outline"
                    size={36}
                    color={Colors.primary}
                  />
                  <Text style={styles.text}>Recto</Text>
                </TouchableOpacity>
              )}
              {form.IDVerso ? (
                <View>
                  <Image source={{uri: form.IDVerso}} style={styles.image} />
                  <TouchableOpacity
                    style={styles.closeIconRecto}
                    onPress={() => setForm({...form, IDVerso: ''})}>
                    <Ionicons size={20} name="close" color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.buttonImage}
                  onPress={() => handleTakPicturePress('verso')}>
                  <Ionicons
                    name="add-circle-outline"
                    size={36}
                    color={Colors.primary}
                  />
                  <Text style={styles.text}>Verso</Text>
                </TouchableOpacity>
              )}
            </View>
            {errors.IDRecto ? (
              <Text style={styles.error}>{errors.IDRecto}</Text>
            ) : null}
            <Button
              value={i18n.t('sign_up_signup_button')}
              onPress={handleSigninPress}
              backgroundColor={Colors.primary}
              textColor={Colors.white}
              style={styles.button}
            />
            <View style={styles.row}>
              <Text style={styles.text}>{i18n.t('sign_up_account_exist')}</Text>
              <Text style={[styles.text, styles.underline]}>
                {i18n.t('sign_up_sign_in')}
              </Text>
            </View>
          </View>
        </ScrollView>
        <KeyboardSpacer topSpacing={-20} />
        <DateTimePickerModal
          isVisible={showDateTimePicker}
          date={form.birthdate ? form.birthdate : new Date()}
          mode="date"
          maximumDate={
            new Date(
              today.getFullYear() - 18,
              today.getMonth(),
              today.getDate(),
            )
          }
          onConfirm={handleConfirmDatePress}
          onCancel={() => setShowDateTimePicker(false)}
          customConfirmButtonIOS={({onPress}) => (
            <TouchableOpacity onPress={onPress}>
              <Text style={styles.customConfirmButton}>
                {i18n.t('sign_up_confirm')}
              </Text>
            </TouchableOpacity>
          )}
          customCancelButtonIOS={({onPress}) => (
            <TouchableOpacity onPress={onPress}>
              <Text style={styles.customCancelButton}>
                {i18n.t('sign_up_cancel')}
              </Text>
            </TouchableOpacity>
          )}
        />
        <BottomModal
          visible={genderVisible}
          onTouchOutside={() => setGenderVisible(false)}
          width={1}
          onSwipeOut={() => setGenderVisible(false)}>
          <ModalContent style={styles.bottomModal}>
            <SelectableItem
              value={i18n.t('sign_up_gender_male')}
              icon={'male'}
              onPress={() => {
                setForm({...form, gender: 'male'});
                setGenderVisible(false);
              }}
            />
            <SelectableItem
              value={i18n.t('sign_up_gender_female')}
              icon={'female'}
              onPress={() => {
                setForm({...form, gender: 'female'});
                setGenderVisible(false);
              }}
            />
          </ModalContent>
        </BottomModal>
      </SafeAreaView>
      {overlayVisible && (
        <View style={styles.overlay}>
          <Text style={styles.titleOverlay}>{overlayText}</Text>
          <Fold size={48} color="#FFF" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.background,
  },
  container: {
    padding: 20,
  },
  title: {
    fontFamily: 'playfair-bold',
    fontSize: 32,
    color: Colors.primary,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
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
    paddingVertical: 20,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
    paddingTop: 10,
    color: Colors.error,
    fontFamily: 'poppins',
  },
  input: {
    marginBottom: 20,
  },
  bottomModal: {
    paddingBottom: 40,
  },
  buttonImage: {
    width: 120,
    height: 120,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 10,
    borderRadius: 10,
  },
  closeIconRecto: {
    position: 'absolute',
    backgroundColor: Colors.white,
    borderRadius: 50,
    left: 100,
    top: -10,
    padding: 5,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  titleOverlay: {
    fontSize: 24,
    color: Colors.white,
    fontFamily: 'oswald',
    marginBottom: 20,
  },
});

export default SignupScreen;
