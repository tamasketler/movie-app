import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MovieDataService } from '../../shared/services/movie-data.service';
import { shareReplay } from 'rxjs';
import { LoadingComponent } from '../../shared/components/loading.component';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss'
})
export class MovieDetails {
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _router: Router = inject(Router);
  private readonly _movieDataService = inject(MovieDataService);

  movieId = -1;

  movieDetails$ = this._movieDataService.getMovieDetails(Number(this._route.snapshot.params['id'])).pipe(shareReplay(1));
  apiConfig$ = this._movieDataService.getApiConfiguration();

  constructor() {
    this.movieId = Number(this._route.snapshot.params['id']);
    if (this.movieId < 0) {
      this._router.navigateByUrl('/home');
    }
  }
}
