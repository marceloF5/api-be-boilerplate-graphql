"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import * as HTTPStatus from 'http-status';
//import * as _ from 'lodash';
const service_1 = require("./service");
class UserController {
    constructor() { }
    getAllUsers(req, res) {
        service_1.default.getAll()
            .then(data => {
            res.status(200).json({ data });
        });
        //.then(_.partial(Handlers.onSuccess, res))        
        //.catch(_.partial(Handlers.onError, res, `Erro ao buscar os usuários`))
    }
    /*getById(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        User.getById(userId)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao buscar o usuário`))

    }*/
    createUser(req, res) {
        //return res.status(200).json({'name': 'Marcelo'});//User.create(res);
        req.body = {
            name: 'Marcelo',
            email: 'mp.fortunato88@gmail.com',
            password: '1234'
        };
        service_1.default.create(req.body)
            .then(data => {
            console.log(data);
            res.status(200).json({ data });
        });
        //.then(_.partial(Handlers.onSuccess, res))        
        //.catch(_.partial(Handlers.dbErrorHandler, res))
        //.catch(_.partial(Handlers.onError, res, `Erro ao inserir novo usuário`))                       
    }
}
exports.default = new UserController();
