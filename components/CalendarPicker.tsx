import moment from 'moment';
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Calendar, DateObject} from 'react-native-calendars';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

type Props = {
  minDate?: string;
  showDates?: boolean;
  onChange?: (startDate?: string, endDate?: string, duration?: number) => void;
};

const getPeriodDuration = (startDate: string, endDate: string) => {
  const startMoment = moment([
    startDate.split('-')[0],
    startDate.split('-')[1],
    startDate.split('-')[2],
  ]);
  const endMoment = moment([
    endDate.split('-')[0],
    endDate.split('-')[1],
    endDate.split('-')[2],
  ]);
  return endMoment.diff(startMoment, 'days');
};

const CalendarPicker = ({showDates, onChange, minDate}: Props) => {
  const [markerDates, setMarkedDates] = useState<any>({});
  const handleDayPress = (day: DateObject) => {
    if (onChange) {
      if (Object.keys(markerDates.length === 2)) {
        setMarkedDates({});
        onChange('', '', undefined);
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
        onChange(day.dateString, '', undefined);
      }
      if (Object.keys(markerDates).length === 1) {
        setMarkedDates({
          ...markerDates,
          [day.dateString]: {
            endingDay: true,
            color: Colors.primary,
            textColor: Colors.white,
          },
        });
        onChange(
          Object.keys(markerDates)[0],
          day.dateString,
          getPeriodDuration(Object.keys(markerDates)[0], day.dateString),
        );
      }
    }
  };

  return (
    <View>
      <Calendar
        style={styles.calendar}
        current={Date()}
        minDate={minDate ? minDate : Date()}
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
      {showDates && (
        <View style={styles.row}>
          <View style={styles.from}>
            <Text style={styles.text}>From :</Text>
            <Text style={styles.textDate}>{Object.keys(markerDates)[0]}</Text>
          </View>
          <View style={styles.to}>
            <Text style={styles.text}>To :</Text>
            <Text style={styles.textDate}>{Object.keys(markerDates)[1]}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    borderRadius: 10,
    ...Layout.shadow,
  },
  row: {
    flexDirection: 'row',
    marginTop: 20,
  },
  from: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Layout.shadow,
    flex: 1,
    marginVertical: 5,
    marginRight: 10,
  },
  to: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Layout.shadow,
    flex: 1,
    marginVertical: 5,
    marginLeft: 10,
  },
  text: {
    fontFamily: 'poppins',
  },
  textDate: {
    fontFamily: 'oswald',
  },
});

export default CalendarPicker;
