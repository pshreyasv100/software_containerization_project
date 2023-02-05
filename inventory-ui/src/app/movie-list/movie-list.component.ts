import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {

  // movies = [
  //   { title: 'Inception', director: 'Christopher Nolan' },
  //   { title: 'Kill Bill', director: 'Quentin Tarantino' },
  //   { title: 'The Godfather', director: 'Francis Ford Corpola' }
  // ];

  movies: any[] =[];


  newMovie = { title: '', genre: '' };

  data:any;

 constructor(private http: HttpClient){
    this.http.get('http://movies.com/movies')
    .subscribe((data: any) => {
      data.forEach((item: { genre: any; title: any; }) => {              
        console.log(item.genre, item.title);
        this.movies.push(item)
    });
    })
  }

  addMovies() {
    this.movies.push(this.newMovie);
    console.log(this.http.post('http://movies.com/movies/add', this.newMovie));

    this.newMovie = { title: '', genre: '' };
  }
}
