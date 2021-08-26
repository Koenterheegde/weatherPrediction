import { Injectable } from '@angular/core';
import {LocationData} from "../Models/location-data";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {SevenDayForecast} from "../Models/seven-day-forecast";
import {HourlyForecast} from "../Models/hourly-forecast";

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor(public http: HttpClient) { }

  getData(inputLocation: string) : Observable<LocationData>{
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${inputLocation}&units=metric&appid=2a47a80c223baab80003883c31f35729`;
    return this.http.get(url).pipe(map( (response: any) => ({
      lon: response.coord.lon,
      lat: response.coord.lat,
    })))
    }

  get7DayForecast(lat:number, lon:number) : Observable<SevenDayForecast>{
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=currently,minutely,alerts&appid=1f21dc8e23fa9949d7026c5014f3a9d1`
    return this.http.get(url).pipe(map((response: any) =>({
      daily_time0: response.daily[0].dt,
      daily_time1: response.daily[1].dt,
      daily_time2: response.daily[2].dt,
      daily_time3: response.daily[3].dt,
      daily_temp0 : response.daily[0].temp.day,
      daily_temp1 : response.daily[1].temp.day,
      daily_temp2 : response.daily[2].temp.day,
      daily_temp3 : response.daily[3].temp.day,
      day0 : new Date(response.daily[0].dt*1000).toLocaleDateString("en-US", { weekday: 'long'}),
      date0: new Date(response.daily[0].dt*1000).toLocaleDateString("en-US", { day: 'numeric', month: 'numeric', year: 'numeric'}),
      day1 : new Date(response.daily[1].dt*1000).toLocaleDateString("en-US", { weekday: 'long'}),
      date1: new Date(response.daily[1].dt*1000).toLocaleDateString("en-US", { day: 'numeric', month: 'numeric', year: 'numeric'}),
      day2 : new Date(response.daily[2].dt*1000).toLocaleDateString("en-US", { weekday: 'long'}),
      date2: new Date(response.daily[2].dt*1000).toLocaleDateString("en-US", { day: 'numeric', month: 'numeric', year: 'numeric'}),
      day3 : new Date(response.daily[3].dt*1000).toLocaleDateString("en-US", { weekday: 'long'}),
      date3: new Date(response.daily[3].dt*1000).toLocaleDateString("en-US", { day: 'numeric', month: 'numeric', year: 'numeric'}),
      icon0: response.daily[0].weather[0].icon,
      icon1: response.daily[1].weather[0].icon,
      icon2: response.daily[2].weather[0].icon,
      icon3: response.daily[3].weather[0].icon,
      weather_description0: response.daily[0].weather[0].main,
      weather_description1: response.daily[1].weather[0].main,
      weather_description2: response.daily[2].weather[0].main,
      weather_description3: response.daily[3].weather[0].main,
      humidity0: response.daily[0].humidity,
      humidity1: response.daily[1].humidity,
      humidity2: response.daily[2].humidity,
      humidity3: response.daily[3].humidity,
      wind_speed0: response.daily[0].wind_speed,
      wind_speed1: response.daily[1].wind_speed,
      wind_speed2: response.daily[2].wind_speed,
      wind_speed3: response.daily[3].wind_speed
    })))

  }

  getHourlyForecast(lat:number, lon:number, i:number) : Observable<HourlyForecast>{
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=currently,minutely,daily,alerts&appid=1f21dc8e23fa9949d7026c5014f3a9d1`

    return this.http.get(url).pipe(map((response: any) =>({
      hour: response.hourly[i].dt,
      temperature: response.hourly[i].temp
    })))
  }

}
