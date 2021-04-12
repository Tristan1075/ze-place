import * as React from 'react';
import renderer from 'react-test-renderer';
import {Text, StyleSheet, View} from 'react-native';

it(`renders correctly`, () => {
  const tree = renderer.create(<Text>Snapshot test!</Text>).toJSON();

  expect(tree).toMatchSnapshot();
});
