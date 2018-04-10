import { AuthUser } from './authUser.interface';
import { IDbConnection } from "../interfaces/dbConnection.interface";

export interface ResolverContext {
    db?: IDbConnection;
    authorization?: string;
    authUser?: AuthUser;
}