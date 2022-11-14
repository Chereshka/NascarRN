import React, {useCallback, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {SeasonType} from '../types/types';
import {laodSeasons, laodSeasonDrivers} from '../redux/appReducer';
import { useNavigation } from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../redux/store';
const SeasonSelectScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const seasons = useSelector((state: AppStateType) => state.app.seasons);

  const onSeasonPressed = useCallback((item: SeasonType) => {
    navigation.navigate('DriverSelectScreen')
    dispatch(laodSeasonDrivers(item.season))
    console.log(JSON.stringify(item));
  }, []);

  const keyExtractor = useCallback((item: SeasonType) => item.season, []);

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<SeasonType>) => (
      <TouchableOpacity
        style={styles.seasonContainer}
        onPress={() => onSeasonPressed(item)}>
        <Text style={styles.seasonText}>{item.season}</Text>
      </TouchableOpacity>
    ),
    [],
  );

  useEffect(() => {
    dispatch(laodSeasons());
  }, []);

  return (
    <SafeAreaView style={styles.body}>
      <FlatList
        data={seasons}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 10,
  },
  seasonContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    marginVertical: 10,
  },
  seasonText: {
    fontWeight: '500',
    fontSize: 17,
  },
});

export default SeasonSelectScreen;
