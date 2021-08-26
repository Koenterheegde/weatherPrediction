import { Component, OnInit } from '@angular/core';
import {LocationData} from "../Models/location-data";
import {SevenDayForecast} from "../Models/seven-day-forecast";
import {HttpClient} from "@angular/common/http";
import {WeatherServiceService} from "../Services/weather-service.service";


declare const L: any
@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {

  hidden: boolean = true;
  location!: string
  locationData = new LocationData();
  sevenDayForecast = new SevenDayForecast();

  constructor(public weatherService:WeatherServiceService, public http: HttpClient) { }

  ngOnInit(): void {
    if (!navigator.geolocation){
      console.log("location is not supported")
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords
      const latLong = [coords.latitude, coords.longitude]
      console.log(
        'lat: ${position.coords.latitude}, lon: ${position.coords.longitude}'
      );
      let mymap = L.map('map').setView(latLong, 13);

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia29lbnRlcmhlZWdkZSIsImEiOiJja3NpejZibWsxcGFhMzBvZjRlOXhkcWZoIn0.Bs552hPcijlBy1b2kDqfvw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
      }).addTo(mymap);

      let marker = L.marker(latLong).addTo(mymap);
    });
    this.watchPosition();
  }

  watchPosition(){
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition(position => {
      console.log(
        'lat: ${position.coords.latitude}, lon: ${position.coords.longitude}'
      );
      if (position.coords.latitude === desLat && position.coords.longitude === desLon){
        navigator.geolocation.clearWatch(id);
      }
    }, (err) => {
      console.log(err);
    }, {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    })
  }

  getCoordinates(){
    this.hidden = false
    this.location = (<HTMLInputElement>document.getElementById("locationInput")).value
    this.weatherService.getData(this.location).subscribe((data: LocationData) => {
      this.locationData = data;
      console.log(this.locationData.lat, this.locationData.lon)
      this.get7DayForecast(this.locationData.lat, this.locationData.lon)
    });
  }

  get7DayForecast(lat:number, lon:number){
    this.weatherService.get7DayForecast(lat, lon).subscribe((data: SevenDayForecast) =>{
      this.sevenDayForecast = data;
      // console.log(this.sevenDayForecast.daily_temp0)
      //this.sevenDayForecast.day0 = new Date(this.sevenDayForecast.daily_time0*1000).toLocaleDateString("en-US", { weekday: 'long'})
    });
  }

  }


