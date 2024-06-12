import {
    SecretsManagerClient,
    GetSecretValueCommand,
    GetSecretValueCommandOutput,
    GetSecretValueCommandInput
} from "@aws-sdk/client-secrets-manager";

export async function getSecret() {
    const client = new SecretsManagerClient({
        region: "us-east-1",
    });

    console.log("creds", await client.config.credentials());

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
        return secretContents;
    } catch (error) {
        // For a list of exceptions thrown, see
        // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        console.error(error.message);
        console.error(error);
        console.log(JSON.stringify(error));
        throw error;
    }
}