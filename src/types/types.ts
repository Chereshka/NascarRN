export type SeasonListApiType = {
  MRData: {
    series: string;
    SeasonTable: {
      Seasons: SeasonType[];
    };
  };
};

export type SeasonType = {
  season: string;
  url: string;
};

export type DriverListApiType = {
  MRData: {
    series: string;
    DriverTable: {
      Drivers: DriverType[];
    };
  };
};

export type DriverType = {
  driverId: string;
  permanentNumber: string;
  familyName: string;
  givenName: string;
  url: string;
};

export type RaceListApiType = {
  MRData: {
    series: string;
    RaceTable: {
      Races: RaceType[];
    };
  };
};

export type RaceType = {
  season: string;
  raceName: string;
  Results: RaceResultType[];
};

export type RaceResultType = {
  position: string;
  status: string;
  points: string;
};

export const TableType = {};
