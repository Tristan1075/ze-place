import React from 'react';
import {View, Text} from 'react-native';
import {LocaleConfig, CalendarList, Arrow, Calendar} from 'react-native-calendars';
import Layout from '../constants/Layout';


type Props = {};

const CalendarPicker = (props: Props) => {
  return (
    <Calendar
      pagingEnabled={true}
      calendarWidth={Layout.window.width - Layout.padding}
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
      disableAllTouchEventsForDisabledDays={true}
      enableSwipeMonths={true}
    />
  );
};

export default CalendarPicker;
