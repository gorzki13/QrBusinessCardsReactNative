// HomeScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const HomeScreen = () => {
  const qrData = 'Jakub-Gorzkiewicz-jg@gmail.com-789123432';

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Twój kod QR :</Text>
      <QRCode value={qrData} size={200} />
    </View>
  );
};

export default HomeScreen;