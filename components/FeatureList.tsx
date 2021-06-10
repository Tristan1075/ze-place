import React, {Dispatch, SetStateAction} from 'react';
import {FlatList} from 'react-native';
import {Booking, CreatePlaceForm, FeatureType} from '../types';
import Feature from './Feature';

type Props = {
  features: Array<FeatureType>;
  onChange?: Dispatch<SetStateAction<any>>;
  list?: Booking | CreatePlaceForm;
  onlyOne?: boolean;
};

const FeatureList = ({features, onChange, list, onlyOne}: Props) => {
  const handleFeaturePress = (feature: FeatureType) => {
    if (onChange && list) {
      if (onlyOne) {
        onChange({...list, features: [feature]});
      } else {
        if (list.features.includes(feature)) {
          onChange({
            ...list,
            features: list.features.filter(
              (item: FeatureType) => item !== feature,
            ),
          });
        } else {
          onChange({
            ...list,
            features: [...list.features, feature],
          });
        }
      }
    }
  };

  const renderListItem = ({
    item,
    index,
  }: {
    item: FeatureType;
    index: number;
  }) => {
    return (
      <Feature
        feature={item}
        key={index}
        isActive={list && list.features.includes(item)}
        onPress={() => onChange && list && handleFeaturePress(item)}
      />
    );
  };

  return (
    <FlatList
      horizontal={true}
      data={features}
      renderItem={renderListItem}
      keyExtractor={(item) => item.name}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default FeatureList;
