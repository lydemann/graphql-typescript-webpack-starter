import { injectable } from "inversify";
import { IHello } from "../interfaces/IHello";
import * as helloJson from "./hello.json";

@injectable()
export class HelloServiceConnector {
    /**
     * get
     */
    public get(): Promise<IHello> {
        const helloRoot = helloJson as any as {hello: IHello};
        const promise = Promise.resolve(helloRoot.hello);
        return promise;
    }
}
