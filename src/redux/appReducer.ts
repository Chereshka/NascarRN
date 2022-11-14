import {tableApi} from '../api/http/data.servise';
import {
  SeasonListApiType,
  SeasonType,
  DriverListApiType,
  DriverType,
  RaceType,
} from '../types/types';

import {BaseThunkType} from './store';

const SET_DRIVERS = 'SET_DRIVERS';
const SET_DRIVERS_LOADING = 'SET_DRIVERS_LOADING';

const SET_RACES = 'SET_RACES';
const SET_RACES_LOADING = 'SET_RACES_LOADING';

const SET_DRIVER = 'SET_DRIVER';
const SET_DRIVER_LOADING = 'SET_DRIVER_LOADING';

export type AppState = {
  drivers: DriverType[];
  driversLoading: boolean;
  races: RaceType[];
  racesLoading: boolean;
  driver: DriverType | null ;
  driverLoading: boolean;
};

let initialState: AppState = {
  drivers: [] as DriverType[],
  driversLoading: true,
  races: [] as RaceType[],
  racesLoading: true,
  driver: null,
  driverLoading: true,
};

const appReducer = (state = initialState, action: ActionsTypes): AppState => {
  switch (action.type) {
    case SET_DRIVERS:
      return {...state, drivers: action.payload};
    case SET_DRIVERS_LOADING:
      return {...state, driversLoading: action.payload};
    case SET_RACES:
      return {...state, races: action.payload};
    case SET_RACES_LOADING:
      return {...state, racesLoading: action.payload};
    case SET_DRIVER:
      return {...state, driver: action.payload};
    case SET_DRIVER_LOADING:
      return {...state, driverLoading: action.payload};
    default:
      return state;
  }
};

export const actions = {
  setDrivers: (payload: DriverType[]) =>
    ({type: SET_DRIVERS, payload} as const),
  setDriversLoading: (payload: boolean) =>
    ({type: SET_DRIVERS_LOADING, payload} as const),
  setRaces: (payload: RaceType[]) => ({type: SET_RACES, payload} as const),
  setRacesLoading: (payload: boolean) =>
    ({type: SET_RACES_LOADING, payload} as const),
  setDriver: (payload: DriverType) => ({type: SET_DRIVER, payload} as const),
  setDriverLoading: (payload: boolean) =>
    ({type: SET_DRIVER_LOADING, payload} as const),
};

type SetDriversActionType = {
  type: typeof SET_DRIVERS;
  payload: DriverType[];
};

type SetDriversLoadingActionType = {
  type: typeof SET_DRIVERS_LOADING;
  payload: boolean;
};

export const loadDrivers =
  (page: number): ThunkType =>
  async dispatch => {
    dispatch(actions.setDriversLoading(true));
    let res = await tableApi.driverList(page);
    dispatch(
      actions.setDrivers(res?.MRData ? res?.MRData.DriverTable.Drivers : []),
    );
    dispatch(actions.setDriversLoading(false));
  };

type SetRacesActionType = {
  type: typeof SET_RACES;
  payload: RaceType[];
};

type SetRacesLoadingActionType = {
  type: typeof SET_RACES_LOADING;
  payload: boolean;
};

export const loadRaces =
  (driverId: string): ThunkType =>
  async dispatch => {
    dispatch(actions.setRacesLoading(true));
    let res = await tableApi.driverRaces(driverId);
    dispatch(actions.setRaces(res?.MRData ? res?.MRData.RaceTable.Races : []));
    dispatch(actions.setRacesLoading(false));
  };

type SetDriverActionType = {
  type: typeof SET_DRIVER;
  payload: DriverType;
};

export const setDriverInfo =
  (driver: DriverType): ThunkType =>
  async dispatch => {
    dispatch(actions.setDriver(driver));
  };

type SetDriverLoadingActionType = {
  type: typeof SET_DRIVER_LOADING;
  payload: boolean;
};

export const loadDriver = () => {};

type ActionsTypes =
  | SetDriversActionType
  | SetDriversLoadingActionType
  | SetRacesActionType
  | SetRacesLoadingActionType
  | SetDriverActionType
  | SetDriverLoadingActionType;

export type InitialStateType = typeof initialState;
// type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>;

export default appReducer;
