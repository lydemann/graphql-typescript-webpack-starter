import * as http from "http";

export function request<T>(payload: string): Promise<IResponse<T>> {
  const requestOptions = {
    hostname: "localhost",
    port: 8080,
    path: "/graphql",
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  };

  return new Promise<IResponse<T>>((resolve, reject) => {
    const request2 = http.request(requestOptions, (response) => {
      response.setEncoding("utf8");

      let rawData = "";
      response.on("data", (data) => rawData += data);

      response.on("end", () => {
        const parsedData = JSON.parse(rawData);

        resolve({
          message: response,
          data: parsedData.data,
          errors: parsedData.errors,
        });
      });

      response.on("error", (err) => reject(err));
    });

    request2.write(payload);
    request2.end();
  });
}

/**
 * Request response.
 */
export interface IResponse<T> {
  message: http.IncomingMessage;
  data: T;
  errors?: Array<IError>;
}

/**
 * Request error Response.
 */
export interface IError {
  message: string;
  locations: Array<{ line: number, column: number }>;
}
