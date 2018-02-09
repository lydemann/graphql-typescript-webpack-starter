import "reflect-metadata";
import { container } from "../../src/ioc/container";
import { Types } from "../../src/ioc/types";
import { Server } from "../../src/server";
import { HelloServiceConnectorMock } from "./mocks/hello-service-connector-mock";

import * as dotenv from "dotenv";
dotenv.load();

const nodefetch = jest.genMockFromModule("node-fetch");

describe("Integration tests", () => {

  beforeAll((done) => {
    container.rebind<HelloServiceConnectorMock>(Types.HelloConnector)
      .to(HelloServiceConnectorMock)
      .inTransientScope();

    this.server = container.get<Server>(Types.Server);
    this.server.start();
    // wait for the server to start
    setTimeout(() => {
      done();
    }, 3000);
  });

  afterAll( () => {
    this.server.stop();
  });

  require("./hello.spec");
});
