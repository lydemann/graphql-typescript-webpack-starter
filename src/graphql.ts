import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import { Express } from "express";
import { makeExecutableSchema } from "graphql-tools";
import * as http from "http";
import { inject, injectable } from "inversify";
import { Config } from "./config";
import { Types } from "./ioc/types";
import { Resolvers } from "./resolvers/index";
import { aggregatedSchemas } from "./schema";

@injectable()
export class GraphqlServer {

    public set express(v: Express) {
        this.app = v;
    }
    private app: Express;

    private serverInstance: http.Server;
    constructor(
        @inject(Types.Config) private config: Config,
    ) { }

    public start(): void {
        const resolvers = new Resolvers();

        const executableSchema = makeExecutableSchema({
            resolvers: resolvers.getAll(),
            typeDefs: aggregatedSchemas,
            resolverValidationOptions: { requireResolversForNonScalar: false },
        });

        this.app.use("/graphql", graphqlExpress(() => {
            return {
                schema: executableSchema,
            };
        }));

        this.app.use("/graphiql", graphiqlExpress({
            endpointURL: "/graphql",
        }));

        this.serverInstance = this.app.listen(this.config.port, () => {
            console.log(`GraphQL Server is now running on http://localhost:${this.config.port}/graphql`);
            console.log(`GraphiQL Server is now running on http://localhost:${this.config.port}/graphiql`);
        });
    }

    /**
     * stop
     */
    public stop() {
        this.serverInstance.close();
    }
}
