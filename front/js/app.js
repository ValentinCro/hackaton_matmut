
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

    app.directive('trajetPage', ['$http', '$interval', function ($http) {
        return {
            restrict: "E",
            templateUrl: "views/trajet.html",
            controller: function($http) {
                var trajet = this;
                trajet.latitude = null;
                trajet.longitude = null;
                if ("geolocation" in navigator) {
                    /* geolocation is available */
                    trajet.started = false;

                    trajet.geo_success = function (position) {
                        trajet.latitude = position.coords.latitude;
                        trajet.longitude = position.coords.longitude;
                        if (position.coords.speed === null) {
                            trajet.speed = 0;
                        } else {
                            trajet.speed = position.coords.speed / 1000;
                        }
                    };

                    trajet.geo_error = function() {
                        console.log("Sorry, no position available.");
                    };

                    trajet.geo_options = {
                        enableHighAccuracy: true,
                        maximumAge        : 30000,
                        timeout           : 1
                    };

                    navigator.geolocation.watchPosition(trajet.geo_success, trajet.geo_error, trajet.geo_options);

                    trajet.getCurrentLatitude = function() {
                        return trajet.latitude;
                    };

                    trajet.getCurrentLongitude = function() {
                        return trajet.longitude;
                    };

                    trajet.getSpeed = function() {
                        return trajet.speed;
                    };
                } else {
                    /* geolocation IS NOT available */
                }
            },
            controllerAs: "trajet"
        };
    }]);
})();