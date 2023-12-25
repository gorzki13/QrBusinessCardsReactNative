import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';

const ScanScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    if (!loading) {
      setScannedData(data);
      setLoading(true);
    }
  };

  useEffect(() => {
    if (scannedData) {
      navigation.navigate('History', { scannedData });
      setLoading(false);
    }
  }, [scannedData, navigation]);

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.cameraContainer}
        onBarCodeScanned={handleBarCodeScanned}
        barCodeTypes={['qr']}
      >
        <View style={styles.overlay}>
          <Text style={styles.scanText}>Scan the QR code</Text>
          {loading && <ActivityIndicator size="large" color="#fff" />}
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  scanText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
});

export default ScanScreen;