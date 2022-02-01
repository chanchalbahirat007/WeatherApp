import { CityModel } from "./city-model";
import { ForecastWeatherModel } from "./forecast-weather-model";

export class ForecastDataModel {
    public cod!: string;
    public message!: string;
    public cnt!: number;
    public list!: Array<ForecastWeatherModel>;
    public city! : CityModel;
}