import { inject, injectable } from "inversify";
import { HelloServiceConnector } from "../connectors/hello-service-connector";
import { IHello } from "../interfaces/IHello";
import { Types } from "./../ioc/types";

@injectable()
export class HelloModel {
    constructor(
        @inject(Types.HelloConnector) private helloConnector: HelloServiceConnector,
    ) { }

    /**
     * get hello
     */
    public get(): Promise<IHello> {
        return this.helloConnector.get()
            .then((res) => {
                return res;
            });
    }
}
