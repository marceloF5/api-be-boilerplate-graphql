import * as jwt from 'jsonwebtoken';

import { IDbConnection } from "../../../interfaces/dbConnection.interface";
import { IUserInstance } from "../../../models/user.models";
import { JWT_SECRET } from '../../../utils/utils';

export const tokenResolvers = {
    Mutation: {
        createToken: (parent, { email, password }, { db }: { db: IDbConnection}) => {
            return db.User.findOne({ 
                where: { email: email },
                attributes: ['id', 'password']
            })
            .then((user: IUserInstance) => {
                let errorMessage: string = 'Unathorized, wrong email or password!'
                if(!user || !user.isPassword(user.get('password'), password)) { throw new Error(errorMessage); }

                const payload = {sub: user.get('id')};
                return {
                    token: jwt.sign(payload, JWT_SECRET)
                }

            })
        }
    }
}