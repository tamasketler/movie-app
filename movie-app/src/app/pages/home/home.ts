import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, shareReplay, Subject, takeUntil, tap } from 'rxjs';
import { MovieModel } from '../../shared/models/models';
import { MovieDataService } from '../../shared/services/movie-data.service';
import { LoadingComponent } from '../../shared/components/loading.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, LoadingComponent, RouterModule],
  providers: [MovieDataService],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnDestroy {
  private readonly _movieDataService = inject(MovieDataService);

  private _searchMovies$ = new BehaviorSubject<MovieModel[]>([]);
  private _sub = new Subject()

  searchValue = signal('');

  apiConfig$ = this._movieDataService.getApiConfiguration();
  searchMovies$ = this._searchMovies$.asObservable();
  popularMovies$ = this._movieDataService.getMostPopularMovies().pipe(shareReplay(1));

  onTriggerSearch(value: string) {
    this._movieDataService.fetchSearchMovies(value).pipe(
      takeUntil(this._sub),
      debounceTime(300),
      tap(movies => this._searchMovies$.next(movies))
    ).subscribe()
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
    this._sub.complete();
  }
}
