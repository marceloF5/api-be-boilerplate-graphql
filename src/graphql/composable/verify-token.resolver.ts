import { GraphQLFieldResolver } from 'graphql';
import * as jwt from 'jsonwebtoken';

import { ComposableResolver } from './composable.resolver';
import { ResolverContext } from '../../interfaces/resolverContext.interface';
import { JWT_SECRET } from '../../utils/utils';

export const verifyTokenResolver: ComposableResolver<any, ResolverContext> = 
    (resolver: GraphQLFieldResolver<any, ResolverContext>): GraphQLFieldResolver<any, ResolverContext> => { 
        return (parent, args, context: ResolverContext, info) => {
            console.log('Verificando 1');
            console.log(context.authorization);
            console.log(context.authorization.split(' ')[0]);
            console.log(context.authorization.split(' ')[1]);
            const token: string = context.authorization;// ? context.authorization.split(' ')[1] : undefined;                    
            console.log('Verificando 2');
            //console.log(token);
            jwt.verify(token, JWT_SECRET, (error, decoded: any) => {
                if(!error) {
                    return resolver(parent, args, context, info);
                }
                throw new Error(`${error.name}: ${error.message}`)
            })
        }
    }