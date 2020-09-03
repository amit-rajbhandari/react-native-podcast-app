import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';

const RegisterHeader = props => {
  return (
    <>
      <View style={registerHeaderStyle.container}>
        <View style={registerHeaderStyle.logo}>
          <View style={{ width: 200, height: 60, paddingVertical: 12, }}>
            <Image style={{ width: undefined, height: undefined, flex: 1, resizeMode: 'contain' }} source={require('../../assets/images/header.png')} />
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => props.navigation.navigate('Login')}>
          <View style={registerHeaderStyle.back}>
            <Image
              style={{ width: 25, height: 25 }}
              source={require('../../assets/icons/back.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const registerHeaderStyle = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    backgroundColor: '#fff',
    zIndex: 999,
  },
  logo: { paddingLeft: 20 },
  back: {
    paddingTop: 20,
    paddingRight: 20,
  },
});

export default RegisterHeader;
