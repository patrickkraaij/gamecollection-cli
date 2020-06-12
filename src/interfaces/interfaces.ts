export interface inquirerGameList {
  name: string;
  value: number | string;
}

export interface gcGame {
  _id?: any;
  id: any;
  // apiId?: any;
  title: string;
  platform?: number | string | null;
  releaseDate?: string | null;
  overview?: string | null;
  last_updated?: string | null;
  rating?: string | null;
  developer?: string[] | null;
  publisher?: string[] | null;
  players?: number | null;
  coop?: string | null;
  similar?: string[] | null;
  genres?: string[] | null;
  youtube?: string | null;
  images?: {
    boxart?: any | null;
    size?: any | null;
  }
}

export interface apiInterface {
  searchGame: Function;
  getGameInformation: Function;
  defaultApi: string;
}
