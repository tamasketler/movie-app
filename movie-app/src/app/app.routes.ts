import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MovieDetails } from './pages/movie-details/movie-details';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
        title: 'App',
    },
    {
        path: 'home',
        component: Home,
        title: 'Home page',
    },
    {
        path: 'details/:id',
        component: MovieDetails,
        title: 'Movie detail',
    }
];
