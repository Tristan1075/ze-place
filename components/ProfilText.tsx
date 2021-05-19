import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Colors from '../constants/Colors';
type Props = {
  message: String;
  value: String;
};

const ProfilText = (props: Props) => {
  const {message} = props;
  const {value} = props;
  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={styles.title}>
        {message}
      </Text>
      <Text style={styles.subtitle}>
          {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{

    },
    title: {
        fontFamily: 'playfair-bold',
        fontSize: 14,
        color: Colors.primary,
        paddingBottom: 20,
        marginLeft: 20,
        marginTop: 20,
        flex:0.9

      },
      subtitle: {
        fontFamily: 'playfair',
        fontSize: 14,        
        color: Colors.primary,
        paddingBottom: 20,
        alignItems:'flex-end',
        marginTop: 20,

      },
});

export default ProfilText;