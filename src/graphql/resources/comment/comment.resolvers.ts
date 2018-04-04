import { GraphQLResolveInfo } from "graphql";
import { Transaction } from "sequelize";

import { IDbConnection } from "../../../interfaces/dbConnection.interface";
import { ICommentInstance } from "../../../models/comment.models";
import { handleError } from "../../../utils/utils";


export const commentsResolvers = {

    Comment: {
        user: (comment, args, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
          return db.User
              .findById(comment.get('user'))
              .catch(handleError)
        },

        post: (comment, args, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
          return db.Post
              .findById(comment.get('post'))
              .catch(handleError)
        }
    },

    Query: {
        commentsByPost: (comment, { postId, first = 10, offset = 0 }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            postId = parseInt(postId);
            return db.Comment
                .findAll({
                    where: { post: postId },
                    limit: first,
                    offset: offset
                })
                .catch(handleError)
        }
    },

    Mutation: {
        createComment: (comment, { input }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment
                    .create(input, {transaction: t});
            })
            .catch(handleError)
        },

        updateComment: (comment, { id, input }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment
                    .findById(id)
                    .then((comment: ICommentInstance) => {
                        if(!comment) throw new Error(`Comment with id ${id} not found`)
                        return comment.update( input, {transaction: t});
                    })
            })
            .catch(handleError)
        },

        deleteComment: (comment, { id }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
          id = parseInt(id);
          return db.sequelize.transaction((t: Transaction) => {
              return db.Comment
                  .findById(id)
                  .then((comment: ICommentInstance) => {
                      if(!comment) throw new Error(`Comment with id ${id} not found`)
                      return comment.destroy({transaction: t})
                          .then(comment => !!comment);
                  })
          })
          .catch(handleError)
      }

    }
}