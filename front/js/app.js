
(function() {
    'use strict';
    var app = angular.module("matmutDrive", []);
    app.controller('pageController', function() {
        this.page = 0;

        this.isSet = function(checkPage) {
            return this.page === checkPage;
        };

        this.setPage = function(activePage) {
            this.page = activePage;
        };
    });

    app.directive('classementPage', ['$http', function($http) {
        return {
            restrict: "E",
            templateUrl: "views/classement.html",
            controller: function($http) {
                var classmentCtrl = this;
                classmentCtrl.tab = 0;

                classmentCtrl.isSet = function(checkTab) {
                    return classmentCtrl.tab == checkTab;
                };

                classmentCtrl.setTab = function(activeTab) {
                    classmentCtrl.tab = activeTab;
                };
            },
            controllerAs: "classement"
        };
    }]);

    app.directive('trajetPage', ['$http',  function ($http) {
        return {
            restrict: "E",
            templateUrl: "views/trajet.html",
            controller: function($http) {
            },
            controllerAs: "trajet"
        };
    }]);
})();