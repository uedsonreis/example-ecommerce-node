import express from 'express';
// import morgan from 'morgan';
// import xmlparser from 'express-xml-bodyparser';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';

import env from './env';
import router from './router';

class ServiceApp {

    public express: express.Express;

    constructor() {
        this.express = express();
        this.middlewares();
        this.configRoutes();
    }

    private middlewares(): void {
        // this.express.use(xmlparser());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(cors());
        // this.express.use(morgan('combined', { stream: { write: core.error.streamWrite } }));
        this.express.use(helmet());
    }

    private configRoutes(): void {
        this.express.use('/api', router);
    }

    public startService(): void {
        this.express.listen(env.portServer, () => console.log("Serviço rodando na porta %s!", env.portServer));
    }
}

export default new ServiceApp();