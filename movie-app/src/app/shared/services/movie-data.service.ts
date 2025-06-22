import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { ApiConfig, MovieDetailsModel, MovieModel, PopularMoviesResponse } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class MovieDataService {
  private readonly http = inject(HttpClient);

  private readonly apiPath = 'https://api.themoviedb.org/3/';
  private readonly ACCESS_TOKEN = ''

  getApiConfiguration() {
    return this.http.get<ApiConfig>(this.apiPath + '/configuration', {
      headers: {
        'Authorization': this.ACCESS_TOKEN,
      }
    }).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY
      })
    )
  }

  getMostPopularMovies(): Observable<MovieModel[]> {
    return this.http.get<PopularMoviesResponse>(this.apiPath + 'movie/popular', {
      headers: {
        'Authorization': this.ACCESS_TOKEN,
      }
    }).pipe(
      map(model => model.results),
      catchError(error => {
        console.log(error);
        return EMPTY
      })
    );
  }

  getMovieDetails(id: number): Observable<MovieDetailsModel> {
    return this.http.get<MovieDetailsModel>(`${this.apiPath}movie/${id}`,
      {
        params: {
          id
        },
        headers: {
          'Authorization': this.ACCESS_TOKEN,
        }
      }
    ).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY
      })
    );
  }

  fetchSearchMovies(query: string): Observable<MovieModel[]> {
    return this.http.get<PopularMoviesResponse>(this.apiPath + '/search/movie', {
      params: {
        query
      },
      headers: {
        'Authorization': this.ACCESS_TOKEN,
      }
    }).pipe(
      map(model => model.results),
      catchError(error => {
        console.log(error);
        return EMPTY
      })
    );
  }
}
