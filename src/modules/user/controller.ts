import { Request, Response } from 'express';
//import * as HTTPStatus from 'http-status';
//import * as _ from 'lodash';

import User from './service';

class UserController {

    constructor() { }

    getAllUsers(req: Request, res: Response) {
        User.getAll()
            .then(data => {
                res.status(200).json({data})
            })
            //.then(_.partial(Handlers.onSuccess, res))        
            //.catch(_.partial(Handlers.onError, res, `Erro ao buscar os usuários`))
    }

    /*getById(req: Request, res: Response) {
        const userId = parseInt(req.params.id);        
        User.getById(userId)
            .then(_.partial(Handlers.onSuccess, res))        
            .catch(_.partial(Handlers.onError, res, `Erro ao buscar o usuário`))           

    }*/

    createUser(req: Request, res: Response) {
        //return res.status(200).json({'name': 'Marcelo'});//User.create(res);
        req.body = {
            name: 'Marcelo',
            email: 'mp.fortunato88@gmail.com',
            password: '1234'
        }
        User.create(req.body)
            .then(data => {
                console.log(data);
                res.status(200).json({data});
            })
            //.then(_.partial(Handlers.onSuccess, res))        
            //.catch(_.partial(Handlers.dbErrorHandler, res))
            //.catch(_.partial(Handlers.onError, res, `Erro ao inserir novo usuário`))                       
    }
/*
    updateUser(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        const props = req.body;
        User.update(userId, props)
            .then(_.partial(Handlers.onSuccess, res))        
            .catch(_.partial(Handlers.onError, res, `Erro ao atualizar o usuário`))             
    }

    deleteUser(req: Request, res: Response) {
        const userId = parseInt(req.params.id);       
        User.delete(userId)
            .then(_.partial(Handlers.onSuccess, res))        
            .catch(_.partial(Handlers.onError, res, `Erro ao remover o usuário`))               
    }
*/
}

export default new UserController();