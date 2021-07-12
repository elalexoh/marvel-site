import { filter } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'marvel-site';
  currentRoute: string = "";

  constructor(private router: Router) {
    console.log(router.url);

    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(res => this.currentRoute = res.url)
  }
}
