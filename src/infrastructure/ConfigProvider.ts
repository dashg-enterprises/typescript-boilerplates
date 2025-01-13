import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES.js";
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";

export interface IConfigProvider {
    parameterByName(name: string): Promise<string>;   
    secretByName(name: string): Promise<string>;   
}

@injectable()
export class ConfigProvider implements IConfigProvider {
    private readonly client: SSMClient;

    constructor(@inject(TYPES.SSMClient) client: SSMClient) {
        this.client = client;
    }

    async parameterByName(name: string): Promise<string> {          
        const command = new GetParameterCommand({
            Name: name,
            WithDecryption: false,
            });
        
        const response = await this.client.send(command);
        
        return response.Parameter.Value;
    }

    async secretByName(name: string): Promise<string> {          
        const command = new GetParameterCommand({
            Name: name,
            WithDecryption: true,
          });
      
        const response = await this.client.send(command);
    
        return response.Parameter.Value;
      }
}