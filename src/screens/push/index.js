import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, BackHandler, Image} from 'react-native';
import PushHeader from '../../components/push-header';
import Footer from '../../components/footer';
import typography from '../../styles/typography';
import {Text, Button} from 'react-native-elements';
import HTMLView from 'react-native-htmlview';
import Moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import tokenService from '../../services/token.service';

const Push = ({route}) => {
  const navigation = useNavigation();
  const [user, setUser] = useState();
  const title = route.params.title;
  const content = route.params.content;
  const published_date = route.params.published_date;
  const thumbnail = route.params.thumbnail;
  useEffect(() => {
    getUser();
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUser = async () => {
    setUser(await tokenService.getUser());
  };

  const handleBackButton = () => {
    user
      ? navigation.navigate('Root', {
          screen: 'Notifications',
        })
      : navigation.navigate('Login');
    return true;
  };

  return (
    <>
      <PushHeader />
      <View style={style.container}>
        <ScrollView
          contentContainerStyle={{paddingBottom: 35}}
          showsVerticalScrollIndicator={false}>
          {thumbnail ? (
            <Image
              style={{
                width: '100%',
                height: 200,
              }}
              resizeMode="contain"
              source={{
                uri: thumbnail,
              }}
            />
          ) : (
            <Image
              style={{
                width: '100%',
                height: 155,
              }}
              resizeMode="contain"
              source={require('../../assets/images/0.jpg')}
            />
          )}

          <View style={style.notificationDetailContentWrapper}>
            {/* <Text
              style={[style.notificationDetailTitle, typography.fontRegular]}>
              {title}
            </Text> */}
            <HTMLView value={title} />
            <View style={style.notificationDetailTimeWrapper}>
              <Image
                style={{width: 12, height: 12, marginRight: 10}}
                source={require('../../assets/icons/calendar.png')}
              />
              <Text
                style={[style.notificationDetailTime, typography.fontRegular]}>
                {Moment(published_date).format('YYYY-MM-DD')}
              </Text>
            </View>
            <HTMLView value={content} />
            <Button
              onPress={() => {
                user
                  ? navigation.navigate('Root', {
                      screen: 'Notifications',
                    })
                  : navigation.navigate('Login');
              }}
              buttonStyle={style.notificationDetailBtn}
              title="Tillbaka"
              titleStyle={[
                style.notificationDetailBtnTxt,
                typography.fontRegular,
              ]}
            />
          </View>
        </ScrollView>
      </View>
      {user && <Footer navigation={navigation} />}
    </>
  );
};

export default Push;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  notificationDetailContentWrapper: {
    marginTop: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  notificationDetailTitle: {
    fontSize: 16,
    color: '#123F68',
    marginBottom: 20,
  },
  notificationDetailContent: {
    fontSize: 14,
    color: '#123F68',
    lineHeight: 20,
  },
  notificationDetailTimeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  notificationDetailTime: {
    fontSize: 14,
    color: '#123F68',
  },
  notificationDetailBtn: {
    padding: 10,
    marginTop: 20,
    width: 120,
    backgroundColor: '#123F68',
    borderRadius: 25,
    overflow: 'hidden',
  },
  notificationDetailBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
});
