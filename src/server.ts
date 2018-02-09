import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import { inject, injectable } from "inversify";
import { GraphqlServer } from "./graphql";
import { Types } from "./ioc/types";

@injectable()
export class Server {

    public expressServer;

    constructor(
        @inject(Types.GraphQLServer) private graphqlServer: GraphqlServer,
    ) {
        this.expressServer = express();
        this.setupMiddleware();
        this.graphqlServer.express = this.expressServer;
    }

    public start(): void {
        this.graphqlServer.start();
    }

    /**
     * stop
     */
    public stop(): void {
        this.graphqlServer.stop();
    }

    private setupMiddleware() {
        this.expressServer.use(cors());
        this.expressServer.use(bodyParser.urlencoded({ extended: true }));
        this.expressServer.use(bodyParser.json());
    }
}
