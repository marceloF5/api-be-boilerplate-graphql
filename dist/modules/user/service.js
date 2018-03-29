"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model = require("../../models/index");
//const model = require('../../models/index');
class User {
    constructor() { }
    create(user) {
        return model.default.User.create(user); //model.User.create(user);
    }
}
exports.default = new User();
