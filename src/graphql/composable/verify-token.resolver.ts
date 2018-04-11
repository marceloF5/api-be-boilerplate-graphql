import { GraphQLFieldResolver } from 'graphql';
import * as jwt from 'jsonwebtoken';

import { ComposableResolver } from './composable.resolver';
import { ResolverContext } from '../../interfaces/resolverContext.interface';
import { JWT_SECRET } from '../../utils/utils';

export const verifyTokenResolver: ComposableResolver<any, ResolverContext> = 
    (resolver: GraphQLFieldResolver<any, ResolverContext>): GraphQLFieldResolver<any, ResolverContext> => { 
        return (parent, args, context: ResolverContext, info) => {
            const token: string = context.authorization.split(' ')[1];
            console.log(token);
            jwt.verify(token, JWT_SECRET, (error, decoded: any) => {
                if(!error) {
                    console.log('Acessando o resolver');
                    console.log(decoded);
                    return resolver(parent, args, context, info);
                }
                throw new Error(`${error.name}: ${error.message}`)
            })
        }
    }