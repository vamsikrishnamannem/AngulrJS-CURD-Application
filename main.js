
var module = angular.module('myApp', ['ngRoute']);

module.config(function($routeProvider) {
		$routeProvider.when('/', {
	        templateUrl : 'home.html',
	        controller  : 'ContactController'
	    }).when('/add', {
	        templateUrl : 'addnew.html',
	        controller  : 'ContactController'
	    }).when('/edit', {
            templateUrl : 'edit.html',
            controller  : 'ContactEditController'
        }).otherwise({redirectTo: '/'});

	}).service('ContactService', function () {
    //to create unique contact id
    var uid = 2;
    
    //contacts array to hold list of all contacts
    var contacts = [];
    
    //save method create a new contact if not already exists
    //else update the existing object
    this.save = function (contact) {
        if (contact.id == null) {
            //if this is new contact, add it in contacts array
            contact.id = uid++;
            contacts.push(contact);
        } else {
            //for existing contact, find this contact using id
            //and update it.
            for (i in contacts) {
                if (contacts[i].id == contact.id) {
                    contacts[i] = contact;
                }
            }
        }
    }

    //simply search contacts list for given id
    //and returns the contact object if found
    this.get = function (id) {
        for (i in contacts) {
            if (contacts[i].id == id) {
                return contacts[i];
            }
        }

    }
    
    //iterate through contacts list and delete 
    //contact if found
    this.delete = function (id) {
        for (i in contacts) {
            if (contacts[i].id == id) {
                contacts.splice(i, 1);
            }
        }
    }

    //simply returns the contacts list
    this.list = function () {
        return contacts;
    }

    this.editContact = {};
});

module.controller('ContactController', function ($scope, ContactService , $location) {

    $scope.contacts = ContactService.list();
    $scope.buttontext = "Create";
    $scope.saveContact = function () {
        ContactService.save($scope.newcontact);
        $scope.newcontact = {};
        $location.path("/");
    }

    $scope.delete = function (id) {
        ContactService.delete(id);
    }

    $scope.addnew = function(id) {
        $location.path("/add");
    }
});

module.controller('ContactEditController', function ($scope, ContactService , $location) {

    $scope.contacts = ContactService.list();
    $scope.buttontext = "Update";
    $scope.saveContact = function () {
        ContactService.save($scope.newcontact);
        $scope.newcontact = {};
        ContactService.editContact = {};
        $location.path("/");
    }

    $scope.edit = function (contact) {
        $location.path("/edit");
        ContactService.editContact = contact;
    }
    $scope.newcontact = ContactService.editContact;
});