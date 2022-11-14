import axios from 'axios';
import {AxiosInstance} from 'axios';
import {
  SeasonListApiType,
  DriverListApiType,
  RaceListApiType,
} from '../../types/types';
import {url} from '../staticData/url';

export const http = axios.create({
  baseURL: url.link,
  //   headers: {
  //     'Content-type': 'application/json',
  //   },
});

export const tableApi = {
  seasonList() {
    console.log('try load ', url.link + '/api/f1/seasons.json');
    try {
      return http
        .get<SeasonListApiType>('/api/f1/seasons.json')
        .then(res => res.data);
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  },
  driverList(page: number, limit: number = 10) {
    try {
      return http
        .get<DriverListApiType>(
          `/api/f1/drivers.json?limit=${limit}&offset=${page * limit}`,
        )
        .then(res => res.data);
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  },
  driverRaces(driverId: string) {
    try {
      return http
        .get<RaceListApiType>(
          `http://ergast.com/api/f1/drivers/${driverId}/results.json`,
        )
        .then(res => res.data);
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  },
};
