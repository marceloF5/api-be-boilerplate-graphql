"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const utils_1 = require("../../utils/utils");
exports.verifyTokenResolver = (resolver) => {
    return (parent, args, context, info) => {
        const token = context.authorization.split(' ')[1];
        console.log(token);
        jwt.verify(token, utils_1.JWT_SECRET, (error, decoded) => {
            if (!error) {
                console.log('Acessando o resolver');
                console.log(decoded);
                return resolver(parent, args, context, info);
            }
            throw new Error(`${error.name}: ${error.message}`);
        });
    };
};
