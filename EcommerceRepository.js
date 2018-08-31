var mysql = require('mysql');
function EcommerceRepository() {

    function getConnection(){

        return mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "flipkart"
        });

    }

    this.register = function (newUser) {
        var user = [[newUser.customer_guid, newUser.username, 
            newUser.password, newUser.registration_date]];
        
            const con = getConnection();
        con.connect(function (err) {
            if (err) throw err;
            console.log("insert Connected!");
            con.query("insert into customer values ?", [user], function (err, result) {
                if (err)
                    throw err;

            });
        });
    }

    this.authenticateUser=function(user,callback){
        var authenticationResult;
        const con = getConnection();
        con.connect(function (err) {
            var response={"isAuthenticated":false,"id":0};
            if (err) throw err;
            console.log("select Connected!");
            con.query("select * from customer where username= ? and password= ?", [user.username, user.password], function (err, result) {
                if (err)
                    throw err;
                authenticationResult = JSON.parse(JSON.stringify(result));
                
                if(authenticationResult.length!=0){
                    response.isAuthenticated=true;
                    response.id=authenticationResult[0].customer_guid;
                    callback(response);
                }
                else{
                    response.isAuthenticated=false;
                    callback(response);
                }

            });
        });
    }

    this.getMobiles = function (callback) {
        var mobiles;
        const con = getConnection();
        con.connect(function (err) {

            if (err) throw err;
            console.log("select Connected!");
            con.query("select * from products where product_category='mobiles'", function (err, result) {
                if (err)
                    throw err;
                mobiles = JSON.parse(JSON.stringify(result));
                callback(mobiles);
            });
        });
    }
    this.getBags = function (callback) {
        var bags;
        const con = getConnection();
        con.connect(function (err) {

            if (err) throw err;
            console.log("select Connected!");
            con.query("select * from products where product_category='bags'", function (err, result) {
                if (err)
                    throw err;
                bags = JSON.parse(JSON.stringify(result));
                callback(bags);
            });
        });
    }
    this.getLaptops = function (callback) {
        var laptops;
        const con = getConnection();
        con.connect(function (err) {

            if (err) throw err;
            console.log("select Connected!");
            con.query("select * from products where product_category='laptops'", function (err, result) {
                if (err)
                    throw err;
                laptops = JSON.parse(JSON.stringify(result));
                callback(laptops);
            });
        });
    }
    this.getCartItems = function (callback) {
        var items;
        const con = getConnection();
        con
        .connect(function (err) {

            if (err) throw err;
            console.log("select Connected!");
            con.query("select * from cart", function (err, result) {
                if (err)
                    throw err;
                items = JSON.parse(JSON.stringify(result));
                callback(items);
            });
        });
    }
    this.removeItem = function (no) {
        
        const con = getConnection();
        con.connect(function (err) {

            if (err) throw err;
            console.log("select Connected!");
            con.query("delete from cart where no="+no, function (err, result) {
                if (err)
                    throw err;
                
            });
        });
    }
    this.getCategories = function (callback) {
        var categories;
        const con = getConnection();
        con.connect(function (err) {

            if (err) throw err;
            console.log("select Connected!");
            con.query("select * from category", function (err, result) {
                if (err)
                    throw err;
                categories = JSON.parse(JSON.stringify(result));
                callback(categories);
            });
        });
    }
    this.getCustomers = function (callback) {
        var customers;
        const con = getConnection();
        con.connect(function (err) {

            if (err) throw err;
            console.log("select Connected!");
            con.query("select * from customer", function (err, result) {
                if (err)
                    throw err;
                    
                customers = result.length;
                callback(customers.toString());
            });
        });
    }
    this.getCart = function (callback) {
        var cart;
        const con = getConnection();
        con.connect(function (err) {

            if (err) throw err;
            console.log("select Connected!");
            con.query("select * from cart", function (err, result) {
                if (err)
                    throw err;
                    
                cart = result.length;
                callback(cart.toString());
            });
        });
    }
    this.addToCart=function(lineitem,orgId,customerId){
        var item = [[lineitem.no, lineitem.name, lineitem.price, lineitem.qty,lineitem.totalPrice,lineitem.category,lineitem.product_guid,customerId]];
        const con = getConnection();
        con.connect(function (err) {
            if (err) throw err;
            console.log("insert Connected!");
            con.query("insert into cart values ?", [item], function (err, result) {
                if (err)
                    throw err;

            });
        });
    }

    this.checkout=function(lineitem,customerId){
        const con = getConnection();
        var order=[[1,customerId,lineitem.length,'today']];
        con.connect(function (err) {
            if (err) throw err;
            console.log("checkout");

            con.query("insert into product_order values ?", [order], function (err, result) {
                if (err)
                    throw err;

            });

            for(var i=0;i<lineitem.length;i++){
            var item = [[i+1, lineitem[i].product_guid, 1, lineitem[i].qty]];
            con.query("insert into lineitems values ?", [item], function (err, result) {
                if (err)
                    throw err;

            });
            }
            con.query("delete from cart",function (err, result) {
                if (err)
                    throw err;

            });
        });
    }
}
module.exports = EcommerceRepository;