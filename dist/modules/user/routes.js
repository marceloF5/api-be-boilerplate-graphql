"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
class UserRoutes {
    constructor() { }
    initUserRoute(app) {
        app.route('/api/users/create').post(this.create);
        app.route('/api/users/all').get(this.index);
    }
    index(req, res) {
        return controller_1.default.getAllUsers(req, res);
    }
    create(req, res) {
        return controller_1.default.createUser(req, res);
    }
}
exports.default = new UserRoutes();
