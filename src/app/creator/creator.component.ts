import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GlobalConstants } from '../common/global-constants';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent implements OnInit {
  creatorId: string = "";
  creator: any;
  errorMessage: string = "";
  loading: boolean = false;
  // globals
  baseUrl = GlobalConstants.baseUrl;
  timestamp = GlobalConstants.timestamp;
  apiKey = GlobalConstants.apiKey;
  hash = GlobalConstants.hash;

  constructor(private rutaActiva: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.creatorId = this.rutaActiva.snapshot.params.slug
    this.getCreatorById(this.creatorId)
  }

  getCreatorById(id: string) {
    this.loading = true;
    this.http.get<any>(`${this.baseUrl}/creators/${id}?${this.timestamp}&${this.apiKey}&${this.hash}`).subscribe({
      next: data => {
        this.loading = false;
        this.creator = data.data.results[0];
        console.debug(data.data.results[0].comics)
      },
      error: error => {
        this.loading = false;
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })
  }
}
