import React, {Component, PureComponent} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import RNFS from "react-native-fs";

class BBCam extends PureComponent {
  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);

      var destPath = RNFS.PicturesDirectoryPath + '/offender.jpg';
      RNFS.moveFile(data.uri, destPath)
        .then(success => {
          console.log('file moved!');
          // Toast.show(
          //   'Success. Press back to continue',
          //   Toast.LONG,
          //   Toast.CENTER,
          // );
          AsyncStorage.setItem('localImg', destPath);
        })
        .catch(err => {
          console.log('Error: ' + err.message);
        });
      // this.props.navigation.navigate('Home', {
      //   destPath,
      // });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          // flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            console.log(barcodes);
          }}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}>
            <Text style={{fontSize: 14}}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default BBCam;
