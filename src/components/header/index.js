import React, {useContext} from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import authService from '../../services/auth.service';
import tokenService from '../../services/token.service';
import typography from '../../styles/typography';
import AuthContext from '../../provider/auth-context';
import VideoContext from '../../provider/video-context';

const Header = () => {
  const {signOut} = useContext(AuthContext);
  const {setVideo} = useContext(VideoContext);
  const logout = async () => {
    setVideo(null);
    signOut();
    try {
      const response = await authService.logout();
      tokenService.clearToken();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={headerStyle.container}>
        <View style={headerStyle.logo}>
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
        <TouchableOpacity activeOpacity={0.9} onPress={logout}>
          <View style={headerStyle.logout}>
            <View style={{width: 40, height: 35}}>
              <Image
                style={{
                  width: undefined,
                  height: undefined,
                  flex: 1,
                  resizeMode: 'cover',
                }}
                source={require('../../assets/icons/logout.png')}
              />
            </View>
            <Text style={[headerStyle.link, typography.fontRegular]}>
              Logga ut
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const headerStyle = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    backgroundColor: '#fff',
    zIndex: 999,
  },
  logo: {paddingLeft: 20},
  logout: {
    paddingRight: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  link: {
    fontSize: 12,
    color: '#123F68',
  },
});

export default Header;
