
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
                var classementCtrl = this;
                classementCtrl.tab = 0;

                classementCtrl.isSet = function(checkTab) {
                    return classementCtrl.tab == checkTab;
                };

                classementCtrl.setTab = function(activeTab) {
                    classementCtrl.tab = activeTab;
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
                var trajet = this;
                if ("geolocation" in navigator) {
                    /* geolocation is available */
                    var watchID = navigator.geolocation.watchPosition(function(position) {
                        trajet.latitude = position.coords.latitude;
                        trajet.longitude = position.coords.longitude;
                        console.log(trajet.latitude);
                    });

                    trajet.getCurrentLatitude = function() {
                        return trajet.longitude;
                    };

                    trajet.getCurrentLongitude = function() {
                        return trajet.latitude;

                    };
                } else {
                    /* geolocation IS NOT available */
                }
            },
            controllerAs: "trajet"
        };
    }]);
})();