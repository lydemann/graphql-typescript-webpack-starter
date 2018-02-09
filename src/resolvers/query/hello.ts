import { IHello } from "../../interfaces/IHello";
import { Types } from "../../ioc/types";
import { HelloModel } from "../../models/hello-model";
import { container } from "./../../ioc/container";

type HelloResolver = (viewer: any) => Promise<IHello>;
export const helloResolver: HelloResolver = (_) => {
    const model = container.get<HelloModel>(Types.HelloModel);
    return model.get().then((res) => {
        return res;
    });
};
