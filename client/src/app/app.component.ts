import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  array = {};


  constructor(private http: HttpClient) {
    this.array = this.getData();
  }


  async getData() {
    return this.http.get('http://localhost:3000/api/aws/').subscribe();
  }
}
