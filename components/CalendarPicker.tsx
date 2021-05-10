import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Layout from '../constants/Layout';

type Props = {};

const CalendarPicker = (props: Props) => {
  return (
    <Calendar
      style={styles.calendar}
      current={Date()}
      minDate={Date()}
      onDayPress={(day) => {
        console.log('selected day', day);
      }}
      monthFormat={'yyyy MMMM'}
      hideArrows={false}
      hideExtraDays={true}
      firstDay={1}
      disableMonthChange={false}
      onPressArrowLeft={(subtractMonth) => subtractMonth()}
      onPressArrowRight={(addMonth) => addMonth()}
      enableSwipeMonths={true}
    />
  );
};

const styles = StyleSheet.create({
  calendar: {
    borderRadius: 10,
    marginVertical: 20,
    ...Layout.shadow,
  },
});

export default CalendarPicker;
