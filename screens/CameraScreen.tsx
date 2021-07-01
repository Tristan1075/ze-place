import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {Camera} from 'expo-camera';
import Colors from '../constants/Colors';
import {Ionicons, Entypo} from '@expo/vector-icons';
import Layout from '../constants/Layout';

type Props = {
  onPress: (data) => void;
};

const CameraScreen = (props: Props) => {
  const cameraRef = useRef<Camera>(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [showFlash, setShowFlash] = useState<boolean>(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5};
      const data = await cameraRef.current.takePictureAsync(options);
      props.onPress(data);
    }
  };

  const handleTakePicturePress = () => {
    setShowFlash(true);
    takePicture();
    setTimeout(() => {
      setShowFlash(false);
    }, 100);
  };

  const handleFlashPress = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };

  const handleCameraType = () => {
    if (type === Camera.Constants.Type.back) {
      setType(Camera.Constants.Type.front);
    } else {
      setType(Camera.Constants.Type.back);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Image
          source={require('../assets/images/id_card.png')}
          style={styles.exemple}
        />
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={type}
          flashMode={flashMode}>
          {showFlash && <View style={styles.flash} />}
        </Camera>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={handleTakePicturePress}>
          <Ionicons name="camera" size={50} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.flashButton,
            flashMode === Camera.Constants.FlashMode.on && styles.flashActive,
          ]}
          onPress={handleFlashPress}>
          <Entypo
            name="flashlight"
            size={25}
            color={
              flashMode === Camera.Constants.FlashMode.off
                ? Colors.primary
                : Colors.white
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.reverseButton}
          onPress={handleCameraType}>
          <Ionicons
            name="ios-camera-reverse"
            size={25}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
  camera: {
    position: 'absolute',
    flex: 1,
    width: '80%',
    height: '25%',
    borderRadius: 10,
  },
  overlay: {
    backgroundColor: 'rgba(8, 26, 43, 0.8)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 999,
    ...Layout.shadow,
  },
  flashButton: {
    position: 'absolute',
    bottom: 70,
    right: 40,
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 999,
    ...Layout.shadow,
  },
  flashActive: {
    backgroundColor: Colors.yellow,
  },
  reverseButton: {
    position: 'absolute',
    bottom: 70,
    left: 40,
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 999,
    ...Layout.shadow,
  },
  flash: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  exemple: {
    position: 'absolute',
    resizeMode: 'contain',
    top: 150,
    width: 220,
    height: 120,
  },
});

export default CameraScreen;
