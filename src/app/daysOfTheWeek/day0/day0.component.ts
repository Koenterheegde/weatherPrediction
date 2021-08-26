import {Component, Input, OnInit} from '@angular/core';
import {SevenDayForecast} from "../../Models/seven-day-forecast";
import {WeatherServiceService} from "../../Services/weather-service.service";
import {HourlyForecast} from "../../Models/hourly-forecast";


@Component({
  selector: 'app-day0',
  templateUrl: './day0.component.html',
  styleUrls: ['./day0.component.css']
})

export class Day0Component implements OnInit {
  public hourlyForecast!: HourlyForecast;

  listOfTimes: Array<string> = []
  listOfTemperatures: Array<number> = []

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  }

  public barChartLabels = this.listOfTimes
  public barChartType = 'bar'
  public barChartLegend = true;

  public barChartData = [
    {data: [1,2,3,4,5,6,7,8], label: 'Series A'},
    {data: [28,48,40,19,86,27,90], label: 'Series B'}
  ];

  constructor(public weatherService: WeatherServiceService) {
  }

  ngOnInit(): void {
    for (let i = 0; i < 5; i++) {
      this.weatherService.getHourlyForecast(52.2183, 6.8958, i).subscribe((data: HourlyForecast) => {
        this.hourlyForecast = data;
        this.listOfTimes.push(this.convertToTime(this.hourlyForecast.hour))
        this.listOfTemperatures.push(this.hourlyForecast.temperature)
        //this.sevenDayForecast.day0 = new Date(this.sevenDayForecast.daily_time0*1000).toLocaleDateString("en-US", { weekday: 'long'})
      });
    }

    console.log(this.listOfTimes)
    console.log(this.listOfTemperatures)
  }

  convertToTime(unix: number): string {
    return new Date(unix * 1000).toLocaleString("en-US", {hour: "2-digit", minute: "2-digit"})
  }


}
