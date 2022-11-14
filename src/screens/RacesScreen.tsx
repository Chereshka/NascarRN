import React, {useCallback} from 'react';
import {
  View,
  Text,
  ListRenderItemInfo,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import uuid from 'react-uuid';
import {AppStateType} from '../redux/store';
import {RaceType} from '../types/types';
import {colors} from '../api/staticData/color';
const {height} = Dimensions.get('screen');
const RacesScreen = () => {
  const {races, racesLoading} = useSelector((state: AppStateType) => state.app);

  const keyExtractor = useCallback(
    (item: RaceType) => item.raceName + item.season,
    [],
  );

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<RaceType>) => (
      <View style={styles.raceContainer}>
        <Text style={styles.raceText}>{`Season:   ${item.season}`}</Text>
        <Text style={styles.raceText}>{`Name:     ${item.raceName}`}</Text>
        {item.Results.map(result => (
          <View key={uuid().toString()}>
            <Text
              style={styles.raceText}>{`Position: ${result.position}`}</Text>
            <Text style={styles.raceText}>{`Status:   ${result.status}`}</Text>
          </View>
        ))}
      </View>
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.body}>
      {racesLoading ? (
        <ActivityIndicator
          size="large"
          color={colors.loader}
          style={styles.activityIndicator}
        />
      ) : (
        <FlatList
          data={races}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
        />
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
  raceContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginVertical: 10,
  },
  raceText: {
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

export default RacesScreen;
