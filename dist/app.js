"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const graphqlHTTP = require("express-graphql");
const extract_jwt_middleware_1 = require("./middlewares/extract-jwt.middleware");
const schema_1 = require("./graphql/schema");
const routes_1 = require("./routes/routes");
const index_1 = require("./models/index");
class App {
    constructor() {
        this.express = express();
        this.middleware();
    }
    middleware() {
        this.express.use('/graphql', extract_jwt_middleware_1.extractJwtMiddleware(), 
        // Contexto / Instância do Banco 
        (req, res, next) => {
            req['context'].db = index_1.default;
            next();
        }, graphqlHTTP((req) => ({
            schema: schema_1.default,
            graphiql: process.env.NODE_ENV === 'development',
            context: req['context']
        })));
        this.router(this.express);
    }
    router(app) {
        routes_1.default.initRoutes(app);
    }
}
exports.default = new App().express;
