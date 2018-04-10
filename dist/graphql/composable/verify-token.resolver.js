"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const utils_1 = require("../../utils/utils");
exports.verifyTokenResolver = (resolver) => {
    return (parent, args, context, info) => {
        console.log('Verificando 1');
        console.log(context.authorization);
        console.log(context.authorization.split(' ')[0]);
        console.log(context.authorization.split(' ')[1]);
        const token = context.authorization; // ? context.authorization.split(' ')[1] : undefined;                    
        console.log('Verificando 2');
        //console.log(token);
        jwt.verify(token, utils_1.JWT_SECRET, (error, decoded) => {
            if (!error) {
                return resolver(parent, args, context, info);
            }
            throw new Error(`${error.name}: ${error.message}`);
        });
    };
};
