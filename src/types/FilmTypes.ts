export interface Film {
  filmId: number;
  nameRu: string;
  posterUrl: string;
  rating: string;
  year: string;
  genres: FilmGenres[];
  countries: FilmCountry[];
  ratingAgeLimits: string;
}

export interface FilmCountry {
  country: string;
}

export interface FilmGenres {
  genre: string;
}

export interface IFilmCard extends FilmInfo {
  onPress: (filmId: number) => void;
}
export interface IFilmInCard extends FilmInfo {}

export interface IFilmAwards {
  year: number;
  name: string;
  imageUrl: string;
  nominationName: string;
  persons: IPersons[];
}
export interface IPersons extends IFilmAwards {
  nameRu: string;
  posterUrl: posterUrl;
}
export interface IFilmStill {
  imageUrl: imageUrl;
}

export interface FilmInfo extends Film {
  description: string;
  shortDescription: string;
  webUrl: string;
  nameOriginal: string;
  nameEn: string;
  ratingKinopoisk?: string;
}
export interface IFilmFacts {
  text: string;
  type: string;
  spoiler: boolean;
  check: boolean;
}

export interface IFilmStaff {
  description: string;
  nameRu: string;
  posterUrl: string;
  professionText: string;
  staffId: number;
}

export interface IStaffInfo extends IFilmStaff {
  age: number;
  hasAwards: number;
  growth: number;
  birthday: string;
  birthplace: string;
  death: string;
  nameEn: string;
  profession: string;
  sex: string;
  facts: StaffFacts[];
  films: StaffFilms[];
}
export interface StaffFacts {}
export interface StaffFilms extends FilmInfo {
  professionKey: string;
}
