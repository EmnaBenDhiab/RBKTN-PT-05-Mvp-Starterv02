const AuthService = require('../services/AuthService');

const AuthController = {

    callSignup : async(req,res) => {
        await AuthService.signup(req,res);
    },

    callSignin : async(req,res) => {
        await AuthService.signin(req,res);
    },

    callSignout : async(req,res) => {
        await AuthService.logout(req,res);
    },
}
module.exports = AuthController;