import { injectable } from 'inversify';

@injectable()
export class Config {

    public readonly port: number;

    constructor() {
        this.port = Number(process.env.PORT) || 8080;
    }
}
