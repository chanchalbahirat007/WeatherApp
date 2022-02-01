import { TempDataModel } from "./temp-data-model";
import { WeatherModel } from "./weather-model";

export class ForecastWeatherModel {
    public weather!: Array<WeatherModel>;
    public dt_txt!: string;
    public main!: TempDataModel;
}

