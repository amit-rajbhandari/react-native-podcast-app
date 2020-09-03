import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import Header from '../../components/header';
import dashboardStyle from '../../styles/dashboard';
import typography from '../../styles/typography';
import tokenService from '../../services/token.service';
import podcastService from '../../services/podcast.service';
import authService from '../../services/auth.service';
import notificationService from '../../services/notification.service';
import Loader from '../../components/loader';
import {Image, Text, Card} from 'react-native-elements';
import VideoContext from '../../provider/video-context';
import Orientation from 'react-native-orientation';
import AsyncStorage from '@react-native-community/async-storage';
import HTMLView from 'react-native-htmlview';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const Dashboard = props => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [podcastList, setPodcastList] = useState([]);
  const [podcast, setPodcast] = useState([]);
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getUser();
      getPodcast();
      getNotification();
    });
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    Orientation.unlockAllOrientations();
    Orientation.lockToPortrait();
    updateDeviceToken();
    Platform.OS === 'ios' &&
      PushNotificationIOS.setApplicationIconBadgeNumber(0);
  }, []);

  const getUser = async () => {
    setUser(await tokenService.getUser());
  };

  const getNotification = async () => {
    try {
      const response = await notificationService.getNotification();
      if (response && response.data.data) {
        let arrs = response.data.data.slice(0, 10);
        setNotificationList(arrs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPodcast = async () => {
    setLoading(true);
    try {
      const response = await podcastService.getPodcast();
      setLoading(false);
      if (response && response.data.data) {
        let arr = response.data.data.slice(0, 1);
        let arrs = response.data.data.slice(1, 11);
        setPodcastList(arrs);
        setPodcast(arr);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const updateDeviceToken = async () => {
    let deviceToken = await AsyncStorage.getItem('deviceToken');
    if (deviceToken) {
      try {
        const response = await authService.updateDeviceToken(deviceToken);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Header />
      <View style={dashboardStyle.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '5%'}}>
          <View
            style={{
              marginHorizontal: 15,
              marginTop: 15,
              marginBottom: 30,
            }}>
            <Text style={[dashboardStyle.title, typography.fontSemiBold]}>
              Välkommen {user ? user.user_display_name : null}
            </Text>
            {podcast && podcast.length > 0 ? (
              <Text style={[dashboardStyle.title, typography.fontSemiBold]}>
                Senaste podcast
              </Text>
            ) : null}
            {podcast && podcast.length > 0
              ? podcast.map((item, index) => {
                  return (
                    <View key={index}>
                      <VideoContext.Consumer>
                        {({setVideo}) => (
                          <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => setVideo(item)}>
                            <Image
                              style={{width: '100%', height: 165}}
                              source={require('../../assets/images/0.jpg')}
                            />
                          </TouchableOpacity>
                        )}
                      </VideoContext.Consumer>

                      <Text
                        style={[
                          dashboardStyle.latestPodcastTitle,
                          typography.fontBold,
                        ]}>
                        {item.title.substring(0, 40)}
                      </Text>
                      <Text
                        style={[
                          dashboardStyle.latestPodcastSubTitle,
                          typography.fontRegular,
                        ]}>
                        {item.published_date}, {item.author}
                      </Text>
                    </View>
                  );
                })
              : null}
          </View>

          <View style={{marginLeft: 15, marginBottom: 20}}>
            {podcastList && podcastList.length > 0 ? (
              <Text style={[dashboardStyle.title, typography.fontSemiBold]}>
                Podcasts
              </Text>
            ) : null}
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={podcastList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <View key={index} style={dashboardStyle.podcast}>
                  <VideoContext.Consumer>
                    {({setVideo}) => (
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => setVideo(item)}>
                        <Image
                          style={{width: 135, height: 90}}
                          source={require('../../assets/images/0.jpg')}
                        />
                      </TouchableOpacity>
                    )}
                  </VideoContext.Consumer>
                  <Text
                    style={[dashboardStyle.podcastTitle, typography.fontBold]}>
                    {item.title.substring(0, 15)}...
                  </Text>
                </View>
              )}
            />
          </View>
          <View
            style={{
              marginLeft: 15,
              marginTop: 15,
              marginBottom: 15,
            }}>
            {notificationList && notificationList.length > 0 ? (
              <Text style={[dashboardStyle.title, typography.fontBold]}>
                Notiser
              </Text>
            ) : null}
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={notificationList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() =>
                    props.navigation.navigate('Notifications', {
                      screen: 'NotificationDetail',
                      params: {
                        notificationDetail: item,
                      },
                    })
                  }>
                  <Card
                    key={index}
                    containerStyle={dashboardStyle.notificationCard}>
                    <View style={dashboardStyle.notificationContentWrapper}>
                      <View style={dashboardStyle.notificationImage}>
                        {item.thumbnail ? (
                          <Image
                            style={{width: 55, height: 55}}
                            source={{
                              uri: item.thumbnail,
                            }}
                          />
                        ) : (
                          <Image
                            style={{width: 55, height: 55}}
                            source={require('../../assets/images/0.jpg')}
                          />
                        )}
                      </View>
                      <View style={dashboardStyle.notificationContent}>
                        {/* <Text
                          style={[
                            dashboardStyle.notificationTitle,
                            typography.fontRegular,
                          ]}
                          numberOfLines={2}>
                          {item.title}
                        </Text> */}
                        <HTMLView value={item.title} />
                        <Text
                          onPress={() =>
                            props.navigation.navigate('Notifications', {
                              screen: 'NotificationDetail',
                              params: {
                                notificationDetail: item,
                              },
                            })
                          }
                          style={[
                            dashboardStyle.notificationLink,
                            typography.fontRegular,
                          ]}>
                          Läs mer
                        </Text>
                        <View style={dashboardStyle.notificationTimeWrapper}>
                          <Image
                            style={{width: 10, height: 10, marginRight: 10}}
                            source={require('../../assets/icons/calendar.png')}
                          />
                          <Text
                            style={[
                              dashboardStyle.notificationTime,
                              typography.fontRegular,
                            ]}>
                            {item.published_date}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>
        {loading ? <Loader /> : null}
      </View>
    </>
  );
};

export default Dashboard;
