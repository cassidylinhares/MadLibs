import React, {useState, useRef} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
//Import React Native Video to play video
import {Video} from 'expo-av';
/*
//Media Controls to control Play/Pause/Seek and full screen
import
  MediaControls, {PLAYER_STATES}
from 'react-native-media-controls';


//const {width} = Dimensions.get('window');


  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [
    playerState, setPlayerState
  ] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('content');

  const onSeek = (seek) => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };

  const onPaused = (playerState) => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = (data) => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = (data) => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onError = () => alert('Oh! ', error);

  const exitFullScreen = () => {
    alert('Exit full screen');
  };

  const enterFullScreen = () => {};

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == 'content') setScreenType('cover');
    else setScreenType('content');
  };

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );
*/
  //const onSeeking = (currentTime) => setCurrentTime(currentTime);

const {width, height} = Dimensions.get('window');

const VideoPlayer = ({navigation}) => {
  return (
    <View style={{flex:1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Icon style={{marginTop: 10, marginStart: 15}} name="arrow-back" size={28}/>
      </TouchableOpacity>
      <Video
        style={{width: width, height: height/3}}
        source={require('../assets/sample.mp4')}
        volume={1.0}
        isMuted={false}
        rate={1.0}
        useNativeControls
        shouldPlay={false}
        resizeMode="cover"
        isLooping={false}
        
      />
      </View>
      );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
});
  
