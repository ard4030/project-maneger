
module.exports =  class Application {
    #express = require("express");
    #app = this.#express();
    constructor(PORT,DB_URL){
        this.configDataBase(DB_URL);
        this.configApplication();
        this.createServer(PORT);
        this.createRoutes();
        this.errorHandler();

    }
    configApplication(){ 
        const path = require("path");
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({extended : true}));
        this.#app.use(this.#express.static(path.join(__dirname,"..","public")));
    }

    createServer(PORT){
        const http = require("http");
        const server = http.createServer(this.#app);
        server.listen(PORT,() => {
            console.log(`Server Run > On  http://localhost:${PORT}`)
        })
    }

    configDataBase(DB_URL){
        const mongoose = require("mongoose");
        mongoose.connect(DB_URL,(error) => {
            if(error) throw error
            return console.log("Connect To DB Successful...")
        })
    }

    errorHandler(){
        this.#app.use((req,res,next) => {
            res.status(404).json({
                status : 404,
                success : false,
                message : "صفحه یا آدرس مورد نظر یافت نشد"
            })
        })
        this.#app.use((error,req,res,next) => {
            const status = error?.status || 500;
            const message = error?.message || "InternalServerError";
            return res.status(status).json({
                status,
                success : false,
                message
            })
        })
    }

    createRoutes(){
        this.#app.get("/",(req,res,next)=> {
            return res.json({
                message : "this is a new Express Application"
            })
        })
    }
}