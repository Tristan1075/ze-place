import moment, {Moment} from 'moment';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Calendar, DateObject} from 'react-native-calendars';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

type Props = {};

const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

const CalendarPicker = (props: Props) => {
  const [markerDates, setMarkedDates] = useState<any>({});
  const [startDate, setStartDate] = useState<DateObject>();
  const [endDate, setEndDate] = useState<Moment>();

  const handleDayPress = (day: DateObject) => {
    if (Object.keys(markerDates.length > 2)) {
      setMarkedDates({});
    }
    if (Object.keys(markerDates).length === 0) {
      setMarkedDates({
        ...markerDates,
        [day.dateString]: {
          startingDay: true,
          color: Colors.primary,
          textColor: Colors.white,
        },
      });
      setStartDate(day);
    }
    if (Object.keys(markerDates).length === 1 && startDate) {
      setMarkedDates({
        ...markerDates,
        [day.dateString]: {
          endingDay: true,
          color: Colors.primary,
          textColor: Colors.white,
        },
      });
    }
  };

  return (
    <Calendar
      style={styles.calendar}
      current={Date()}
      minDate={Date()}
      onDayPress={handleDayPress}
      monthFormat={'yyyy MMMM'}
      hideArrows={false}
      hideExtraDays={true}
      firstDay={1}
      disableMonthChange={false}
      onPressArrowLeft={(subtractMonth) => subtractMonth()}
      onPressArrowRight={(addMonth) => addMonth()}
      enableSwipeMonths={true}
      markedDates={markerDates}
      markingType="period"
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
