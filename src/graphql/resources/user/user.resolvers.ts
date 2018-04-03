import { GraphQLResolveInfo } from 'graphql';
import { Transaction } from 'sequelize';

import { IDbConnection } from '../../../interfaces/dbConnection.interface';
import { IUserInstance } from '../../../models/user.models';


export const userResolvers = {
    User: {
        posts: (user, { first = 10 , offset = 0 }, {db}: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            return db.Post
                .findAll({
                    where: {author: user.get('id')},
                    limit: first,
                    offset: offset
                })
        }
    }, 

    Query: {
        users: (parent, { first = 10 , offset = 0 }, {db}: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            return db.User
                .findAll({
                    limit: first,
                    offset: offset
                });                
        },

        user: (parent, { id }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            return db.User
                .findById(id)
                .then((user: IUserInstance) => {
                    if(!user) throw new Error(`User with id ${id} not found`);                    
                    return user;
                })
        }
    },

    Mutation: {
        createUser: (parent, { input }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .create(input, { transaction: t });
            })
        },

        updateUser: (parent, { id, input }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findById(id)
                    .then((user: IUserInstance) => {
                        if(!user) throw new Error(`User with id ${id} not found`);    
                        return user.update(input, { transaction: t })
                    })
            })
        },

        updateUserPassword: (parent, { id, input }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findById(id)
                    .then((user: IUserInstance) => {
                        if(!user) throw new Error(`User with id ${id} not found`);    
                        return user.update(input, { transaction: t })
                            .then((user: IUserInstance) => !!user)
                    })
            })
        },

        deleteUser: (parent, { id }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.User.findById(id)
                    .then((user: IUserInstance) => {
                        if(!user) throw new Error(`User with id ${id} not found`);    
                        return user.destroy({transaction: t})
                            .then(user => !!user);
                    })
            })

        }
    }
}