import React from 'react';
import {ActivityIndicator, View, Dimensions, StyleSheet} from 'react-native';

const Loader = () => {
  let screenHeight = Dimensions.get('window').height;
  return (
    <View style={[loaderStyle.activityLoaderWrapper, {height: screenHeight}]}>
      <ActivityIndicator color="#fff" size="large" />
    </View>
  );
};
const loaderStyle = StyleSheet.create({
  activityLoaderWrapper: {
    position: 'absolute',
    backgroundColor: '#0000007a',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});

export default Loader;
