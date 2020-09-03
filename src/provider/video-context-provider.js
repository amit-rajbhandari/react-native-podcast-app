import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import VideoContext from './video-context';
import VideoModal from '../screens/video';

export default class VideoContextProvider extends React.PureComponent {
  state = {
    video: null,
  };

  setVideo = video => {
    this.setState({video});
  };

  render() {
    const {setVideo} = this;
    const {children} = this.props;
    const {video} = this.state;
    return (
      <VideoContext.Provider value={{video, setVideo}}>
        <View style={StyleSheet.absoluteFill}>{children}</View>
        {video && <VideoModal {...{video}} />}
      </VideoContext.Provider>
    );
  }
}
