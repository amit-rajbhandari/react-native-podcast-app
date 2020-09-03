import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Modal,
  Alert,
} from 'react-native';
import {Text, Image, Button} from 'react-native-elements';
import Header from '../../components/header';
import podcastStyle from '../../styles/podcast';
import typography from '../../styles/typography';
import podcastService from '../../services/podcast.service';
import Loader from '../../components/loader';
import HTMLView from 'react-native-htmlview';
import VideoContext from '../../provider/video-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';

const Podcast = props => {
  const [loading, setLoading] = useState(false);
  const [podcastList, setPodcastList] = useState([]);
  const [podcastListLength, setPodcastListLength] = useState(1);
  const [originalPodcastList, setOriginalPodcastList] = useState([]);
  /* Datepicker */
  const [date, setDate] = useState(new Date());
  const [iosdate, setIosDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getPodcast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (filter) {
      getPodcastByDate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const getPodcast = async () => {
    setLoading(true);
    try {
      const response = await podcastService.getPodcast();
      setLoading(false);
      setPodcastList(response.data.data);
      setOriginalPodcastList(response.data.data);
      setPodcastListLength(response.data.data.length);
    } catch (error) {
      Alert.alert(
        'Något gick fel. Vänligen försök igen.',
        '',
        [
          {
            text: 'Försök igen',
            onPress: () => getPodcast(),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
      setLoading(false);
      console.log(error);
    }
  };

  const getPodcastByDate = async () => {
    setLoading(true);
    try {
      const response = await podcastService.getPodcastByDate(filter);
      setLoading(false);
      setPodcastList(response.data.data);
      setPodcastListLength(response.data.data.length);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const onIosDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setIosDate(selectedDate);
    }
  };

  const onIosDateConfirm = () => {
    setShow(false);
    if (iosdate) {
      setFilter(Moment(iosdate).format('YYYY-MM-DD'));
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      setFilter(Moment(selectedDate).format('YYYY-MM-DD'));
    }
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await podcastService.getPodcast();
      setRefreshing(false);
      setPodcastList(response.data.data);
      setOriginalPodcastList(response.data.data);
      setPodcastListLength(response.data.data.length);
    } catch (error) {
      Alert.alert(
        'Något gick fel. Vänligen försök igen.',
        '',
        [
          {
            text: 'Försök igen',
            onPress: () => getPodcast(),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
      setRefreshing(false);
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <View style={podcastStyle.container}>
        <View style={podcastStyle.contentWrapper}>
          <Text style={[podcastStyle.title, typography.fontBold]}>
            Podcasts
          </Text>

          {/* <View style={{position: 'relative'}}>
            <Button
              onPress={showDatepicker}
              type="clear"
              title={filter ? filter : 'Filtrera per datum'}
              containerStyle={podcastStyle.dateContainer}
              buttonStyle={podcastStyle.dateInput}
              titleStyle={[podcastStyle.dateInputTitle, typography.fontRegular]}
            />
            {filter ? (
              <Button
                type="clear"
                icon={
                  <Image
                    style={{width: 15, height: 15}}
                    source={require('../../assets/icons/close.png')}
                  />
                }
                buttonStyle={podcastStyle.podcastBtnClose}
                onPress={() => {
                  setPodcastList(originalPodcastList);
                  setFilter('');
                  setPodcastListLength(originalPodcastList.length);
                }}
              />
            ) : null}
          </View> */}

          {podcastListLength == 0 ? (
            <Text style={[podcastStyle.title, typography.fontRegular]}>
              No podcast found
            </Text>
          ) : null}

          <FlatList
            data={podcastList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 65}}
            style={{paddingLeft: 12, paddingRight: 12}}
            keyExtractor={(item, index) => index.toString()}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            renderItem={({item, index}) => (
              <View key={index} style={{marginBottom: 30}}>
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
                  numberOfLines={2}
                  style={[podcastStyle.podcastTitle, typography.fontBold]}>
                  {item.title}
                </Text>
                <Text
                  style={[
                    podcastStyle.podcastSubTitle,
                    typography.fontRegular,
                  ]}>
                  {item.published_date}, {item.author}
                </Text>
                <HTMLView value={item.content} stylesheet={contentStyle} />
              </View>
            )}
          />
        </View>
        {show && Platform.OS === 'android' && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onDateChange}
          />
        )}
        <Modal
          animationType="none"
          transparent={true}
          visible={show && Platform.OS === 'ios'}
          onRequestClose={() => {
            setShow(false);
          }}>
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,.3)'}}>
            <View style={{flex: 2}} />
            <View
              style={{
                flex: 1,
                paddingTop: 25,
                backgroundColor: 'rgba(255,255,255,.95)',
              }}>
              <Button
                onPress={onIosDateConfirm}
                type="clear"
                title="OK"
                titleStyle={{color: '#123F68'}}
                buttonStyle={podcastStyle.podcastDatePickerOk}
              />
              <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={iosdate}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onIosDateChange}
              />
            </View>
          </View>
        </Modal>
        {loading ? <Loader /> : null}
      </View>
    </>
  );
};
const contentStyle = StyleSheet.create({
  p: {
    height: 'auto',
    fontSize: 12,
    color: '#123F68',
    fontFamily: 'SourceSansPro-Regular',
  },
  a: {
    fontSize: 12,
    color: '#123F68',
    fontFamily: 'SourceSansPro-Regular',
  },
  ul: {
    margin: 0,
    padding: 0,
  },
  li: {
    marginBottom: 10,
    fontSize: 12,
    color: '#123F68',
    fontFamily: 'SourceSansPro-Regular',
  },
});
export default Podcast;
