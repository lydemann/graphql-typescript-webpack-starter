import { Container } from "inversify";
import { HelloServiceConnector } from "../connectors/hello-service-connector";
import { GraphqlServer } from "../graphql";
import { HelloModel } from "../models/hello-model";
import { Server } from "../server";
import { Config } from "./../config";
import { Types } from "./types";

export const container = new Container();

container.bind<Config>(Types.Config)
    .to(Config);
container.bind<Server>(Types.Server)
    .to(Server);
container.bind<GraphqlServer>(Types.GraphQLServer)
    .to(GraphqlServer)
    .inSingletonScope();
container.bind<HelloServiceConnector>(Types.HelloConnector)
    .to(HelloServiceConnector);
container.bind<HelloModel>(Types.HelloModel)
    .to(HelloModel);
