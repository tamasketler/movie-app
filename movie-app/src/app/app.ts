import { Component, inject } from '@angular/core';
import { MovieDataService } from './shared/services/movie-data.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Movie-App';

}
