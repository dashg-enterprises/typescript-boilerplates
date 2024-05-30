import {
    SecretsManagerClient,
    GetSecretValueCommand
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

    let response;

    try {
        console.log(process.env.DBSECRETNAME);
        response = await Promise.race([client.send(
            new GetSecretValueCommand({
                SecretId: process.env.DBSECRETNAME,
                
                VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
            })
        ), promiseTimeout(30000).then(() => {
            throw new Error("Lost the race");
        })]);
    } catch (error) {
        console.log("Gonna log an error");
        // For a list of exceptions thrown, see
        // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        console.error(error);
        console.log(error);
        throw error;
    }

    const secret = response.SecretString;
    const dbDetails = {
        username: process.env.DBUSERNAME,
        password: secret,
        host: process.env.DBHOST
    };
    console.log(JSON.stringify(dbDetails));
    return dbDetails;
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