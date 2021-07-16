import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GlobalConstants } from '../common/global-constants';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.scss']
})
export class SerieComponent implements OnInit {
  serieId: string = "";
  serie: any;
  errorMessage: string = "";
  loading: boolean = false;
  // globals
  baseUrl = GlobalConstants.baseUrl;
  timestamp = GlobalConstants.timestamp;
  apiKey = GlobalConstants.apiKey;
  hash = GlobalConstants.hash;

  constructor(private rutaActiva: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.serieId = this.rutaActiva.snapshot.params.slug
    this.getSerieById(this.serieId)
  }
  getSerieById(id: string) {
    this.loading = true;
    this.http.get<any>(`${this.baseUrl}/series/${id}?${this.timestamp}&${this.apiKey}&${this.hash}`).subscribe({
      next: data => {
        this.loading = false;
        this.serie = data.data.results[0];
        console.debug(data.data.results[0])
      },
      error: error => {
        this.loading = false;
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })
  }

}
