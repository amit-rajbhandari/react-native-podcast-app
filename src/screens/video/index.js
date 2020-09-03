import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StatusBar,
  BackHandler,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import VideoPlayer from 'react-native-video';
import {Image, Button} from 'react-native-elements';
import VideoContext from '../../provider/video-context';
import Orientation from 'react-native-orientation';
import typography from '../../styles/typography';
import videoStyle from '../../styles/video';

const Video = props => {
  const videoData = props.video;

  const [containerHeight, setContainerHeight] = useState('100%');

  const [containerWidth, setContainerWidth] = useState('100%');

  const [containerMarginBottom, setContainerMarginBottom] = useState(0);

  const [videoWidth, setVideoWidth] = useState('100%');

  const [videoHeight, setVideoHeight] = useState('100%');

  const [minimizedView, setMinimizedView] = useState(false);

  const [showDefaultControl, setShowDefaultControl] = useState(true);

  const [paused, setPaused] = useState(false);

  const [isFullScreen, setIsFullScreen] = useState(true);

  const dim = Dimensions.get('window');

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    Orientation.unlockAllOrientations();
    Orientation.lockToLandscape();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBackButton = () => {
    minimize();
    return true;
  };

  const pausePlayVideo = () => {
    setPaused(!paused);
  };

  const slideUp = () => {
    setShowDefaultControl(true);
    Orientation.unlockAllOrientations();
    Orientation.lockToLandscape();

    setContainerHeight('100%');
    setContainerWidth('100%');
    setVideoWidth('100%');
    setVideoHeight('100%');
    setContainerMarginBottom(0);
    setMinimizedView(false);
    setIsFullScreen(true);
  };

  const _onDismissPlayer = () => {
    Orientation.unlockAllOrientations();
    Orientation.lockToPortrait();
  };

  const minimize = () => {
    Orientation.unlockAllOrientations();
    Orientation.lockToPortrait();
    setShowDefaultControl(false);
    const minimizeTabPosY = Platform.OS === 'ios' && dim.height > 812 ? 84 : 50;
    setContainerHeight(65);
    setContainerWidth('100%');
    setVideoWidth('28%');
    setVideoHeight(65);
    setContainerMarginBottom(minimizeTabPosY);
    setMinimizedView(true);
    setIsFullScreen(false);
  };

  /*const audioPlayer = (
    <>
      <VideoPlayer
        source={{
          uri: videoData.media_source,
        }}
        style={{width: videoWidth, height: videoHeight}}
        controls={showDefaultControl}
        playInBackground={true}
        audioOnly={true}
        fullscreen={true}
        posterResizeMode="cover"
        poster={
          'https://www.andelskungen.se/wp-content/themes/andelskungen/assets/build/img/podcast-thumbnail.jpg'
        }
        paused={paused}
      />
    </>
  );*/

  const videoOnlyPlayer = (
    <>
      <VideoPlayer
        source={{
          uri: videoData.media_source,
        }}
        style={{width: videoWidth, height: videoHeight}}
        controls={showDefaultControl}
        playInBackground={true}
        audioOnly={false}
        fullscreen={true}
        resizeMode="contain"
        ignoreSilentSwitch="ignore"
        paused={paused}
      />
    </>
  );

  const audioOnlyPlayer = (
    <View style={{position: 'relative'}}>
      <VideoPlayer
        source={{
          uri: videoData.media_source,
        }}
        style={{width: videoWidth, height: videoHeight}}
        controls={showDefaultControl}
        playInBackground={true}
        audioOnly={false}
        fullscreen={true}
        ignoreSilentSwitch="ignore"
        resizeMode="contain"
        paused={paused}
      />
      {minimizedView ? (
        <View
          style={{
            width: videoWidth,
            height: videoHeight,
            position: 'absolute',
            top: 0,
            left: 0,
          }}>
          <Image
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            source={require('../../assets/images/0.jpg')}
          />
        </View>
      ) : (
        <View style={{position: 'absolute', top: '25%', left: '25%'}}>
          <Image
            style={{width: 380, height: 180, resizeMode: 'contain'}}
            source={require('../../assets/images/0.jpg')}
          />
        </View>
      )}
    </View>
  );

  return (
    <>
      <StatusBar hidden={isFullScreen} />
      <View
        style={[
          {
            width: containerWidth,
            height: containerHeight,
            marginBottom: containerMarginBottom,
          },
          videoStyle.container,
        ]}>
        {videoData.media_type === 'mp3' ? audioOnlyPlayer : videoOnlyPlayer}

        {minimizedView ? (
          <>
            <View
              style={[
                {
                  left: videoWidth,
                },
                videoStyle.minimizedContainer,
              ]}>
              <View style={videoStyle.slideUpContainer}>
                <TouchableOpacity activeOpacity={0.9} onPress={slideUp}>
                  <Text
                    numberOfLines={2}
                    style={[videoStyle.title, typography.fontRegular]}>
                    {videoData.title}...
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: '27%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingRight: '2%',
                }}>
                {paused ? (
                  <Button
                    type="clear"
                    icon={
                      <Image
                        style={{width: 15, height: 15}}
                        source={require('../../assets/icons/play.png')}
                      />
                    }
                    buttonStyle={{width: '50%', height: 50}}
                    onPress={pausePlayVideo}
                  />
                ) : (
                  <Button
                    type="clear"
                    icon={
                      <Image
                        style={{width: 15, height: 15}}
                        source={require('../../assets/icons/pause.png')}
                      />
                    }
                    buttonStyle={{width: '50%', height: 50}}
                    onPress={pausePlayVideo}
                  />
                )}

                <VideoContext.Consumer>
                  {({setVideo}) => (
                    <Button
                      type="clear"
                      icon={
                        <Image
                          style={{width: 15, height: 15}}
                          source={require('../../assets/icons/close.png')}
                        />
                      }
                      buttonStyle={{width: '50%', height: 50, marginLeft: '2%'}}
                      onPress={() => {
                        setVideo(null);
                        _onDismissPlayer();
                      }}
                    />
                  )}
                </VideoContext.Consumer>
              </View>
            </View>
          </>
        ) : (
          <View style={videoStyle.fullscreenContainer}>
            <Button
              type="clear"
              icon={
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../assets/icons/minimize.png')}
                />
              }
              buttonStyle={videoStyle.button}
              onPress={minimize}
            />

            <VideoContext.Consumer>
              {({setVideo}) => (
                <Button
                  type="clear"
                  icon={
                    <Image
                      style={{width: 20, height: 20}}
                      source={require('../../assets/icons/close.png')}
                    />
                  }
                  buttonStyle={videoStyle.button}
                  onPress={() => {
                    setVideo(null);
                    _onDismissPlayer();
                  }}
                />
              )}
            </VideoContext.Consumer>
          </View>
        )}
      </View>
    </>
  );
};

export default Video;
