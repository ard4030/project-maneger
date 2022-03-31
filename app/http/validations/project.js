const { body } = require("express-validator");

function createProjectvalidator(){

    return [
        body("title").notEmpty().withMessage("عنوان پروژه نمیتواند خالی باشد"),
        body("text").notEmpty().isLength({min:20}).withMessage("توضیحات پروژه نمیتواند خالی باشد و حداقل 20 کاراکتر")
    ]
}

module.exports = {
    createProjectvalidator
}