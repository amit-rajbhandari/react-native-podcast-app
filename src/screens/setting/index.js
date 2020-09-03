import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Switch,
  Linking,
  ScrollView,
  Alert,
} from 'react-native';
import Header from '../../components/header';
import settingStyle from '../../styles/setting';
import tokenService from '../../services/token.service';
import typography from '../../styles/typography';
import {Text, ListItem, Image, Button, Input} from 'react-native-elements';
import Loader from '../../components/loader';
import authService from '../../services/auth.service';

const Setting = props => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [
    newPodcastNotificationtEnabled,
    setNewPodcastNotificationEnabled,
  ] = useState(false);
  const [
    stalltipsNotificationEnabled,
    setStalltipsNotificationEnabled,
  ] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      setEmail(user.user_email);
      setName(user.user_display_name);
      setStalltipsNotificationEnabled(
        user.settings.notification_stalltips === '0' ? false : true,
      );
      setNewPodcastNotificationEnabled(
        user.settings.notification_new_podcast === '0' ? false : true,
      );
    }
  }, [user]);

  const getUser = async () => {
    setUser(await tokenService.getUser());
  };

  const updateProfile = async () => {
    let val1 = newPodcastNotificationtEnabled ? '1' : '0';
    let val2 = stalltipsNotificationEnabled ? '1' : '0';
    setLoading(true);
    try {
      const response = await authService.updateProfile(
        name,
        email,
        password,
        val1,
        val2,
      );
      setLoading(false);
      Alert.alert('Success', 'Profile updated!');
      if (response.data.data) {
        let obj = {
          settings: {
            notification_new_podcast:
              response.data.data.settings.notification_new_podcast,
            notification_stalltips:
              response.data.data.settings.notification_stalltips,
          },
          user_display_name: response.data.data.display_name,
          user_email: response.data.data.user_email,
        };
        tokenService.setUser(obj);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const toggleNewPodcastNotificationSwitch = () => {
    setNewPodcastNotificationEnabled(!newPodcastNotificationtEnabled);
  };
  const toggleStalltipsNotificationSwitch = () => {
    setStalltipsNotificationEnabled(!stalltipsNotificationEnabled);
  };

  const open = async link => {
    if (link) {
      await Linking.openURL(link);
    }
  };

  return (
    <>
      <Header />
      <View style={settingStyle.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 40}}
          style={settingStyle.contentWrapper}>
          <Text style={[settingStyle.title, typography.fontSemiBold]}>
            Inställningar
          </Text>
          <View style={{marginBottom: 30}}>
            <View style={settingStyle.editView}>
              <Image
                style={{width: 35, height: 40}}
                source={require('../../assets/icons/user-blue.png')}
              />
              <Input
                inputContainerStyle={settingStyle.inputContainer}
                inputStyle={[settingStyle.input, typography.fontRegular]}
                value={name}
                placeholder="Name"
                placeholderTextColor="#123F68"
                onChangeText={value => setName(value)}
              />
            </View>

            <View style={settingStyle.editView}>
              <Image
                style={{width: 35, height: 35}}
                source={require('../../assets/icons/email.png')}
              />
              <Input
                inputContainerStyle={settingStyle.inputContainer}
                inputStyle={[settingStyle.input, typography.fontRegular]}
                value={email}
                placeholder="Email"
                placeholderTextColor="#123F68"
                onChangeText={value => setEmail(value)}
              />
            </View>
            <View style={settingStyle.editView}>
              <Image
                style={{width: 35, height: 35}}
                source={require('../../assets/icons/unlock.png')}
              />
              <Input
                inputContainerStyle={settingStyle.inputContainer}
                inputStyle={[settingStyle.input, typography.fontRegular]}
                value={password}
                placeholder="Lösenord"
                placeholderTextColor="#123F68"
                onChangeText={value => setPassword(value)}
                secureTextEntry={true}
              />
            </View>
          </View>
          <Text style={[settingStyle.title, typography.fontSemiBold]}>
            Push notiser
          </Text>
          <View style={{marginBottom: 30}}>
            <ListItem
              containerStyle={settingStyle.contentBox}
              key={4}
              rightElement={
                <View>
                  <Switch
                    trackColor={{false: '#FF0000', true: '#008000'}}
                    thumbColor={'#fff'}
                    ios_backgroundColor="#fff"
                    onValueChange={toggleNewPodcastNotificationSwitch}
                    value={newPodcastNotificationtEnabled}
                  />
                </View>
              }
              title={'Nya podcasts'}
              titleStyle={[settingStyle.contentTitle, typography.fontRegular]}
              bottomDivider
            />
            <ListItem
              containerStyle={settingStyle.contentBox}
              key={5}
              rightElement={
                <View>
                  <Switch
                    trackColor={{false: '#FF0000', true: '#008000'}}
                    thumbColor={'#fff'}
                    ios_backgroundColor="#fff"
                    onValueChange={toggleStalltipsNotificationSwitch}
                    value={stalltipsNotificationEnabled}
                  />
                </View>
              }
              title={'Notiser'}
              titleStyle={[settingStyle.contentTitle, typography.fontRegular]}
              bottomDivider
            />
          </View>
          <Text style={[settingStyle.title, typography.fontSemiBold]}>
            Mitt medlemskap
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => open('https://www.andelskungen.se/podcast/')}>
            <View style={{marginBottom: 30}}>
              <ListItem
                containerStyle={settingStyle.contentBox}
                key={6}
                title={'Hantera din månadsbetalning på vår hemsida'}
                titleStyle={[settingStyle.contentTitle, typography.fontRegular]}
                bottomDivider
                chevron
              />
            </View>
          </TouchableOpacity>
          <Button
            onPress={updateProfile}
            buttonStyle={settingStyle.button}
            title="Spara inställningar"
            titleStyle={[settingStyle.btnTxt, typography.fontRegular]}
          />
        </ScrollView>
        {loading ? <Loader /> : null}
      </View>
    </>
  );
};

export default Setting;
