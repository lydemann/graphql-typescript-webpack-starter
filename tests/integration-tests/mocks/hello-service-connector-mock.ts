
import { injectable } from "inversify";
import { IHello } from "../../../src/interfaces/IHello";
import * as helloJson from "./hello-connector-mock.json";

@injectable()
export class HelloServiceConnectorMock {
    /**
     * get
     */
    public get(): Promise<IHello> {
        const helloRoot = helloJson as any as {hello: IHello};
        const promise = Promise.resolve(helloRoot.hello);
        return promise;
    }
}
