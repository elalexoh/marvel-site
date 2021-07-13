import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GlobalConstants } from '../common/global-constants';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.scss']
})
export class ComicComponent implements OnInit {

  comicId: string = "";
  comic: any;
  errorMessage: string = "";
  loading: boolean = false;
  // globals
  baseUrl = GlobalConstants.baseUrl;
  timestamp = GlobalConstants.timestamp;
  apiKey = GlobalConstants.apiKey;
  hash = GlobalConstants.hash;

  constructor(private rutaActiva: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.comicId = this.rutaActiva.snapshot.params.slug
    this.getComicById(this.comicId)
  }

  getComicById(id: string) {
    this.loading = true;
    this.http.get<any>(`${this.baseUrl}/comics/${id}?${this.timestamp}&${this.apiKey}&${this.hash}`).subscribe({
      next: data => {
        this.loading = false;
        this.comic = data.data.results[0];
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
