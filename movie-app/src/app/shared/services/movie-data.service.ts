import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MovieDetailsModel, MovieModel, PopularMoviesResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class MovieData {
  private readonly http = inject(HttpClient);

  private readonly apiPath = 'https://api.themoviedb.org/3/';
  private readonly ACCESS_TOKEN = ''

  getMostPopularMovies(): Observable<MovieModel[]> {
    return this.http.get<PopularMoviesResponse>(this.apiPath + 'movie/popular', {
      headers: {
        'Authorization: Bearer': this.ACCESS_TOKEN,
      }
    }).pipe(
      map(model => model.results)
    );
  }

  getMovieDetails(id: string): Observable<MovieDetailsModel> {
    return this.http.get<MovieDetailsModel>(`${this.apiPath}/movie/${id}`,
      {
        headers: {
          'Authorization: Bearer': this.ACCESS_TOKEN,
        }
      }
    );
  }

  fetchSearchMovies(query: string): Observable<MovieModel[]> {
    return this.http.get<PopularMoviesResponse>(this.apiPath + '/search/movie', {
      params: {
        query
      },
      headers: {
        'Authorization: Bearer': this.ACCESS_TOKEN,
      }
    }).pipe(
      map(model => model.results)
    );
  }
}
