import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  movies = [
    { title: 'Inception', director: 'Christopher Nolan' },
    { title: 'Kill Bill', director: 'Quentin Tarantino' },
    { title: 'The Godfather', director: 'Francis Ford Corpola' }
  ];
  newMovie = { title: '', director: '' };

  addMovies() {
    this.movies.push(this.newMovie);
    this.newMovie = { title: '', director: '' };
  }
}
