
export class Config {

    public readonly graphQLPort: number;

    constructor() {
        this.graphQLPort = Number(process.env.PORT) || 8080;    
    }
}