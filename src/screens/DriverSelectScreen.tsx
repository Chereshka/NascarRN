import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  ListRenderItemInfo,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Button,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {AppStateType} from '../redux/store';
import {DriverType} from '../types/types';
import {loadDrivers, loadRaces, setDriverInfo} from '../redux/appReducer';
import {colors} from '../api/staticData/color';
const {height} = Dimensions.get('screen');
const DriverSelectScreen = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const navigation = useNavigation<any>();

  const {drivers, driversLoading} = useSelector(
    (state: AppStateType) => state.app,
  );

  const onDriverInfoPress = useCallback((driver: DriverType) => {
    dispatch(setDriverInfo(driver));
    navigation.navigate('DriverScreen', {driver: driver});
  }, []);

  const onDriverRacesPress = useCallback((driverId: string) => {
    dispatch(loadRaces(driverId));
    navigation.navigate('RacesScreen');
  }, []);

  const updatePage = useCallback(() => dispatch(loadDrivers(page)), [page]);

  const keyExtractor = useCallback((item: DriverType) => item.driverId, []);

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<DriverType>) => (
      <View style={styles.driverContainer}>
        <Text
          style={
            styles.driverText
          }>{`${item.givenName} ${item.familyName}`}</Text>
        <View style={styles.driverActionButtonContainer}>
          <Button
            color={colors.button}
            onPress={() => onDriverRacesPress(item.driverId)}
            title="Race"
          />
          <Button
            color={colors.button}
            onPress={() => onDriverInfoPress(item)}
            title="Info"
          />
        </View>
      </View>
    ),
    [],
  );

  const onNextPagePress = useCallback(() => {
    setPage(oldValue => oldValue + 1);
    updatePage();
  }, [page]);

  const onPrevPagePress = useCallback(() => {
    setPage(oldValue => oldValue - 1);
    updatePage();
  }, [page]);

  useEffect(() => {
    updatePage();
  }, []);

  return (
    <SafeAreaView style={styles.body}>
      {driversLoading ? (
        <ActivityIndicator
          size="large"
          color={colors.loader}
          style={styles.activityIndicator}
        />
      ) : (
        <>
          <FlatList
            data={drivers}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.buttonContainer}>
            {drivers.length === 10 && (
              <Button
                title="next"
                onPress={onNextPagePress}
                color={colors.button}
              />
            )}
            {page > 1 && (
              <Button
                title="prev"
                onPress={onPrevPagePress}
                color={colors.button}
              />
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 10,
    // alignItems: 'center',
  },
  driverContainer: {
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
  },
  driverActionButtonContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  driverActionButton: {
    width: 80,
    marginHorizontal: 10,
    color: colors.button,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: colors.button,
    borderRadius: 6,
  },
  buttonContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    padding: 20,
  },
  activityIndicator: {
    marginTop: height / 2.5,
  },
});

export default DriverSelectScreen;
