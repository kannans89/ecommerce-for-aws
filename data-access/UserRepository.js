
 const getConnection =require('./Conneciton')
 const uuidv1 = require('uuid/v1');

class UserRepository {

      constructor(){
       

      }

      registerUser(newUser){
        
      
        return new Promise ( (resolve,reject) => {
            const userId=uuidv1();    
        var user = [[userId, newUser.username, 
            newUser.password, newUser.registration_date]];
        
            const con = getConnection();
            con.connect(function (err) {
            if (err) throw err;
            console.log("insert Connected!");
            con.query("insert into customer values ?", [user], function (err, result) {
                if (err)
                    reject(err);
                resolve("success");

            });
        });
    });
        

      }

}

module.exports = UserRepository;