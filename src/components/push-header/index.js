import React from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';

const PushHeader = props => {
  return (
    <>
      <View style={registerHeaderStyle.container}>
        <View style={registerHeaderStyle.logo}>
          <View style={{width: 200, height: 60, paddingVertical: 12}}>
            <Image
              style={{
                width: undefined,
                height: undefined,
                flex: 1,
                resizeMode: 'contain',
              }}
              source={require('../../assets/images/header.png')}
            />
          </View>
        </View>
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
  logo: {paddingLeft: 20},
});

export default PushHeader;
