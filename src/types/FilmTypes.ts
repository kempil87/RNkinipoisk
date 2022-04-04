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

export interface FilmInfo extends Film {
  description: string;
  shortDescription: string;
  webUrl: string;
  nameOriginal: string;
  ratingKinopoisk?: string;
}
