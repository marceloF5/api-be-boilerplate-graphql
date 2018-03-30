import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';

import schema from './graphql/schema';
import Routes from './routes/routes';

class App {

    public express: express.Application;

    constructor () {
        this.express = express(); 
        this.middleware();
    }

    private middleware(): void {
        this.express.use('/graphql', graphqlHTTP({
            schema: schema,
            graphiql: process.env.NODE_ENV === 'development'
        })); 
        this.router(this.express);       
    }

    private router(app: express.Application): void {
        Routes.initRoutes(app);
    }
}

export default new App().express;