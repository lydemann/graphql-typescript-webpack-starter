import { Types } from './types';
import { Container } from "inversify";
import { Server } from "../server";

export const container = new Container();

container.bind<Config>(Types.Config)
container.bind<Server>(Types.Server)
container.bind<GraphQLServer>(Types.GraphQLServer)
