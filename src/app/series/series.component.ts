import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {
  series: any;
  errorMessage: string = "";
  loading: boolean = false;
  baseUrl = GlobalConstants.baseUrl;
  timestamp = GlobalConstants.timestamp;
  apiKey = GlobalConstants.apiKey;
  hash = GlobalConstants.hash;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loading = true;
    this.http.get<any>(`${this.baseUrl}/series?${this.timestamp}&${this.apiKey}&${this.hash}`).subscribe({
      next: data => {
        this.loading = false;
        this.series = data.data.results;
      },
      error: error => {
        this.loading = false;
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })
  }

}
