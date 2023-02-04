import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movie-inventory-app';

  data:any;

  constructor(private http: HttpClient){
  }

  ngOnInit(){
    this.http.get('http://inventory-api-service:8081/movies')
    .subscribe((data: any) => {
      this.data = data;
    })

    console.log(this.data);


  }


}
