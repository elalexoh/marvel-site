import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';


@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit {
  comics: any;
  errorMessage: string = "";
  loading: boolean = false;
  baseUrl = GlobalConstants.baseUrl;
  timestamp = GlobalConstants.timestamp;
  apiKey = GlobalConstants.apiKey;
  hash = GlobalConstants.hash;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loading = true;
    this.http.get<any>(`${this.baseUrl}/comics?${this.timestamp}&${this.apiKey}&${this.hash}`).subscribe({
      next: data => {
        this.loading = false;
        this.comics = data.data.results;
      },
      error: error => {
        this.loading = false;
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })
  }

}
