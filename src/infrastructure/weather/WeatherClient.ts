import { inject, injectable } from "inversify";
import { TYPES } from "../../TYPES.js";
import { Axios, AxiosStatic } from "axios";
import { CurrentWeatherResponse } from "./WeatherResponse.js";
import { IConfigProvider, PLATFORM_TYPES } from "@dashg-enterprises/ddd-platform";

export interface IWeatherClient {
    currentWeather(lat: number, lon: number): Promise<CurrentWeatherResponse>;   
}

@injectable()
export class WeatherClient implements IWeatherClient {
    private readonly axios: AxiosStatic;
    private readonly version: string = "3.0"; 
    private readonly baseUrl: string = `https://api.openweathermap.org/data/${this.version}`;
    private readonly configProvider: IConfigProvider;
    private apiKey: string;

    constructor(
        @inject(TYPES.Axios) axios: AxiosStatic, 
        @inject(PLATFORM_TYPES.IConfigProvider) configProvider: IConfigProvider
    ) {
        this.axios = axios;
        this.configProvider = configProvider;
    }

    async currentWeather(lat: number, lon: number): Promise<CurrentWeatherResponse> {          
        try {
            this.apiKey = this.apiKey ?? await this.configProvider.secretByName("WEATHER_API_KEY");
            console.log(this.apiKey);
            const requestUrl = `${this.baseUrl}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${this.apiKey}`;
            console.log(requestUrl);
            const response = await this.axios.get<CurrentWeatherResponse>(requestUrl);
            
            return response.data;
        } catch(e) {
            console.error(e)
            throw e;
        }
    }
}