import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Calendar, DateObject} from 'react-native-calendars';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {Availability, Booking} from '../types';
import {dateToAvailabilities, isRangeAvailable} from '../utils';

type Props = {
  startDate?: string;
  endDate?: string;
  minDate?: string;
  showDates?: boolean;
  onChange?: (startDate: string, endDate: string, duration?: number) => void;
  bookings?: Booking[];
  availabilities?: Availability[];
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

const CalendarPicker = ({
  startDate,
  endDate,
  showDates,
  onChange,
  minDate,
  bookings,
  availabilities,
}: Props) => {
  const [markerDates, setMarkedDates] = useState<any>({});
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');

  useEffect(() => {
    if (startDate || endDate) {
      setMarkedDates({
        ...markerDates,
        [startDate!]: {
          startingDay: true,
          color: Colors.primary,
          textColor: Colors.white,
        },
        [endDate!]: {
          endingDay: true,
          color: Colors.primary,
          textColor: Colors.white,
        },
      });
    }
  }, [bookings, endDate, startDate]);

  useEffect(() => {
    setMarkedDates(getAvailabilities());
  }, [availabilities]);

  const getAvailabilities = () => {
    let dates = {};
    if (availabilities) {
      availabilities.forEach((availability) => {
        dates = {
          ...dates,
          [availability.date]: {disabled: true, dot: true},
        };
      });
      return dates;
    }
  };

  const handleDayPress = (day: DateObject) => {
    if (onChange) {
      if (
        availabilities &&
        availabilities.find(
          (availability) => availability.date === day.dateString,
        )
      ) {
        return;
      }
      if (!start) {
        setMarkedDates({
          ...markerDates,
          [day.dateString]: {
            startingDay: true,
            color: Colors.primary,
            textColor: Colors.white,
          },
        });
        setStart(day.dateString);
        onChange(day.dateString, '', undefined);
      }
      if (start && !end) {
        if (
          availabilities &&
          !isRangeAvailable(
            new Date(start),
            new Date(day.dateString),
            availabilities,
          )
        ) {
          return;
        }
        const dates = dateToAvailabilities(
          start,
          new Date(start),
          end,
          new Date(day.dateString),
        );
        setMarkedDates({
          ...markerDates,
          ...dates,
          [day.dateString]: {
            endingDay: true,
            color: Colors.primary,
            textColor: Colors.white,
          },
        });
        setEnd(day.dateString);
        onChange(
          start,
          day.dateString,
          getPeriodDuration(start, day.dateString),
        );
      }
      if (start && end) {
        setMarkedDates(getAvailabilities());
        setStart('');
        setEnd('');
        onChange('', '', undefined);
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
            <Text style={styles.textDate}>{start}</Text>
          </View>
          <View style={styles.to}>
            <Text style={styles.text}>To :</Text>
            <Text style={styles.textDate}>{end}</Text>
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
