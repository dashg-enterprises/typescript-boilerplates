import { BaseHttpController, controller, httpGet, httpPost } from "inversify-express-utils";
import { Request } from "express";
import { TYPES } from "../TYPES.js";
import { inject } from "inversify";
import { WeatherClient } from "../infrastructure/weather/WeatherClient.js";

@controller("/weather")
export default class WeatherController extends BaseHttpController {
    private readonly client: WeatherClient;

    constructor(@inject(TYPES.IWeatherClient) client: WeatherClient) {
        super();
        this.client = client;
    }

    @httpGet("/current")
    private async getCurrent(request: Request) {
        const {lat, lon} = request.query;
        if (lat === undefined || lon === undefined) return this.badRequest("Both lat and lon are required to get the current weather.");
        const latitude = +lat;
        const longitude = +lon;
        if (isNaN(latitude) || isNaN(longitude)) return this.badRequest("Both lat and lon must be numbers to get the current weather.");

        try {
            const weather = await this.client.currentWeather(latitude, longitude);
            return this.ok(weather);
        } catch(e) {
            return this.internalServerError(e);
        }
    }
}