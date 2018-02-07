import "reflect-metadata";

import * as dotenv from "dotenv";
dotenv.load();

import { container } from "./ioc/container";
import { Types } from "./ioc/types";
import { Server } from "./server";

export const server = container.get<Server>(Types.Server).start();
