import React, { useEffect, useState } from 'react';
import { View, StatusBar, Platform } from 'react-native';
import Orientation from 'react-native-orientation';

const Bar = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (Orientation.getInitialOrientation() === 'PORTRAIT') {
      setHeight('4.2%');
    } else {
      setHeight(0);
    }
    Orientation.addOrientationListener(_orientationDidChange);
  }, []);

  const _orientationDidChange = orientation => {
    if (orientation === 'PORTRAIT') {
      setHeight('4.2%');
    } else {
      setHeight(0);
    }
  };

  return (
    <View
      style={{
        backgroundColor: 'rgba(18, 63, 104, 1)',
        height: Platform.OS === 'ios' ? height : 0,
      }}>
      <StatusBar
        barStyle="default"
        backgroundColor="rgba(18, 63, 104, 1)"
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
    </View>
  );
};

export default Bar;
