import {Ionicons} from '@expo/vector-icons';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';

type Props = {
  title: string;
  description?: string;
  style?: ViewStyle;
  subtitle?: boolean;
  color?: string;
  actionText?: string;
  actionIcon?: any;
  onActionPress?: () => void;
};

const TitleWithDescription = (props: Props) => {
  const {
    title,
    description,
    style,
    subtitle,
    color,
    actionText,
    actionIcon,
    onActionPress,
  } = props;
  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <Text
          style={[subtitle ? styles.subtitle : styles.title, {color: color}]}>
          {title}
        </Text>
        <TouchableOpacity onPress={onActionPress} style={styles.row}>
          <Text style={styles.actionText}>{actionText}</Text>
          <Ionicons name={actionIcon} size={16} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  title: {
    color: Colors.dark,
    fontFamily: 'oswald-light',
    fontSize: 20,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    color: Colors.dark,
    fontFamily: 'oswald-light',
    fontSize: 20,
    flex: 1,
  },
  description: {
    color: Colors.gray,
    fontFamily: 'poppins',
  },
  actionText: {
    marginRight: 10,
    color: Colors.primary,
    fontFamily: 'poppins',
    fontSize: 12,
  },
});

export default TitleWithDescription;
