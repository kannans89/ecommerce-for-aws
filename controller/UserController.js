const UserRepository =require('../data-access/UserRepository')

const BASE_URL = `/api/organization/:organizationId`
 


class UserController {

    constructor(app) {
        this.registrationHandler(app)
        console.log("inside user controller")
    }

    registrationHandler(app) {
        app.post(BASE_URL + `/user/registration`, (req, res) => {
            console.log('registration Handler')
    
            const repo =new UserRepository();
            repo.registerUser(req.body)
            .then((msg)=>{
                res.send(msg);
            })
            .catch((err)=>{
                res.send(err);
            })
           
        }) 
   }




}


module.exports = UserController;