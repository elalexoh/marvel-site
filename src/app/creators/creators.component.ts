import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';

@Component({
  selector: 'app-creators',
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.scss']
})
export class CreatorsComponent implements OnInit {
  creators: any;
  errorMessage: string = "";
  loading: boolean = false;
  baseUrl = GlobalConstants.baseUrl;
  timestamp = GlobalConstants.timestamp;
  apiKey = GlobalConstants.apiKey;
  hash = GlobalConstants.hash;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loading = true;
    this.http.get<any>(`${this.baseUrl}/creators?${this.timestamp}&${this.apiKey}&${this.hash}`).subscribe({
      next: data => {
        this.loading = false;
        this.creators = data.data.results;
      },
      error: error => {
        this.loading = false;
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })
  }

}
