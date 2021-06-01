import React from 'react';
import {View, FlatList} from 'react-native';
import {FeatureType} from '../types';
import Feature from './Feature';

type Props = {
  features: Array<FeatureType>;
};

const renderListItem = ({item, index}: {item: FeatureType; index: number}) => {
  return <Feature feature={item} key={index} />;
};

const FeatureList = ({features}: Props) => {
  return (
    <FlatList
      horizontal={true}
      data={features}
      renderItem={renderListItem}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default FeatureList;
