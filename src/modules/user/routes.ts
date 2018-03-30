import { Request, Response, Application } from 'express';

import UserController from './controller';

class UserRoutes {

    constructor() { }

    initUserRoute(app) {
        app.route('/api/users/create').post(this.create); 
        app.route('/api/users/all').get(this.index);
    }

    index(req: Request, res: Response) {
        return UserController.getAllUsers(req, res);
    }

    create(req: Request, res: Response) {
        return UserController.createUser(req, res);
    }

    /*findOne(req: Request, res: Response) {
        return UserController.getById(req, res);
    }

    update(req: Request, res: Response) {
        return UserController.updateUser(req, res);
    }

    destroy(req: Request, res: Response) {
        return UserController.deleteUser(req, res);
    }*/
}

export default new UserRoutes();