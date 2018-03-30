"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("./../modules/user/routes");
class Routes {
    constructor() { }
    initRoutes(app) {
        routes_1.default.initUserRoute(app);
    }
}
exports.default = new Routes();
