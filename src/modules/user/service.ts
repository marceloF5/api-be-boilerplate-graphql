import * as model from '../../models/index';
import { IUserModel, IUserInstance } from '../../models/user.models';
//const model = require('../../models/index');

class User {
    
    constructor() { }

    create(user: any){                                               
        return model.default.User.create(user);//model.User.create(user);
    }

    getAll() {
        return model.default.User.findAll({ 
            order: ['name']
        })       
    }
/*
    getAll(): Bluebird<IUser[]> {
        return model.User.findAll({
            order: ['name']
        })
        .then(createUsers)
    }

    getById(id: number): Bluebird<IUserDetail>{
        return model.User.findOne({
            where: {id}
        })
        .then(createUserById)
    }

    getByEmail(email: string): Bluebird<IUserDetail>{
        return model.User.findOne({
            where: {email}
        })
        .then(createUserByEmail)
    }

    update(id: number, user: any){
        return model.User.update(user, {
            where: {id},
            fields: ['name', 'email', 'password'],
            hook: true,
            individualHook: true,
        })
    }

    delete(id: number){
        return model.User.destroy({
            where: {id}
        })
    }*/
}

export default new User();