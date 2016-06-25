
(function() {
    'use strict';
    var app = angular.module("matmutDrive", []);
    app.controller('pageController', function() {
        this.page = '0';

        this.isSet = function(checkPage) {
            return this.page == checkPage;
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
                var freeChampCtrl = this;
                freeChampCtrl.freeChamps = [];
                freeChampCtrl.freeChampsInfo = [];

                $http.get('src/Routes/getFreeChamps.php').success(function(data) {
                    freeChampCtrl.freeChamps = data;
                    freeChampCtrl.tab = freeChampCtrl.freeChamps[0].id;
                });

                freeChampCtrl.isSet = function(checkTab) {
                    return freeChampCtrl.tab == checkTab;
                };

                freeChampCtrl.setTab = function(activeTab) {
                    freeChampCtrl.tab = activeTab;
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
                var myChampCtrl = this;
                myChampCtrl.champs = [];
                myChampCtrl.champsNotOwned = [];
                myChampCtrl.toggle = false;
                myChampCtrl.showAdd = false;

                myChampCtrl.addChamp = function(idChamp) {
                    $http.get('src/Routes/addChamps.php?idChamp=' + idChamp);
                    for (var i = 0; i < myChampCtrl.getChampsNotOwned().length ; i++) {
                        if (myChampCtrl.getChampsNotOwned()[i].id == idChamp) {
                            myChampCtrl.getChamps().push(myChampCtrl.getChampsNotOwned()[i]);
                            myChampCtrl.getChampsNotOwned().splice(i, 1);
                        }
                    }
                };
            },
            controllerAs: "trajet"
        };
    }]);
})();