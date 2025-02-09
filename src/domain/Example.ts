import { IExampleDto } from "../contracts/ExampleDto.js";

export class Example implements IExampleDto {
    id: number;
    name: string;
    quantity?: number;
}