import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForecastDataModel } from 'src/app/models/forecast-data-model';
import { WeatherDataService } from 'src/app/services/weather-data.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.css']
})
export class ForecastWeatherComponent implements OnInit {

  zipcode: any;
  forecastDataModel: ForecastDataModel = new ForecastDataModel();

  constructor(public router: ActivatedRoute, private weatherDataService: WeatherDataService, private location: Location) { }

  ngOnInit(): void {
    this.initPage();
  }

  initPage() {
    this.router.paramMap.subscribe(params => {
      this.zipcode = params.get('id');
      console.log(this.zipcode)
      if (this.zipcode != '' && this.zipcode != null) {
        this.getWeatherForecastData(this.zipcode);
      }
    });
  }

  getWeatherForecastData(zipcode: any): void {
    this.weatherDataService.getWeatherForecastByZip(zipcode).subscribe(
      result => {
        this.forecastDataModel = result;
        this.forecastDataModel.list.forEach(element =>
          element.weather[0].icon = this.getWeatherConditionIcon(element.weather[0].main)
        )
      }
    )
  }

  private getWeatherConditionIcon(main: any): string {
    if (main == "Clouds")
      return "../../../assets/icons/clouds.png"
    else if (main == "Fog")
      return "../../../assets/icons/rain.png"
    else if (main == "Clear")
      return "../../../assets/icons/sun.png"
    else if (main == "clody")
      return "../../../assets/icons/snow.png"
    else
      return "../../../assets/icons/rain.png"
  }

  back(): void {
    this.location.back();
  }

}
