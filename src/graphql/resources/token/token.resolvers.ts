import { IDbConnection } from "../../../interfaces/dbConnection.interface";
import { IUserInstance } from "../../../models/user.models";

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


            })
        }
    }
}