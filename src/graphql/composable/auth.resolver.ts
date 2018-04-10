import { ComposableResolver } from './composable.resolver';
import { ResolverContext } from '../../interfaces/resolverContext.interface';
import { GraphQLFieldResolver } from 'graphql';

export const authResolver: ComposableResolver<any, ResolverContext> = (
    (resolver: GraphQLFieldResolver<any, ResolverContext>): GraphQLFieldResolver<any, ResolverContext> => {         
        return (parent, args, context: ResolverContext, info) => {
            if(context.authUser || context.authorization) {
                return resolver(parent, args, context, info);
            } 
            throw new Error('Unathorized! Token not provided!');
        }
    });