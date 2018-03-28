import * as Sequelize from 'sequelize';

import { IBaseModel } from './../interfaces/baseModel.interface';
import { IModels } from '../interfaces/models.interface';

export interface ICommentAttributes {
    id?: number;
    comment?: string;
    post?: number;
    user?: number;
    createdAt?: string;
    updateAt?: string;
}

export interface ICommentInstance extends Sequelize.Instance<ICommentAttributes> { }

export interface ICommentModel extends IBaseModel, Sequelize.Model<ICommentInstance, ICommentAttributes> { }

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): ICommentModel => {

    const Comment: ICommentModel = 
        sequelize.define('Comment', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            comment: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        }, {
            tableName: 'comments'
        });

        Comment.associate = (models: IModels): void => {
            Comment.belongsTo(models.Post, {
                foreignKey: {
                    allowNull: false,
                    field: 'post',
                    name: 'ṕost'
                }
            });

            Comment.belongsTo(models.User, {
                foreignKey: {
                    allowNull: false,
                    field: 'user',
                    name: 'user'
                }
            })
        }

    return Comment;
}
