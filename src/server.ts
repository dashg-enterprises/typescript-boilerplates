import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { InversifyExpressServer } from "inversify-express-utils";

import "./presentation/AccountController";
import { MoreThanOneError } from "./abstract-domain/errors/MoreThanOneError";
import { InvariantError } from "./abstract-domain/errors/InvariantError";
import loadContainer from "./inversify.config";

loadContainer().then(container => {
    const inversifyWrapper = new InversifyExpressServer(container);
    inversifyWrapper.setConfig(app => {
        app.use(express.json());
        app.use(cors({
            origin: "http://localhost:1234"
        }));
    });

    inversifyWrapper.setErrorConfig(app => {
        app.use((error: Error | InvariantError | MoreThanOneError, request: Request, response: Response, next: NextFunction) => {
            if (!error) return next();

            if ((error as InvariantError).type === "InvariantError") {
                const invariantError = error as InvariantError;
                const code = invariantError.subtype == "ConstructorError" ? 400 : 409;
                return response.status(code).send({message: invariantError.message, body: invariantError.body});
            }
            if ((error as MoreThanOneError).type === "MoreThanOneError") {
                const moreThanOneError = error as MoreThanOneError;
                const code = !!moreThanOneError.errors.find(e => e.subtype == "CommandError") ? 409 : 400;
                return response.status(code).send({
                    message: moreThanOneError.message,
                    errors: moreThanOneError.errors.map(e => {
                        return {message: e.message, body: e.body}
                    })
                });
            }
            
            return response.status(500).send(error.message);
        })
    })

    const app = inversifyWrapper.build();

    app.listen(3000, () => {
        console.log("The server is up and running!");
    });
});