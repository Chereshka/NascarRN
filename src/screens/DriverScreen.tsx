import {useRoute} from '@react-navigation/native';
import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {AppStateType} from '../redux/store';

const DriverScreen = () => {
  const {driver} = useSelector((state: AppStateType) => state.app);
  return (
    <SafeAreaView style={{flex: 1, paddingTop: 12, paddingHorizontal: 10}}>
      <Text style={styles.driverText}>{`Name:   ${driver?.givenName}`}</Text>
      <Text
        style={styles.driverText}>{`LastName:     ${driver?.familyName}`}</Text>
      <Text style={styles.driverText}>{`Wiki:   ${driver?.url}`}</Text>
    </SafeAreaView>
  );
};

export default DriverScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 10,
    // alignItems: 'center',
  },
  raceContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    marginVertical: 10,
  },
  driverText: {
    fontWeight: '500',
    fontSize: 17,
    lineHeight: 28
  },
});
