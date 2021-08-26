import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { Day0Component } from './daysOfTheWeek/day0/day0.component';
import { Day1Component } from './daysOfTheWeek/day1/day1.component';
import { Day2Component } from './daysOfTheWeek/day2/day2.component';
import { Day3Component } from './daysOfTheWeek/day3/day3.component';
import {ChartsModule} from "ng2-charts";

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    Day0Component,
    Day1Component,
    Day2Component,
    Day3Component
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
      ChartsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
