import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

const Footer = props => {
  return (
    <View style={footerStyle.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          props.navigation.navigate('Root', {
            screen: 'Home',
          })
        }>
        <View style={footerStyle.tab}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../../assets/icons/home.png')}
          />
          <Text style={footerStyle.label}>Home</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          props.navigation.navigate('Root', {
            screen: 'Podcasts',
          })
        }>
        <View style={footerStyle.tab}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../../assets/icons/podcast.png')}
          />
          <Text style={footerStyle.label}>Podcasts</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          props.navigation.navigate('Root', {
            screen: 'Notifications',
          })
        }>
        <View style={footerStyle.tab}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../../assets/icons/notification.png')}
          />
          <Text style={footerStyle.label}>Notiser</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          props.navigation.navigate('Root', {
            screen: 'Andelsspel',
          })
        }>
        <View style={footerStyle.tab}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../../assets/icons/dollar.png')}
          />
          <Text style={footerStyle.label}>Andelsspel</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          props.navigation.navigate('Root', {
            screen: 'Settings',
          })
        }>
        <View style={footerStyle.tab}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../../assets/icons/setting.png')}
          />
          <Text style={footerStyle.label}>Inställningar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const footerStyle = StyleSheet.create({
  container: {
    paddingVertical: 5,
    backgroundColor: '#123F68',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  label: {
    color: '#fff',
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 12,
    textAlign: 'center',
  },
  tab: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal: 5,
  },
});

export default Footer;
