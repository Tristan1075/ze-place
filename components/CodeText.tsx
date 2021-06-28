import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import TitleWithDescription from '../components/TitleWithDescription';

type Props = {
  name: string;
  date: string;
};

const ProfilText = (props: Props) => {
  const {name} = props;
  const {date} = props;
  return (
    <TouchableOpacity style={styles.container}>
      <TitleWithDescription
        title={name}
        subtitle={true}
        description={date}></TitleWithDescription>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    alignItems: 'flex-start',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
});

export default ProfilText;
