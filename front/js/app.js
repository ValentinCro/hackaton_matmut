
(function() {
    'use strict';
    var app = angular.module("matmutDrive", []);


    app.controller('pageController',['$http', function($http) {
        var pageController = this
        pageController.globalPoint;
        pageController.sentence = [];

        $http({
            method: 'GET',
            url: 'http://146.185.183.44/app_dev.php/users/toto/points'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            pageController.globalPoint = response.data.points[0].user.point_global;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

        pageController.getGlobalPoint = function() {
            return pageController.globalPoint;
        };

        $http({
            method: 'GET',
            url: 'http://146.185.183.44/app_dev.php/advice'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            pageController.sentence = response.data.advices;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

        pageController.getSentence = function() {
            if (pageController.sentence.length > 0) {
                var sentence = Math.floor((Math.random() * pageController.sentence.length));
                return pageController.sentence[sentence].text;
            }
        };
        pageController.page = 0;

        pageController.isSet = function(checkPage) {
            return pageController.page === checkPage;
        };

        pageController.setPage = function(activePage) {
            pageController.page = activePage;
        };
    }]);

    app.directive('myTrajetPage', ['$http', function($http) {
        return {
            restrict: "E",
            templateUrl: "views/myTrajet.html",
            controller: function($http) {
                var myTrajetPage = this;
                myTrajetPage.tab = [];
                $http({
                    method: 'GET',
                    url: 'http://146.185.183.44/app.php/users/toto/trajets'
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    myTrajetPage.tab = response.data;
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

                myTrajetPage.getData = function() {
                    return myTrajetPage.tab;
                };
            },
            controllerAs: "myTrajet"
        };
    }]);

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
                classementCtrl.data = [];

                classementCtrl.isSet = function(checkTab) {
                    return classementCtrl.tab == checkTab;
                };

                classementCtrl.setTab = function(activeTab) {
                    classementCtrl.tab = activeTab;
                };

                $http({
                    method: 'GET',
                    url: 'http://146.185.183.44/app_dev.php/users'
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    classementCtrl.data = response.data;
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

                classementCtrl.getData = function() {
                    return classementCtrl.data;
                };
            },
            controllerAs: "classement"
        };
    }]);

    app.directive('trajetPage', ['$http', '$interval', function ($http) {
        return {
            restrict: "E",
            templateUrl: "views/trajet.html",
            controller: function() {
                var trajet = this;
                trajet.vitesseMax = 50;
                trajet.tendance = 0;
                trajet.keepTendance = 0;
                trajet.goodDriveKm = 0;
                trajet.badDriveKm = 0;
                trajet.latitude = null;
                trajet.longitude = null;
                if ("geolocation" in navigator) {
                    /* geolocation is available */
                    trajet.started = false;

                    trajet.geo_success = function (position) {

                        if (position.coords.speed === null) {
                            trajet.speed = 0;
                        } else {
                            trajet.speed = position.coords.speed / 1000;
                        }
                        if (trajet.started
                            && (trajet.latitude !== position.coords.latitude
                            || trajet.longitude !== position.coords.longitude) && trajet.speed !== 0) {
                            trajet.oldLatitude = trajet.latitude;
                            trajet.latitude = position.coords.latitude;
                            trajet.oldLongitude = trajet.longitude;
                            trajet.longitude = position.coords.longitude;

                            var dist = trajet.calculDistance(trajet.oldLatitude, trajet.latitude,
                            trajet.oldLongitude, trajet.longitude);
                            if (trajet.speed > trajet.vitesseMax) {
                                trajet.tendance -= 0.1;
                                trajet.badDriveKm += dist;
                            } else {
                                trajet.tendance += 0.01;
                                trajet.goodDriveKm += dist;
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

                    trajet.start = function() {
                        trajet.started = true;
                    };

                    trajet.stop = function() {
                        trajet.started = false;
                        $.post( "http://146.185.183.44/app.php/users/toto/trajets", {
                            //trajet: "{\"km_good\":" + trajet.goodDriveKm +
                            trajet: "{\"km_good\":" + trajet.goodDriveKm + ",\"km_not_good\":" + trajet.badDriveKm + "}" })
                            .done(function( data ) {
                                console.log( "Data Loaded: " + data );
                            });
                        trajet.keepTendance = trajet.tendance;
                        trajet.tendance = 0;
                        trajet.goodDriveKm = 0;
                        trajet.badDriveKm = 0;
                    };

                    trajet.isUp = function() {
                        return trajet.tendance > 0;
                    };

                    trajet.isDown = function() {
                        return trajet.tendance < 0;
                    };

                    trajet.getTendance = function() {
                        return trajet.tendance;
                    };


                    trajet.getKeepTendance = function() {
                        return trajet.keepTendance;
                    };
                    trajet.isNeutral = function() {
                        return trajet.tendance == 0;
                    };

                    trajet.getCurrentLatitude = function() {
                        return trajet.latitude;
                    };

                    trajet.getCurrentLongitude = function() {
                        return trajet.longitude;
                    };

                    trajet.getSpeed = function() {
                        return trajet.speed;
                    };

                    trajet.deg2rad = function(deg) {
                        return deg * (Math.PI/180)
                    };

                    trajet.calculDistance = function(lat1, lat2, lon1, lon2){
                        var R = 6371; // Radius of the earth in km
                        var dLat = trajet.deg2rad(lat2-lat1);  // deg2rad below
                        var dLon = trajet.deg2rad(lon2-lon1);
                        var a =
                                Math.sin(dLat/2) * Math.sin(dLat/2) +
                                Math.cos(trajet.deg2rad(lat1)) * Math.cos(trajet.deg2rad(lat2)) *
                                Math.sin(dLon/2) * Math.sin(dLon/2)
                            ;
                        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                        var d = R * c; // Distance in km
                        return d;
                    };
                } else {
                    /* geolocation IS NOT available */
                }
            },
            controllerAs: "trajet"
        };
    }]);
})();