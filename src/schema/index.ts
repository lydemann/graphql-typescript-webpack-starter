import * as hello from "./hello.graphql";
import * as rootQuerySchema from "./query.graphql";

export const aggregatedSchemas: any[] = [
    rootQuerySchema,
    hello,
];
