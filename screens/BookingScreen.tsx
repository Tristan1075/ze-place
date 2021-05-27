import {Ionicons} from '@expo/vector-icons';
import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import Button from '../components/Button';
import CalendarPicker from '../components/CalendarPicker';
import SimpleInput from '../components/SimpleInput';
import TitleWithDescription from '../components/TitleWithDescription';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const BookingScreen = () => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}>
      <View style={styles.bloc}>
        <TitleWithDescription
          title="Payment method"
          description="Default payment method"
          subtitle={true}
        />
        <SimpleInput
          isEditable={false}
          style={styles.input}
          suffix={
            <Ionicons name="chevron-down" size={20} color={Colors.dark} />
          }
        />
        <TitleWithDescription title="Booking date" subtitle={true} />
        <CalendarPicker />
        <TitleWithDescription title="Information" subtitle={true} />
        <SimpleInput
          style={styles.input}
          multiline={true}
          numberOfLines={5}
          placeholder="Precise something"
        />
        <Button
          value="Book"
          backgroundColor={Colors.primary}
          textColor={Colors.white}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: 130,
  },
  scrollView: {
    paddingBottom: 200,
  },
  bloc: {
    paddingHorizontal: 20,
  },
  input: {
    paddingVertical: 20,
  },
});

export default BookingScreen;
