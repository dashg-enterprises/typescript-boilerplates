import "reflect-metadata";
import express from "express";
import cors from "cors";
import { InversifyExpressServer } from "inversify-express-utils";

import { getSecret } from "./infrastructure/getSecret.js";
import { DomainError } from "./application/models/DomainError.js";
import loadContainer from "./inversify.config.js";

// getSecret().then(secret => console.log("Wrapped up", secret.username, secret.password));

loadContainer().then(container => {
    const inversifyWrapper = new InversifyExpressServer(container);
    inversifyWrapper.setConfig(app => {
        app.use(express.json());
        app.use(cors({
            origin: "*"
        }));
    });

    inversifyWrapper.setErrorConfig(app => {
        app.use((error: DomainError, req, res, next) => {
            if (error.type == "DomainError") {
                return res.status(409).json({
                    code: "409 Conflict",
                    type: error.type,
                    resource: req.params.id,
                    message: error.message
                });
            }
            return res.status(500).json({
                code: "500 Server Error",
                message: error.message
            });
        });
    })

    const app = inversifyWrapper.build();

    app.listen(3000, () => {
        console.log("The server is up and running!");
    });
});