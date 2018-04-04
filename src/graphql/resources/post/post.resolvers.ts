import { GraphQLResolveInfo } from "graphql";
import { Transaction } from "sequelize";

import { IDbConnection } from "../../../interfaces/dbConnection.interface";
import { IPostInstance } from "../../../models/post.models";
import { handleError } from "../../../utils/utils";

export const postResolvers = {

    Post: {
        author: (post, args, { db }: { db: IDbConnection}, info: GraphQLResolveInfo) => {
            return db.User
                .findById(post.get('id'));
        },

        comments: (post, { first = 10, offset = 0 }, { db }: { db: IDbConnection}, info: GraphQLResolveInfo) => {
            return db.Comment            
                .findAll({
                    where: {post: post.get('id')},
                    limit: first,
                    offset: offset
                })
        }, 
    },

    Query: {
        posts: (parent, { first = 10, offset = 0 }, { db }: { db: IDbConnection}, info: GraphQLResolveInfo) => {
            return db.Post
                .findAll({
                    limit: first,
                    offset: offset
                })
                .catch(handleError)
        }, 

        post: (parent, { id }, { db }: { db: IDbConnection}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.Post
                .findById(id)
                .then((post: IPostInstance) => {
                    if(!post) throw new Error(`Post with id ${id} not found`);                    
                    return post;
                })
                .catch(handleError)
        }
    },

    Mutation: {
        createPost: (parent, { input }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post
                    .create(input, { transaction: t });
            })
            .catch(handleError)
        },

        uptadePost: (parent, { id, input }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post
                    .findById(id)
                    .then((post: IPostInstance) => {
                        if(!post) throw new Error(`Post with id ${id} not found`);       
                        return post.update(input, { transaction: t })
                    })
            })
            .catch(handleError)
        },

        deletePost: (parent, { id}, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post
                    .findById(id)
                    .then((post: IPostInstance) => {
                        if(!post) throw new Error(`Post with id ${id} not found`);       
                        return post.destroy({transaction: t})
                            .then((post) => !!post)
                    })
            })
            .catch(handleError)
        },
    }


}