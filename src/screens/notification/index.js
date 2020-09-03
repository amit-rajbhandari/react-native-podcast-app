import React, {useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import Header from '../../components/header';
import notificationStyle from '../../styles/notification';
import typography from '../../styles/typography';
import notificationService from '../../services/notification.service';
import Loader from '../../components/loader';
import {Image, Text, Card} from 'react-native-elements';
import HTMLView from 'react-native-htmlview';

const Notification = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const getNotification = async () => {
    setLoading(true);
    try {
      const response = await notificationService.getNotification(page);
      setLoading(false);
      setRefreshing(false);
      if (response && response.data.data) {
        response.data.data.forEach(element => {
          setNotificationList(prevState => [...prevState, element]);
        });
      }
    } catch (error) {
      setLoading(false);
      setRefreshing(false);
      console.log(error);
    }
  };

  const loadMoreNotification = async () => {
    setPage(page + 1);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await notificationService.getNotification(1);
      setRefreshing(false);
      if (response && response.data.data) {
        setNotificationList(response.data.data);
      }
    } catch (error) {
      setRefreshing(false);
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <View style={notificationStyle.container}>
        <View style={notificationStyle.contentWrapper}>
          <Text style={[notificationStyle.title, typography.fontBold]}>
            Notiser
          </Text>
          <FlatList
            data={notificationList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 35}}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={loadMoreNotification}
            onEndReachedThreshold={0.1}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  navigation.navigate('NotificationDetail', {
                    notificationDetail: item,
                  });
                }}>
                <Card
                  key={index}
                  containerStyle={notificationStyle.notificationCard}>
                  <View style={notificationStyle.notificationContentWrapper}>
                    <View style={notificationStyle.notificationImage}>
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
                    <View style={notificationStyle.notificationContent}>
                      {/* <Text
                        style={[
                          notificationStyle.notificationTitle,
                          typography.fontRegular,
                        ]}
                        numberOfLines={3}>
                        {item.title}
                      </Text> */}
                      <HTMLView value={item.title} />
                      <Text
                        onPress={() => {
                          navigation.navigate('NotificationDetail', {
                            notificationDetail: item,
                          });
                        }}
                        style={[
                          notificationStyle.notificationLink,
                          typography.fontRegular,
                        ]}>
                        Läs mer
                      </Text>
                      <View style={notificationStyle.notificationTimeWrapper}>
                        <Image
                          style={{width: 10, height: 10, marginRight: 10}}
                          source={require('../../assets/icons/calendar.png')}
                        />
                        <Text
                          style={[
                            notificationStyle.notificationTime,
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
        {loading ? <Loader /> : null}
      </View>
    </>
  );
};

export default Notification;
