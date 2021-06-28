import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, View, Switch, Text} from 'react-native';

import TitleWithDescription from '../../components/TitleWithDescription';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import {CreatePlaceForm} from '../../types';
import ToggleWithTitle from '../../components/ToggleWithTitle';
import i18n from 'i18n-js';

type Props = {
  prevStep: () => void;
  nextStep: () => void;
  createPlaceForm: CreatePlaceForm;
  setCreatePlaceForm: Dispatch<SetStateAction<CreatePlaceForm>>;
};

const PlaceAuthorization = (props: Props) => {
  const {prevStep, nextStep, createPlaceForm, setCreatePlaceForm} = props;

  return (
    <View style={styles.container}>
      <TitleWithDescription
        title={i18n.t('place_authorization_title')}
        description={i18n.t('place_authorization_title_description')}
        subtitle={true}
        style={styles.paddingVertical}
      />
      <ToggleWithTitle
        title={i18n.t('place_authorization_animals')}
        icon={
          <FontAwesome5
            name="dog"
            size={30}
            color={
              createPlaceForm.authorizeAnimals ? Colors.primary : Colors.error
            }
          />
        }
        value={createPlaceForm.authorizeAnimals}
        onChange={(value) =>
          setCreatePlaceForm({...createPlaceForm, authorizeAnimals: value})
        }
      />
      <ToggleWithTitle
        title={i18n.t('place_authorization_music')}
        icon={
          <Ionicons
            name="musical-note"
            size={30}
            color={
              createPlaceForm.authorizeMusic ? Colors.primary : Colors.error
            }
          />
        }
        value={createPlaceForm.authorizeMusic}
        onChange={(value) =>
          setCreatePlaceForm({...createPlaceForm, authorizeMusic: value})
        }
      />
      <ToggleWithTitle
        title={i18n.t('place_authorization_smoking')}
        icon={
          <MaterialCommunityIcons
            name="smoking"
            size={30}
            color={
              createPlaceForm.authorizeSmoking ? Colors.primary : Colors.error
            }
          />
        }
        value={createPlaceForm.authorizeSmoking}
        onChange={(value) =>
          setCreatePlaceForm({...createPlaceForm, authorizeSmoking: value})
        }
      />
      <ToggleWithTitle
        title={i18n.t('place_authorization_fire')}
        icon={
          <MaterialCommunityIcons
            name="fire"
            size={30}
            color={
              createPlaceForm.authorizeFire ? Colors.primary : Colors.error
            }
          />
        }
        value={createPlaceForm.authorizeFire}
        onChange={(value) =>
          setCreatePlaceForm({...createPlaceForm, authorizeFire: value})
        }
      />
      <ToggleWithTitle
        title={i18n.t('place_authorization_food_and_drink')}
        icon={
          <MaterialCommunityIcons
            name="food-fork-drink"
            size={30}
            color={
              createPlaceForm.authorizeFoodAndDrink
                ? Colors.primary
                : Colors.error
            }
          />
        }
        value={createPlaceForm.authorizeFoodAndDrink}
        onChange={(value) =>
          setCreatePlaceForm({...createPlaceForm, authorizeFoodAndDrink: value})
        }
      />
      <View style={styles.row}>
        <Button
          value={i18n.t('place_authorization_back')}
          backgroundColor={Colors.white}
          textColor={Colors.dark}
          onPress={prevStep}
          style={{marginRight: 10, flex: 1}}
        />
        <Button
          value={i18n.t('place_authorization_continue')}
          backgroundColor={Colors.dark}
          textColor={Colors.white}
          onPress={nextStep}
          style={{marginLeft: 10, flex: 1}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flex: 1,
  },
  paddingVertical: {
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 20,
  },
  text: {
    fontFamily: 'poppins',
    color: Colors.textGray,
    flex: 1,
    paddingLeft: 10,
  },
});

export default PlaceAuthorization;
