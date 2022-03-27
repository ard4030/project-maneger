const {body} = require("express-validator");
const { UserModel } = require("../../models/user");
function registerValidator(){
    return [
        body("username").custom(async(value , ctx) => {
            if(value){
                const usernameRegex =  /[^[a-z]+[a-z0-9\_\.]{2,}/gi;
                if(usernameRegex.test(value)){
                    const user = await UserModel.findOne({username : value})
                    if(user) throw "نام کاربری قبلا ثبت شده";
                    return true
                }
                throw "نام کاربری صحیح نیست"
            }
            throw "نام کاربری نمیتواند خالی باشد"
        }),
        body("email").isEmail().withMessage("ایمیل وارد شده صحیح نیست")
        .custom(async email => {
            const user = await UserModel.findOne({email})
            if(user) throw "ایمیل وارد شده قبلا ثبت شده";
            return true
        }),
        body("mobile").isMobilePhone("fa-IR").withMessage("شماره موبایل وارد شده صحیح نیست")
        .custom(async mobile => {
            const user = await UserModel.findOne({mobile})
            if(user) throw "موبایل قبلا در سیستم ثبت شده";
            return true
        }),
        body("password").isLength({min:6,max:16}).withMessage("رمز عبور حداقل باید 6 کاراکتر و حداکثر 16 کاراکار باشد")
        .custom((value , ctx) => {
            if(!value) throw "رمز عبور نمیتواند خالی باشد";
            if(value !== ctx?.req?.body?.confirm_password) throw "رمز عبور با تکرار آن یکسان نیست";
            return true
        })
    ]
}

module.exports = {
    registerValidator
}