angular.module('ecommerce-spa-app',['ngRoute'])
.config(function($routeProvider){
    $routeProvider
    .when("/", {
        controller:"loginController",
        templateUrl : "partials/login.html"
    })
    .when("/register", {
        controller:"registerController",
        templateUrl : "partials/register.html"
    })
    .when("/category", {
        controller:"categoryController",
        templateUrl : "partials/category.html"
    })
    .when("/mobiles", {
        controller:"mobileController",
        templateUrl : "partials/mobile.html"
    })
    .when("/laptops", {
        controller:"laptopController",
        templateUrl : "partials/laptop.html"
    })
    .when("/bags", {
        controller:"bagController",
        templateUrl : "partials/bag.html"
    })
    .when("/cart", {
        controller:"cartController",
        templateUrl : "partials/cart.html"
    });
})