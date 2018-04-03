import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';

import schema from './graphql/schema';
import Routes from './routes/routes';
import db from './models/index';

class App {

    public express: express.Application;

    constructor () {
        this.express = express(); 
        this.middleware();
    }

    private middleware(): void {
        this.express.use('/graphql', 
            // Contexto / Instância do Banco
            (req, res, next) => {
                req['context'] = {};
                req['context'].db = db;
                next();                
            },
            graphqlHTTP((req) => ({
                schema: schema,
                graphiql: process.env.NODE_ENV === 'development',
                context: req['context']
            }))
        ); 
        this.router(this.express);       
    }

    private router(app: express.Application): void {
        Routes.initRoutes(app);
    }
}

export default new App().express;