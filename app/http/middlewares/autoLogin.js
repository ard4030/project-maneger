const { verifyJwtToken } = require("../../modules/functions");
const {UserModel} = require("../../models/user")

const checkLogin = async (req,res,next) => {
 try {
    let authError = {status:401 , message :"لطفا وارد حساب کاربری خود شوید"};
    const autorization = req?.headers?.authorization;
    if(!autorization) throw authError
    let token = autorization.split(" ")?.[1];
    if(!token) throw authError
    const result = verifyJwtToken(token);
    const {username} = result;
    const user = await UserModel.findOne({username},{password :0})
    if(!user) throw authError;
    req.user = user;
    return next()
 } catch (error) {
     next(error)
 }
}

module.exports = {
    checkLogin
}