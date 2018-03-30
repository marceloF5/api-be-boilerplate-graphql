"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema_1 = require("./graphql/schema");
const routes_1 = require("./routes/routes");
class App {
    constructor() {
        this.express = express();
        this.middleware();
    }
    middleware() {
        this.express.use('/graphql', graphqlHTTP({
            schema: schema_1.default,
            graphiql: process.env.NODE_ENV === 'development'
        }));
        this.router(this.express);
    }
    router(app) {
        routes_1.default.initRoutes(app);
    }
}
exports.default = new App().express;
