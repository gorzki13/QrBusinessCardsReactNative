import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const HistoryScreen = ({ route }) => {
  const [history, setHistory] = useState([]);

  const { scannedData } = route.params || {}; 

  useEffect(() => {
    if (scannedData) {

      const [firstName, lastName, email, phone] = scannedData.split('-');
      const newData = { firstName, lastName, email, phone };

      setHistory(prevHistory => [...prevHistory, newData]);
    }

   
    setHistory(prevHistory => [...prevHistory]);
  }, [scannedData]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Historia zeskanowanych kodów QR:</Text>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{`Imię: ${item.firstName}`}</Text>
            <Text style={styles.itemText}>{`Nazwisko: ${item.lastName}`}</Text>
            <Text style={styles.itemText}>{`Email: ${item.email}`}</Text>
            <Text style={styles.itemText}>{`Telefon: ${item.phone}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default HistoryScreen;