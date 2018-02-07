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
        @inject(Types.GraphQLServer) private graphqlServer: GraphQLServer
    ) {
        
    }

    public start(): void {
        this.graphqlServer.start();
    }

    private setupMiddleware() {
        this.expressServer.use(cors());
        this.expressServer.use(bodyParser.urlencoded({ extended: true }));
    }
}
