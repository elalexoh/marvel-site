import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';


@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit {
  querySearch: string = "";
  comics: any;
  filteredComics: any;
  errorMessage: string = "";
  loading: boolean = false;
  // globals
  baseUrl = GlobalConstants.baseUrl;
  timestamp = GlobalConstants.timestamp;
  apiKey = GlobalConstants.apiKey;
  hash = GlobalConstants.hash;
  constructor(private http: HttpClient) { }

  async ngOnInit() {
    await this.getComicList()
  }

  getComicList() {
    this.loading = true;
    this.http.get<any>(`${this.baseUrl}/comics?${this.timestamp}&${this.apiKey}&${this.hash}`).subscribe({
      next: data => {
        this.loading = false;
        this.comics = data.data.results;
        this.filteredComics = data.data.results;
      },
      error: error => {
        this.loading = false;
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })
  }
  onKey() {
    // const filteredComics = this.comics.filter((comic: any) => comic.title.startsWith(this.querySearch))
    const searchResult = this.comics.filter((comic: any) => comic.title.toLowerCase().indexOf(this.querySearch) > -1);
    this.filteredComics = searchResult
  }
  sortComicsByPrice(sortType: string) {
    if (sortType === 'asc') {
      this.comics.sort((x: any, y: any) => x.prices[0].price - y.prices[0].price);
      this.filteredComics.sort((x: any, y: any) => x.prices[0].price - y.prices[0].price);
    } else if (sortType === 'desc') {
      this.comics.sort((x: any, y: any) => y.prices[0].price - x.prices[0].price);
      this.filteredComics.sort((x: any, y: any) => y.prices[0].price - x.prices[0].price);
    }

  }
  sortComicsByTitle(sortType: string) {
    if (sortType === 'asc') {
      this.comics.sort((x: any, y: any) => {
        let a = x.title.toUpperCase(),
          b = y.title.toUpperCase();
        return a == b ? 0 : a > b ? 1 : -1;
      });
      this.filteredComics.sort((x: any, y: any) => {
        let a = x.title.toUpperCase(),
          b = y.title.toUpperCase();
        return a == b ? 0 : a > b ? 1 : -1;
      });
    } else if (sortType === 'desc') {
      this.comics.sort((x: any, y: any) => {
        let a = x.title.toUpperCase(),
          b = y.title.toUpperCase();
        return a == b ? 0 : b > a ? 1 : -1;
      });
      this.filteredComics.sort((x: any, y: any) => {
        let a = x.title.toUpperCase(),
          b = y.title.toUpperCase();
        return a == b ? 0 : b > a ? 1 : -1;
      });
    }
  }

}
