import { IHello } from "../../src/interfaces/IHello";
import { request } from "./request";

const helloPayload = JSON.stringify({
  query: `
  {
    hello {
      message
    }
  }
  `,
});

describe("query hello", () => {
  it("should return status code 200", () => {
    return request(helloPayload)
      .then((response) => {
        expect(response.message.statusCode).toEqual(200);
      });
  });

  it("should return hello with defined message", () => {
    return request(helloPayload)
      .then((response) => {
        const data = response.data as { hello: IHello };

        expect(data.hello.message).toBeDefined();
      });
  });
});
