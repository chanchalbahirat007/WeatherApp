import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AppSettings } from '../common/app-settings';

@Injectable({
  providedIn: 'root'
})

export class WeatherDataService {

  constructor(private http: HttpClient) { }
  
  getCurrentWeatherDataByZip(zipCode : any): Observable<any>{
    var url = AppSettings.API_ENDPOINT + "weather?zip=" + zipCode + ",us"+ AppSettings.APP_ID;
    return this.http.get(url);
  }

  getWeatherForecastByZip(zipCode: any): Observable<any> {
    let url = AppSettings.API_ENDPOINT + "forecast?zip=" + zipCode + ",us&cnt=5"+ AppSettings.APP_ID;
    console.log("URL " + url);
    return this.http.get(url);
  }

}
