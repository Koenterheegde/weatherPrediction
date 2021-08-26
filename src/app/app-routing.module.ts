import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainScreenComponent} from "./main-screen/main-screen.component";
import {Day0Component} from "./daysOfTheWeek/day0/day0.component";
import {Day2Component} from "./daysOfTheWeek/day2/day2.component";
import {Day1Component} from "./daysOfTheWeek/day1/day1.component";
import {Day3Component} from "./daysOfTheWeek/day3/day3.component";


const routes: Routes = [
  { path: '', component: MainScreenComponent },
  { path: 'day0', component: Day0Component},
  { path: 'day1', component: Day1Component},
  { path: 'day2', component: Day2Component},
  { path: 'day3', component: Day3Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
