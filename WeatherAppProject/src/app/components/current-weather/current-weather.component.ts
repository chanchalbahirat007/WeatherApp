import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherDataModel } from 'src/app/models/weather-data-model';
import { LocaldatastorageService } from 'src/app/services/localdatastorage.service';
import { WeatherDataService } from 'src/app/services/weather-data.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  zip!: any;
  weatherDataList: Array<WeatherDataModel> = [];
  currentWeatherForm: FormGroup;

  constructor(private weatherDataService: WeatherDataService,
    private formBuilder: FormBuilder,
    private localDataStorageService: LocaldatastorageService) {
    this.currentWeatherForm = this.formBuilder.group({
      zip: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?!0{3})[0-9]{5}$'),
      ])
    })
  }

  ngOnInit(): void {
    this.loadLocationListFromStorage();
   }

  loadCurrentWeatherData() {
    this.weatherDataService.getCurrentWeatherDataByZip(this.currentWeatherForm.get('zip')?.value).subscribe(
      result => {
        this.renderCurrentWeatherData(result);
        this.currentWeatherForm.reset();
      },
      (error: any) => {
        alert('No data found for the zipcode, Please Enter a valid zipcode');
        this.currentWeatherForm.reset();
      }
    )
  }

  private renderCurrentWeatherData(result: any) {
    var weatherDataModel = new WeatherDataModel();
    weatherDataModel.link = 'forecast/' + this.currentWeatherForm.get('zip')?.value;
    weatherDataModel.cityZipCode = this.currentWeatherForm.get('zip')?.value;
    weatherDataModel.cityName = result.name;
    weatherDataModel.currentCondition = result.weather[0].main;
    weatherDataModel.description = result.weather[0].description;
    weatherDataModel.currentTemperature = result.main.temp;
    weatherDataModel.maxTemperature = result.main.temp_max;
    weatherDataModel.minTemperature = result.main.temp_min;
    weatherDataModel.icon = this.getWeatherConditionIcon(result.weather[0].main);
    this.localDataStorageService.setItem(this.currentWeatherForm.get('zip')?.value, weatherDataModel);
    this.loadLocationListFromStorage();
  }

  private loadLocationListFromStorage() {
    this.weatherDataList = [];
    var values = [],
      keys = Object.keys(localStorage),
      index = keys.length;
    while (index--) {
      let weatherDataJson: string = "" + localStorage.getItem(keys[index]);
      let weatherModel: WeatherDataModel = JSON.parse(weatherDataJson);
      this.weatherDataList.push(weatherModel);
      this.weatherDataList.reverse();
    }
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

  deleteWeatherDataItem(zipCode: any){
    this.localDataStorageService.removeItem(zipCode);
    this.loadLocationListFromStorage();
  }
}
