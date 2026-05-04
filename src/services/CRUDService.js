import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    try {
        let hashPasswordFromDB = await hashUserPassword(data.password);
        await db.User.create({
            email: data.email,
            password: hashPasswordFromDB,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender === '1' ? true : false,
            roleId: data.roleId,
        })
        return 'ok! create a new user succeed!';
    } catch (e) {
        throw e;
    }
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUser = async () => {
    try {
        let users = await db.User.find();
        return users;
    } catch (e) {
        throw e;
    }
}

let getUserInfoById = async (userId) => {
    try {
        let user = await db.User.findById(userId);
        if (user) {
            return user;
        } else {
            return {};
        }
    } catch (e) {
        throw e;
    }
}

let updateUserData = async (data) => {
    try {
        let user = await db.User.findById(data.id);
        if (user) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            await user.save();
            let allUsers = await db.User.find();
            return allUsers;
        } else {
            return null;
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

let deleteUserById = async (userId) => {
    try {
        await db.User.findByIdAndDelete(userId);
    } catch (e) {
        throw e;
    }
}

export default {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}
