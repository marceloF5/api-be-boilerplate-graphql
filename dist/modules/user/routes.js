"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
class UserRoutes {
    constructor() { }
    /*index(req: Request, res: Response) {
        return UserController.getAllUsers(req, res);
    }*/
    create(req, res) {
        return controller_1.default.createUser(req, res);
    }
}
exports.default = new UserRoutes();
