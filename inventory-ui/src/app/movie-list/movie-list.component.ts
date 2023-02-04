import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  data:any;

  constructor(private http: HttpClient){}

  ngOnInit(){
    // this.http.get('http://inventory-api-service:8081/movies')
    this.http.get('http://movies-api.com/movies')
    .subscribe((data: any) => {
      this.data = data
    })

    console.log(this.data);

  }

  addMovies() {
    this.movies.push(this.newMovie);
    this.newMovie = { title: '', director: '' };
  }
}
