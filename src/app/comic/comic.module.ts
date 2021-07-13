import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComicRoutingModule } from './comic-routing.module';
import { ComicComponent } from './comic.component';


@NgModule({
  declarations: [
    ComicComponent
  ],
  imports: [
    CommonModule,
    ComicRoutingModule
  ]
})
export class ComicModule { }
