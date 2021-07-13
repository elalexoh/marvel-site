import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ComicsRoutingModule } from './comics-routing.module';
import { ComicsComponent } from './comics.component';


@NgModule({
  declarations: [
    ComicsComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ComicsRoutingModule
  ]
})
export class ComicsModule { }
