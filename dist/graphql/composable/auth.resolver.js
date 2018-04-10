"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authResolver = ((resolver) => {
    return (parent, args, context, info) => {
        if (context.authUser || context.authorization) {
            return resolver(parent, args, context, info);
        }
        throw new Error('Unathorized! Token not provided!');
    };
});
