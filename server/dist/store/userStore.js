"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = getUserByEmail;
exports.getUserById = getUserById;
exports.createUser = createUser;
const usersByEmail = {};
const usersById = {};
function getUserByEmail(email) {
    return usersByEmail[email.toLowerCase()];
}
function getUserById(id) {
    return usersById[id];
}
function createUser(user) {
    usersByEmail[user.email.toLowerCase()] = user;
    usersById[user.id] = user;
    return user;
}
