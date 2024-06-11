import {
    SecretsManagerClient,
    GetSecretValueCommand,
    GetSecretValueCommandOutput,
    GetSecretValueCommandInput
} from "@aws-sdk/client-secrets-manager";

export async function getDbDetails() {

    if (process.env.NODE_ENV === "local" || process.env.DBPASSWORD) {
        const details = {
            username: process.env.DBUSERNAME,
            password: process.env.DBPASSWORD,
            host: process.env.DBHOST
        };
        console.log(JSON.stringify(details));
        return details;
    }

    const client = new SecretsManagerClient({
        region: "us-east-1",
    });

    // console.log("creds", await client.config.credentials());

    try {
        console.log(process.env.DBSECRETNAME);
        const response = await client.send(
            new GetSecretValueCommand({
                SecretId: process.env.DBSECRETNAME,
                
                VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
            })
        );
        
        const secret = response.SecretString;
        const secretContents = JSON.parse(secret) as { username: string, password: string };
        console.log(secret);
        console.log(secretContents);
        const dbDetails = {
            username: secretContents.username,
            password: secretContents.password,
            host: process.env.DBHOST
        };
        console.log(JSON.stringify(dbDetails));
        return dbDetails;
    } catch (error) {
        // For a list of exceptions thrown, see
        // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        console.error(error.message);
        console.error(error);
        console.log(JSON.stringify(error));
        throw error;
    }
}

async function promiseTimeout(ms) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(resolve, ms);
        } catch(error) {
            reject(error);
        }
    });
}