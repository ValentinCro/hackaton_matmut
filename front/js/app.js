
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

    app.directive('resumeTrajetPage', ['$http', function($http) {
        return {
            restrict: "E",
            templateUrl: "views/resumeTrajet.html",
            controller: function($http) {
                var classementCtrl = this;
                classementCtrl.tab = 0;

            },
            controllerAs: "resume"
        };
    }]);

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
                trajet.vitesseMax = 50;
                trajet.tendance = 0;
                trajet.goodDriveKm = 0;
                trajet.bagDriveKm = 0;
                trajet.latitude = null;
                trajet.longitude = null;
                if ("geolocation" in navigator) {
                    /* geolocation is available */
                    trajet.started = false;

                    trajet.geo_success = function (position) {
                        if (trajet.latitude !== position.coords.latitude
                            || trajet.longitude !== position.coords.longitude) {
                            trajet.oldLatitude = trajet.latitude;
                            trajet.latitude = position.coords.latitude;
                            trajet.oldLongitude = trajet.longitude;
                            trajet.longitude = position.coords.longitude;

                            if (position.coords.speed === null) {
                                trajet.speed = 0;
                                var dist = trajet.calculDistance(trajet.oldLatitude, trajet.latitude,
                                trajet.oldLongitude, trajet.longitude);
                                if (trajet.speed > trajet.vitesseMax) {
                                    trajet.tendance -= 0.1;
                                    trajet.bagDriveKm += dist;
                                } else {
                                    trajet.tendance += 0.01;
                                    trajet.goodDriveKm += dist;
                                }
                            } else {
                                trajet.speed = position.coords.speed / 1000;
                            }
                        }
                    };

                    trajet.geo_error = function() {
                        console.log("Sorry, no position available.");
                    };

                    trajet.geo_options = {
                        enableHighAccuracy: true,
                        maximumAge        : 30000,
                        timeout           : 30
                    };

                    navigator.geolocation.watchPosition(trajet.geo_success, trajet.geo_error, trajet.geo_options);

                    trajet.isUp = function() {
                        return trajet.tendance > 0;
                    }

                    trajet.isDown = function() {
                        return trajet.tendance < 0;
                    }

                    trajet.getTendance = function() {
                        return trajet.tendance;
                    }

                    trajet.isNeutral = function() {
                        return trajet.tendance === 0;
                    }

                    trajet.getCurrentLatitude = function() {
                        return trajet.latitude;
                    };

                    trajet.getCurrentLongitude = function() {
                        return trajet.longitude;
                    };

                    trajet.getSpeed = function() {
                        return trajet.speed;
                    };

                    trajet.calculDistance = function(lat1, lat2, lon1, lon2){
                        var delta1 = lat1.toRadians();
                        var delta2 = lat2.toRadians();
                        var lambda = (lon2-lon1).toRadians();
                        var R = 6371e3; // gives d in metres
                        var d = Math.acos( Math.sin(delta1)*Math.sin(delta2) + Math.cos(delta1)*Math.cos(delta2)
                                * Math.cos(lambda) ) * R;
                        return d / 1000;
                    };
                } else {
                    /* geolocation IS NOT available */
                }
            },
            controllerAs: "trajet"
        };
    }]);
})();