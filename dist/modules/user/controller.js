"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import * as HTTPStatus from 'http-status';
//import * as _ from 'lodash';
const service_1 = require("./service");
class UserController {
    constructor() { }
    /*getAllUsers(req: Request, res: Response) {
        User.getAll()
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao buscar os usuários`))
    }

    getById(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        User.getById(userId)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao buscar o usuário`))

    }*/
    createUser(req, res) {
        return service_1.default.create(res);
        /*User.create(req.body)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.dbErrorHandler, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao inserir novo usuário`))                       */
    }
}
exports.default = new UserController();
