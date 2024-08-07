import { Handler } from 'aws-lambda';
import {
    EventBridgeClient,
    PutEventsCommand,
} from "@aws-sdk/client-eventbridge";

async function publishSampleEvent(
    source = "eventbridge.integration.test",
    detailType = "greeting",
    resources = [],
  ) {
    const client = new EventBridgeClient({});
  
    const response = await client.send(
      new PutEventsCommand({
        Entries: [
          {
            Detail: JSON.stringify({ greeting: "Hello there." }),
            DetailType: detailType,
            Resources: resources,
            Source: source,
          },
        ],
      }),
    );
  
    console.log("PutEvents response:");
    console.log(response);
    return response;
}

interface EventBridgeEvent {
    id: string;
    message: string;
}

export const handler: Handler<EventBridgeEvent> = async (event, context) => {
    console.log('EVENT: \n' + JSON.stringify(event, null, 2));
      
    await publishSampleEvent();

    return context.logStreamName;
};