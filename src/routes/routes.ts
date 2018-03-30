import { Application, Request, Response } from 'express';

import UserRoutes from './../modules/user/routes';

class Routes {   

    constructor() { }

    initRoutes(app: Application): void {
        UserRoutes.initUserRoute(app); 
    }

}

export default new Routes();
