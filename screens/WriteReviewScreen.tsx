import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Picker,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import Colors from '../constants/Colors';
import {HomeParamList, ReviewForm} from '../types';
import SimpleInput from '../components/SimpleInput';
import TitleWithDescription from '../components/TitleWithDescription';
import {createReview} from '../api/reviews';
import Button from '../components/Button';
import UserStore from '../store/UserStore';
import I18n from 'i18n-js';

type RootScreenNavigationProp = StackNavigationProp<HomeParamList, 'Home'>;

type Props = {
  userId: string;
  placeId: string;
  onPublish: () => void;
};

const input: ReviewForm = {
  name: '',
  description: '',
  writerId: '',
  placeId: '',
  rate: 0,
};

const WriteReviewScreen = (props: Props) => {
  input.placeId = props.placeId;
  input.writerId = props.userId;
  const [reviewsForm, setReviewsForm] = useState<ReviewForm>(input);

  const handleReviewPress = () => {
    createReview(reviewsForm, UserStore.user.first_name);
    props.onPublish();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.paddingHorizontal}>
          <TitleWithDescription title={I18n.t('write_review_title')} />
          <SimpleInput
            placeholder={I18n.t('write_review_content_placeholder')}
            type="default"
            onChangeText={(value) =>
              setReviewsForm({...reviewsForm, name: value})
            }
          />
          <TitleWithDescription
            title={I18n.t('write_review_description_title')}
          />
          <SimpleInput
            onChangeText={(v) =>
              setReviewsForm({...reviewsForm, description: v})
            }
            placeholder={I18n.t('write_review_description_placeholder')}
            multiline={true}
            numberOfLines={1}
          />
          <TitleWithDescription title={I18n.t('write_review_rate')} />
          <Picker
            selectedValue={reviewsForm.rate}
            onValueChange={(itemValue, itemIndex) =>
              setReviewsForm({...reviewsForm, rate: itemValue})
            }>
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
          </Picker>

          <Button
            value={I18n.t('write_review_publish')}
            onPress={handleReviewPress}
            backgroundColor={Colors.primary}
            textColor={Colors.white}
            style={styles.button}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 250,
  },
  marginTop: {
    marginTop: 30,
  },
  contentScrollView: {
    paddingBottom: 80,
  },
  padding: {
    paddingBottom: 10,
  },
  review: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  button: {
    marginVertical: 20,
  },
  paddingHorizontal: {
    paddingHorizontal: 20,
    marginTop: -140,
  },
  title: {
    fontFamily: 'poppins-light',
    fontSize: 14,
    color: Colors.dark,
    flex: 1,
  },
  mainTitle: {
    fontFamily: 'poppins-light',
    fontSize: 24,
    textAlign: 'center',
    color: Colors.dark,
  },
});

export default WriteReviewScreen;
