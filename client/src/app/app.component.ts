import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AwsStatusResponse} from './aws-status-response.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dashboard';
  array: any;


  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getData();

    setInterval(() => {
      this.getData();
    }, 20000);
  }

  async getData() {
    this.http.get('/api/aws').subscribe((res: AwsStatusResponse) => {
       this.array = res;
       console.log('HKW', this.array);
     });
  }
}
