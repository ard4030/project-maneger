const { body } = require("express-validator");
const  path  = require("path");

function imageValidator(){
    return [
        body("image").custom((image,{req}) => {
            if(Object.keys(req.file) == 0) throw "لطفا یک تصویر را انتخاب کنید" 
            const ext = path.extname(req.file.originalname);
            const exts = [".png",".jpg",".jpeg",".gif",".webp"];
            if(!exts.includes(ext)) throw "فرمت تصویر بارگزاری شده مجاز نبست";
            const maxSize = 2 * 1024 * 1024;
            if(req.file.size > maxSize) throw "حجم تصویر بیش از حد مجاز"
            return true 
        })
    ]
}

module.exports = {
    imageValidator
}