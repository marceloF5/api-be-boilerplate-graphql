import * as Sequelize from 'sequelize';

import { IModels } from './models.interface';

export interface IDbConnection extends IModels {
    sequelize: Sequelize.Sequelize;
}