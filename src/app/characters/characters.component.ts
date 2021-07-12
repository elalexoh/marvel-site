import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  characters: any;
  errorMessage: string = "";
  loading: boolean = false;
  baseUrl = GlobalConstants.baseUrl;
  timestamp = GlobalConstants.timestamp;
  apiKey = GlobalConstants.apiKey;
  hash = GlobalConstants.hash;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loading = true;
    this.http.get<any>(`${this.baseUrl}/characters?${this.timestamp}&${this.apiKey}&${this.hash}`).subscribe({
      next: data => {
        this.loading = false;
        this.characters = data.data.results;
      },
      error: error => {
        this.loading = false;
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })
  }

}
