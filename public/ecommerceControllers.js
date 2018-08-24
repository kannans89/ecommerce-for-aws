angular.module('ecommerce-spa-app')
.controller('loginController',['$scope','$http','$rootScope','$timeout',function($scope,$http,$rootScope,$timeout){
    $rootScope.organizationId;
    $rootScope.current_user_id;
    $rootScope.current_user;
    $rootScope.cartNo;
    
    var url="http://localhost:5557/api/organization/customer/login";
    var url2="http://localhost:5557/api/organization/customer/getCart";
    $scope.isloggedin=false;
    $scope.login={
        username:"",
        password:""
    };
    $scope.login=function(){
        if($scope.validate($scope.login.username,$scope.login.password)){
        var authenticateUser={"username":$scope.login.username,"password":$scope.login.password};
        $http.post(url, authenticateUser)
        .success(function(response) {
            $scope.isloggedin=response.isAuthenticated;
            if(response.isAuthenticated==false){
                alert("Incorrect username or password");
            }
            else{
                $rootScope.organizationId=1;
                
                $rootScope.current_user_id=response.id;
                $rootScope.currentUsername=$scope.login.username;
                $rootScope.isloggedin=true;
                $rootScope.current_user=$scope.login.username;
                
                $http.get(url2)
                    .success(function(response) {
                        $rootScope.cartNo=parseInt(response);
                        $rootScope.count=$rootScope.cartNo;
                });
                location.href="http://localhost:5557/main.html#/bags";
            }
        });
        }
    }
    $scope.validate=function(u,p){
    if(u!="" && p!="")
        return true;
    else{
        if(u==""){
            $scope.ustar="*";
        }
        else{
            $scope.ustar="";
        }
        if(p==""){
            $scope.pstar="*";
        }
        else{
            $scope.pstar="";
        }
        return false;
    }
    }
    
}])
.controller('registerController',['$scope','$rootScope','$http','$timeout',function($scope,$rootScope,$http,$timeout){
    var url2="http://localhost:5557/api/organization/customers";
    $http.get(url2)
    .success(function(response) {
        response=parseInt(response);
        $rootScope.customer_guid=++response;
    });
    
    $scope.register={
        username:"",
        password:"",
        retype:"",
        date:""        
    };
    $scope.register=function(){
        var url="http://localhost:5557/api/organization/customer/register";
        var newUser={"customer_guid":$rootScope.customer_guid,"username":$scope.register.username,"password":$scope.register.password,"registration_date":"03/08/2018"};
        
        $http.post(url, newUser);
        
        alert("Register Successful! Please Login to continue");
        
        $timeout(function () {
            location.href="http://localhost:5557/main.html#/";
        }, 100);
    }
}])
.controller('categoryController',['$scope','$rootScope','$window','$http',function($scope,$rootScope,$window,$http){
    var url="http://localhost:5557/api/organization/customer/categories";
    $http.get(url)
    .success(function(response) {
        $scope.categories=response;
    });
    
}])
.controller('cartController',['$scope','$http','$rootScope','$timeout',function($scope,$http,$rootScope,$timeout){
    $scope.lineitems;
    var url="http://localhost:5557/api/organization/customer/categories";
    var url2="http://localhost:5557/api/organization/"+$rootScope.organizationId+"/customer/"+$rootScope.current_user_id+"/getCartItems";
    var url3="http://localhost:5557/api/organization/"+$rootScope.organizationId+"/customer/"+$rootScope.current_user_id+"/removeItem/";
    var url4="http://localhost:5557/api/organization/"+$rootScope.organizationId+"/customer/"+$rootScope.current_user_id+"/checkout";
    $http.get(url)
    .success(function(response) {
        $scope.categories=response;
    });
    refresh();
    function refresh(){
    $http.get(url2)
    .success(function(response) {
        $scope.lineitems=response;
    });
    }
    $scope.remove=function(no){
        if(confirm("Do you wish to remove this item?"))
        {
            $rootScope.count--;
        $http.delete(url3+no);
        alert("Item removed");
        $timeout(function () {
            refresh();
        }, 100);
        }
    }
    $scope.pay=function(){
        $http.post(url4,$scope.lineitems);
        alert("Checkout complete");
        $rootScope.count=0;
    }
    
}])
.controller('mobileController',['$scope','$http','$rootScope','$timeout',function($scope,$http,$rootScope,$timeout){
    $scope.q=[];
    $scope.mobiles;
    var url="http://localhost:5557/api/organization/customer/categories";
    var url1="http://localhost:5557/api/organization/customer/categories/mobiles";
    var url2="http://localhost:5557/api/organization/"+$rootScope.organizationId+"/customer/"+$rootScope.current_user_id+"/addToCart";
    $http.get(url)
    .success(function(response) {
        $scope.categories=response;
    });
    
    $http.get(url1)
    .success(function(response) {
        $scope.mobiles=response;
    });   
    
    $scope.add=function(name,price,category,product_guid,index){
        $rootScope.cartNo++;
        $rootScope.count=$rootScope.cartNo;
        var total=parseInt($scope.q[index])*parseInt(price);
        var lineitem={"no":$rootScope.cartNo,"name":name,"price":price,"qty":$scope.q[index],"totalPrice":total,"category":category,"product_guid":product_guid};
        console.log(lineitem);
        $http.post(url2,lineitem);
        alert("Item added to the cart");
        
    }

}])
.controller('bagController',['$scope','$http','$rootScope','$timeout',function($scope,$http,$rootScope,$timeout){
    $scope.q=[];
    $scope.bags;
    var url="http://localhost:5557/api/organization/customer/categories";
    var url1="http://localhost:5557/api/organization/customer/categories/bags";
    var url2="http://localhost:5557/api/organization/"+$rootScope.organizationId+"/customer/"+$rootScope.current_user_id+"/addToCart";
    $http.get(url)
    .success(function(response) {
        $scope.categories=response;
    });
    
    $http.get(url1)
    .success(function(response) {
        $scope.bags=response;
    });
    
    $scope.add=function(name,price,category,product_guid,index){
        $rootScope.cartNo++;
        $rootScope.count=$rootScope.cartNo;
        var total=parseInt($scope.q[index])*parseInt(price);
        var lineitem={"no":$rootScope.cartNo,"name":name,"price":price,"qty":$scope.q[index],"totalPrice":total,"category":category,"product_guid":product_guid};
        $http.post(url2,lineitem);
        alert("Item added to the cart");
        
    }
    $rootScope.changeHref=function(){
        location.href="http://localhost:5557/main.html#/cart";
    }
}])
.controller('laptopController',['$scope','$rootScope','$http',function($scope,$rootScope,$http){
    $scope.q=[];
    $scope.laptops;
    var url="http://localhost:5557/api/organization/customer/categories";
    var url1="http://localhost:5557/api/organization/customer/categories/laptops";
    var url2="http://localhost:5557/api/organization/"+$rootScope.organizationId+"/customer/"+$rootScope.current_user_id+"/addToCart";
    $http.get(url)
    .success(function(response) {
        $scope.categories=response;
    });
    
    $http.get(url1)
    .success(function(response) {
        console.log(response);
        $scope.laptops=response;
    });   
    $scope.add=function(name,price,category,product_guid,index){
        $rootScope.cartNo++;
        $rootScope.count=$rootScope.cartNo;
        var total=parseInt($scope.q[index])*parseInt(price);
        var lineitem={"no":$rootScope.cartNo,"name":name,"price":price,"qty":$scope.q[index],"totalPrice":total,"category":category,"product_guid":product_guid};
        console.log(lineitem);
        $http.post(url2,lineitem);
        alert("Item added to the cart");
        
    }
    
}]);
