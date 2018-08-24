var EcommerceService = require('./EcommerceService');
var svc = new EcommerceService();
function EcommerceController(app) {
    app.post('/api/organization/customer/register', (req, res) => {
        console.log("REGISTER");
        req.on('data', function (newUser) {
            svc.register(JSON.parse(newUser.toString()));
        });
    })
        .post('/api/organization/customer/login', (req, res) => {
            console.log("LOGIN");
            req.on('data', function (user) {
                svc.authenticateUser(JSON.parse(user.toString()), (authenticationRes) => {
                    res.send(authenticationRes);
                });
            }); 
        })
        .get('/api/organization/customer/getCart', (req, res) => {
            console.log("hi");
            svc.getCart((cart) => {
                res.send(cart);
            })
        })
        .get('/api/organization/customers', (req, res) => {
            svc.getCustomers((customers) => {
                res.send(customers);
            })
        })
        .get('/api/organization/:orgId*?/customer/:customerId*?/getCartItems', (req, res) => {
            svc.getCartItems((items) => {
                res.json(items);
            })
        })
        .delete('/api/organization/:orgId*?/customer/:customerId*?/removeItem/:no*?', (req, res) => { 
            svc.removeItem(parseInt(req.params.no)); 
        })        
        .get('/api/organization/customer/categories', (req, res) => {
            svc.getCategories((categories) => {
                res.json(categories);
            })
        })
        .get('/api/organization/customer/categories/mobiles', (req, res) => {
            svc.getMobiles((mobiles) => {
                res.json(mobiles);
            })
        })
        .get('/api/organization/customer/categories/bags', (req, res) => {
            svc.getBags((bags) => {
                res.json(bags);
            })
        })
        .get('/api/organization/customer/categories/laptops', (req, res) => {
            svc.getLaptops((laptops) => {
                
                res.json(laptops);
            })
        })
        .post('/api/organization/:orgId*?/customer/:customerId*?/addToCart', (req, res) => {
            console.log("add to cart");
            req.on('data', function (lineitem) {
                svc.addToCart(JSON.parse(lineitem.toString()),req.params.orgId,req.params.customerId);
            });
        })
        .post('/api/organization/:orgId*?/customer/:customerId*?/checkout', (req, res) => {
            req.on('data', function (lineitem) {
                
                svc.checkout(JSON.parse(lineitem.toString()),req.params.customerId);
            });
        })
        .listen(5557, () => console.log('app listening on port 5557'));
}
module.exports = EcommerceController;