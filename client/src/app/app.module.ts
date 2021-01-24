import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PipelinesComponent } from './pipelines/pipelines.component';
import { ELBComponent } from './elb/elb.component';
import { TableComponent } from './table/table.component';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PipelinesComponent,
    ELBComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
