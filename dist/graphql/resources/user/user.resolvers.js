"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
const composable_resolver_1 = require("../../composable/composable.resolver");
const auth_resolver_1 = require("../../composable/auth.resolver");
const verify_token_resolver_1 = require("../../composable/verify-token.resolver");
exports.userResolvers = {
    User: {
        posts: (user, { first = 10, offset = 0 }, { db }, info) => {
            return db.Post
                .findAll({
                where: { author: user.get('id') },
                limit: first,
                offset: offset
            })
                .catch(utils_1.handleError);
        }
    },
    Query: {
        users: composable_resolver_1.compose(auth_resolver_1.authResolver, verify_token_resolver_1.verifyTokenResolver)((parent, { first = 10, offset = 0 }, { db }, info) => {
            console.log('ENTROU NO USERS');
            return db.User
                .findAll({
                limit: first,
                offset: offset
            })
                .catch(utils_1.handleError);
        }),
        user: (parent, { id }, { db }, info) => {
            id = parseInt(id);
            return db.User
                .findById(id)
                .then((user) => {
                if (!user)
                    throw new Error(`User with id ${id} not found`);
                return user;
            })
                .catch(utils_1.handleError);
        }
    },
    Mutation: {
        createUser: (parent, { input }, { db }, info) => {
            return db.sequelize.transaction((t) => {
                return db.User
                    .create(input, { transaction: t });
            })
                .catch(utils_1.handleError);
        },
        updateUser: (parent, { id, input }, { db }, info) => {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.User
                    .findById(id)
                    .then((user) => {
                    if (!user)
                        throw new Error(`User with id ${id} not found`);
                    return user.update(input, { transaction: t });
                });
            })
                .catch(utils_1.handleError);
        },
        updateUserPassword: (parent, { id, input }, { db }, info) => {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.User
                    .findById(id)
                    .then((user) => {
                    if (!user)
                        throw new Error(`User with id ${id} not found`);
                    return user.update(input, { transaction: t })
                        .then((user) => !!user);
                });
            })
                .catch(utils_1.handleError);
        },
        deleteUser: (parent, { id }, { db }, info) => {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.User.findById(id)
                    .then((user) => {
                    if (!user)
                        throw new Error(`User with id ${id} not found`);
                    return user.destroy({ transaction: t })
                        .then(user => !!user);
                });
            })
                .catch(utils_1.handleError);
        }
    }
};
