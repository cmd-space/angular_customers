var myApp = angular.module('customer', ['ngRoute']);
        
myApp.config(function($routeProvider){
    $routeProvider
        .when('/customers',{
            templateUrl: 'partials/customers.html'
        })
        .when('/orders', {
            templateUrl: 'partials/orders.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});

myApp.factory('customerFactory', function(){
    var customers = [
        {name: 'Michael Choi', date: new Date(2015, 4, 18)}, 
        {name: 'John Supsupin', date: new Date(2015, 1, 12)}, 
        {name: 'Trey Villafane', date: new Date(2015, 0, 01)}, 
        {name: 'India Meisner', date: new Date(2015, 3, 19)}];
    var items = ['Nike Shoes', 'Black Belts', 'Ice Cream', 'Candy'];
    var orders = [
        {name: 'Michael Choi', item: 'Nike Shoes', quantity: 2, date: new Date(2014, 3, 3)},
        {name: 'John Supsupin', item: 'Black Belts', quantity: 3, date: new Date(2014, 3, 3)},
        {name: 'Trey Villafane', item: 'Ice Cream', quantity: 5, date: new Date(2014, 3, 1)},
        {name: 'India Meisner', item: 'Candy', quantity: 15, date: new Date(2014, 2, 15)}];
    var factory = {};
    factory.getCustomers = function(callback){
        callback(customers);
    }
    factory.getItems = function(callback){
        callback(items);
    }
    factory.getOrders = function(callback){
        callback(orders);
    }
    return factory;
});

myApp.controller('customersController', function($scope, customerFactory){
    $scope.customers = [];
    customerFactory.getCustomers(function(data){
        $scope.customers = data;
    });
    $scope.addCustomer = function(){
        var exists = true;
        for(var i = 0;i < $scope.customers.length; i++){
            if($scope.customers[i].name === $scope.newCustomer.name){
                alert('Customer already exists! ' + $scope.customers[i].name);
                exists = false;
                return exists;
            }
        }
        if(exists === true){
                $scope.newCustomer.date = new Date();
                $scope.customers.push($scope.newCustomer);
                $scope.newCustomer = {};
        }
    }
    $scope.removeCustomer = function(customer){
        $scope.customers.splice($scope.customers.indexOf(customer), 1);
    }
});

myApp.controller('ordersController', function($scope, customerFactory){
    $scope.orders = [];
    $scope.items = [];
    customerFactory.getItems(function(data){
        $scope.items = data;
    });
    customerFactory.getOrders(function(data){
        $scope.orders = data;
    });
    $scope.quantity = [];
    for(var i = 1; i <= 30; i++) {
        $scope.quantity.push(i);
    }
    $scope.addOrder = function(){
        $scope.newOrder.date = new Date();
        $scope.orders.push($scope.newOrder)
    }
});