import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DriverScreen from '../screens/DriverScreen';
import DriverSelectScreen from '../screens/DriverSelectScreen';
import RacesScreen from '../screens/RacesScreen';

const NAVIGATOR_OPTIONS = {
  headerBackTitle: 'Back',
};

const DRIVERS_PAGE_OPTION = {
  title: 'Select driver',
};

const DRIVER_PAGE_OPTION = {
  title: 'Driver info',
};

const RACES_PAGE_OPTION = {
  title: 'Reces',
};

const MainAppStack = () => {
  const {Navigator, Screen} = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Navigator screenOptions={NAVIGATOR_OPTIONS}>
        {/* <Screen
          name="Season"
          component={SeasonsScreen}
          options={SEASONS_PAGE_OPTION}
        /> */}
        <Screen
          name="DriverSelectScreen"
          component={DriverSelectScreen}
          options={DRIVERS_PAGE_OPTION}
        />
        <Screen
          name="DriverScreen"
          component={DriverScreen}
          options={DRIVER_PAGE_OPTION}
        />
        <Screen
          name="RacesScreen"
          component={RacesScreen}
          options={RACES_PAGE_OPTION}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default MainAppStack;
