import { Application, Request, Response } from 'express';

import { IModels } from './../interfaces/models.interface';

interface Routes extends IModels{   

    initRoutes(app: Application): void;

}

export default Routes;
