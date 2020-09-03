import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const AuthHeader = () => {
  return (
    <>
      <View style={authHeaderStyle.container}>
        <View style={{ width: 200, height: 60, paddingVertical: 12, }}>
          <Image style={{ width: undefined, height: undefined, flex: 1, resizeMode: 'contain' }} source={require('../../assets/images/header.png')} />
        </View>
      </View>
    </>
  );
};

const authHeaderStyle = StyleSheet.create({
  container: {
    height: 60,
    position: 'relative',
    backgroundColor: '#fff',
    paddingLeft: 20,
    zIndex: 9999
  },
});

export default AuthHeader;
