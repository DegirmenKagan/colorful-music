import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, PermissionsAndroid } from 'react-native';
import { AudioRecorder as Audio}  from 'react-native-audio';
import { getColorsFromAudio } from 'react-native-colors';

const App = () => {
  const [color, setColor] = useState('#000000');

  useEffect(() => {
    requestMicrophonePermission();
    setupAudio();
  }, []);

  const requestMicrophonePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'This app needs access to your microphone',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Microphone permission granted');
      } else {
        console.log('Microphone permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const setupAudio = () => {
    Audio.init();
    Audio.start();
    Audio.on('data', handleAudioData);
  };

  const handleAudioData = (data) => {
    const colors = getColorsFromAudio(data);
    if (colors.length > 0) {
      setColor(colors[0]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.colorContainer, { backgroundColor: color }]} />
      <Text style={styles.text}>Color: {color}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorContainer: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
  },
});

export default App;
