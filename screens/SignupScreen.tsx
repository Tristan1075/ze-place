import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  REACT_APP_BUCKET_NAME,
  REACT_APP_REGION,
  REACT_APP_ACCESS_ID,
  REACT_APP_ACCESS_KEY,
} from '../env';
import {StackNavigationProp} from '@react-navigation/stack';
import {CommonActions} from '@react-navigation/routers';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Entypo} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import moment from 'moment';
import isEmail from 'validator/lib/isEmail';
import {RNS3} from 'react-native-aws3';
import {RootStackParamList, SignupForm} from '../types';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import Header from '../components/Header';
import SimpleInput from '../components/SimpleInput';
import {register} from '../api/auth';

type RootScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Signup'
>;

type Props = {
  navigation: RootScreenNavigationProp;
};

const avatar = require('../assets/images/man.png');
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

const SignupScreen = (props: Props) => {
  const {navigation} = props;
  const [errors, setErrors] = useState<SignupForm>(input);
  const [form, setForm] = useState<SignupForm>(input);
  const [showDateTimePicker, setShowDateTimePicker] = useState<boolean>(false);

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

  const uploadToS3 = async () => {
    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: form.avatar,
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
    console.log(options);

    RNS3.put(file, options).then((response) => {
      if (response.status !== 201)
        throw new Error('Failed to upload image to S3');
      console.log(response.body.postResponse.location);
      form.avatar = response.body.postResponse.location;
    });
  };

  const handleSigninPress = async () => {
    const isFormValid = verifyForm();
    if (isFormValid) {
      try {
        uploadToS3();
        const token = await register(form);
        console.log(token);

        await SecureStore.setItemAsync('userId', token.userId);
        await SecureStore.setItemAsync('access-token', token.access_token);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Tab'}],
          }),
        );
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
    console.log(result);

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

  return (
    <SafeAreaView style={styles.flex}>
      <ScrollView>
        <Header type="back" />
        <View style={styles.container}>
          <Text style={styles.title}>Hello ! Signup to get started !</Text>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={handleSelectAvatarPress}>
            {form.avatar ? (
              <Image source={{uri: form.avatar}} style={styles.selectedImage} />
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
            onChange={() => setErrors({...errors, firstname: ''})}
            onChangeText={(v) => setForm({...form, firstname: v})}
            placeholder="First name"
            error={errors.firstname}
            style={styles.input}
          />
          <SimpleInput
            onChange={() => setErrors({...errors, lastname: ''})}
            onChangeText={(v) => setForm({...form, lastname: v})}
            placeholder="Last name"
            error={errors.lastname}
            style={styles.input}
          />
          <SimpleInput
            onPress={() => setShowDateTimePicker(true)}
            isEditable={false}
            onChange={() => setErrors({...errors, lastname: ''})}
            onChangeText={(v) => setForm({...form, lastname: v})}
            placeholder="Birthdate"
            value={form.birthdate ? moment(form.birthdate).format('ll') : ''}
            error={errors.birthdate ? 'The field is required' : ''}
            style={styles.input}
          />
          <SimpleInput
            onChange={() => setErrors({...errors, phoneNumber: ''})}
            onChangeText={(v) => setForm({...form, phoneNumber: v})}
            placeholder="Phone number"
            error={errors.phoneNumber}
            style={styles.input}
          />
          <SimpleInput
            onChange={() => setErrors({...errors, email: ''})}
            onChangeText={(v) => setForm({...form, email: v.toLowerCase()})}
            placeholder="Email"
            error={errors.email}
            style={styles.input}
          />
          <SimpleInput
            onChange={() => setErrors({...errors, password: ''})}
            onChangeText={(v) => setForm({...form, password: v})}
            placeholder="Password"
            secureTextEntry={true}
            error={errors.password}
            style={styles.input}
          />
          <SimpleInput
            onChange={() => setErrors({...errors, confirmPassword: ''})}
            onChangeText={(v) => setForm({...form, confirmPassword: v})}
            placeholder="Confirmation password"
            secureTextEntry={true}
            error={errors.confirmPassword}
            style={styles.input}
          />
          <SimpleInput
            onChangeText={(v) => setForm({...form, description: v})}
            placeholder="About me"
            error={errors.description}
            multiline={true}
            numberOfLines={1}
            style={styles.input}
          />
          <Button
            value="Sign up"
            onPress={handleSigninPress}
            backgroundColor={Colors.primary}
            textColor={Colors.white}
            style={styles.button}
          />
          <View style={styles.row}>
            <Text style={styles.text}>Already have an account ?</Text>
            <Text style={[styles.text, styles.underline]}>Sign in</Text>
          </View>
        </View>
      </ScrollView>
      <KeyboardSpacer topSpacing={-20} />
      <DateTimePickerModal
        isVisible={showDateTimePicker}
        date={form.birthdate ? form.birthdate : new Date()}
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
      />
    </SafeAreaView>
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
    justifyContent: 'space-between',
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
    backgroundColor: Colors.primary,
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
  input: {
    marginBottom: 10,
  },
});

export default SignupScreen;
