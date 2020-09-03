import React, {useEffect, useState} from 'react';
import {View, Linking, TouchableOpacity} from 'react-native';
import Header from '../../components/header';
import settingStyle from '../../styles/setting';
import {Text, ListItem} from 'react-native-elements';
import typography from '../../styles/typography';
import podcastService from '../../services/podcast.service';
import Loader from '../../components/loader';

const Andelsspel = props => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState();

  useEffect(() => {
    getUrl();
  }, []);

  const getUrl = async () => {
    setLoading(true);
    try {
      const response = await podcastService.getPodcastUrl();
      setLoading(false);
      if (response.data.data) {
        setUrl(response.data.data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
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
        <View style={settingStyle.contentWrapper}>
          <Text style={[settingStyle.title, typography.fontSemiBold]}>
            Spela andelsspel med oss
          </Text>

          <View style={{marginBottom: 30}}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => open(url.v75)}>
              <ListItem
                containerStyle={settingStyle.contentBox}
                key={7}
                title={'V75, V86, GS75'}
                titleStyle={[settingStyle.contentTitle, typography.fontRegular]}
                bottomDivider
                chevron
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => open(url.tipster)}>
              <ListItem
                containerStyle={settingStyle.contentBox}
                key={7}
                title={'Stryktips, europatips, sport'}
                titleStyle={[settingStyle.contentTitle, typography.fontRegular]}
                bottomDivider
                chevron
              />
            </TouchableOpacity>
          </View>
        </View>
        {loading ? <Loader /> : null}
      </View>
    </>
  );
};

export default Andelsspel;
