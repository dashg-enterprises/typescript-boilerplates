import { IExampleDto } from "../contracts/ExampleDto";

export class Example implements IExampleDto {
    id: number;
    name: string;
    quantity?: number;
}