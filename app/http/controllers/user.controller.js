const { UserModel } = require("../../models/user");

class UserController {
    getProfile(req,res,next){
        try {
            const user = req.user;
            user.profile_image = req.protocol + "://" +  req.get("host") + "/" + (user.profile_image.replace(/[\\\\]/gm,"/"));
            return res.status(200).json({
                status:200,
                success:true,
                user
            })
        } catch (error) {
            next(error)
        }
    }
   async editProfile(req,res,next){
        try {
            let data = {...req.body};
            const userId = req.user._id;
            let fields = ["first_name","last_name","skills"];
            let badValus = [""," ",null,undefined,0,-1,NaN,{},[]];
            Object.entries(data).forEach(([key,value]) => {
                if(!fields.includes(key)) delete data[key];
                if(badValus.includes(value)) delete data[key];
            })
            const result = await UserModel.updateOne({_id : userId} , {$set : data})
            if(result.modifiedCount > 0){
                return res.status(200).json({
                    status : 200,
                    success : true,
                    message : "بروزرسانی با موفقیت انجام شد"
                })
            }
            throw{status : 400 ,message : "بروزرسانی انجام نشد"}
        } catch (error) {
            next(error)
        }
    }
   async uploadProfileImage(req,res,next){
       try {
           const userId = req.user._id;
          const filePath = req.file?.path.substring(7);
          const result = await UserModel.updateOne({_id : userId} , {$set : {profile_image : filePath}});
          if(result.modifiedCount == 0) throw{status:400,message:"بروز رسانی انجام نشد"}
          return res.status(200).json({
              status : 200,
              success : true,
              message : "بروزرسانی با موفقیت انجام شد"
          })
       } catch (error) {
           next(error)
       }
   } 
    addSkills(){

    }
    editSkills(){

    }
    acceptInvitInTeam(){

    }
    rejectInvitInTeam(){

    }
}

module.exports = {
    UserController : new UserController()
}