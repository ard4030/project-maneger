const router = require("express").Router();
const {ProjectController} = require("../http/controllers/project.controller");
const { createProjectvalidator } = require("../http/validations/project");
const {expressValidatorMapper} = require("../http/middlewares/checkErrors")
const {checkLogin} = require("../http/middlewares/autoLogin");
const { uploadFile } = require("../modules/express-fileupload");
const fileUpload = require("express-fileupload");
router.post("/create",fileUpload(),checkLogin,uploadFile,createProjectvalidator(),expressValidatorMapper,ProjectController.createProject)
module.exports = {
    projectRoutes : router
}