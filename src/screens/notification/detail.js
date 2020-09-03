import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet, Image} from 'react-native';
import Header from '../../components/header';
import notificationStyle from '../../styles/notification';
import typography from '../../styles/typography';
import {Text, Button} from 'react-native-elements';
import HTMLView from 'react-native-htmlview';

const NotificationDetail = ({route, navigation}) => {
  const [notification, setNotification] = useState();

  useEffect(() => {
    setNotification(route.params.notificationDetail);
  }, [route.params.notificationDetail]);

  return (
    <>
      <Header />
      <View style={notificationStyle.container}>
        <ScrollView
          contentContainerStyle={{paddingBottom: 35}}
          showsVerticalScrollIndicator={false}>
          {notification && notification.thumbnail ? (
            <Image
              style={{
                width: '100%',
                height: 200,
              }}
              resizeMode="contain"
              source={{
                uri: notification.thumbnail,
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

          {notification ? (
            <View style={notificationStyle.notificationDetailContentWrapper}>
              {/* <Text
                style={[
                  notificationStyle.notificationDetailTitle,
                  typography.fontRegular,
                ]}>
                {notification.title}
              </Text> */}
              <HTMLView value={notification.title} />
              <View style={notificationStyle.notificationDetailTimeWrapper}>
                <Image
                  style={{width: 12, height: 12, marginRight: 10}}
                  source={require('../../assets/icons/calendar.png')}
                />
                <Text
                  style={[
                    notificationStyle.notificationDetailTime,
                    typography.fontRegular,
                  ]}>
                  {notification.published_date}
                </Text>
              </View>
              {/* <Text
                style={[
                  notificationStyle.notificationDetailContent,
                  typography.fontRegular,
                ]}>
                {notification.content}
              </Text> */}
              <HTMLView
                value={'<div>' + notification.content + '</div>'}
                stylesheet={contentStyle}
              />
              <Button
                onPress={() => navigation.navigate('Notification')}
                buttonStyle={notificationStyle.notificationDetailBtn}
                title="Tillbaka"
                titleStyle={[
                  notificationStyle.notificationDetailBtnTxt,
                  typography.fontRegular,
                ]}
              />
            </View>
          ) : null}
        </ScrollView>
      </View>
    </>
  );
};
const contentStyle = StyleSheet.create({
  strong: {
    fontWeight: 'bold',
  },
  b: {
    fontWeight: 'bold',
  },
});
export default NotificationDetail;
