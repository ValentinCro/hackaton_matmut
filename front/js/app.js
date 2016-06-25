
(function() {
    'use strict';
    var app = angular.module("matmutDrive", []);
    (function() {
        'use strict';
        var app = angular.module("lolRandom", []);
        app.connected = false;
        app.controller('pageController', function() {
            this.page = '0';

            this.isSet = function(checkPage) {
                return this.page == checkPage;
            };

            this.setPage = function(activePage) {
                this.page = activePage;
            };
        });

        app.directive('freeChamp', ['$http', function($http) {
            return {
                restrict: "E",
                templateUrl: "views/freeChamp.html",
                controller: function($http) {
                    var freeChampCtrl = this;
                    freeChampCtrl.freeChamps = [];
                    freeChampCtrl.freeChampsInfo = [];
                    this.underTab = 1;
                    freeChampCtrl.load = false;

                    $http.get('src/Routes/getFreeChamps.php').success(function(data) {
                        freeChampCtrl.freeChamps = data;
                        freeChampCtrl.tab = freeChampCtrl.freeChamps[0].id;
                    });

                    $http.get('src/Routes/getFreeChampsInfo.php').success(function(data) {
                        freeChampCtrl.freeChampsInfo = data;
                        freeChampCtrl.load = true;
                    });


                    freeChampCtrl.isLoaded = function() {
                        return freeChampCtrl.load;
                    };

                    freeChampCtrl.isSet = function(checkTab) {
                        return freeChampCtrl.tab == checkTab;
                    };

                    freeChampCtrl.setTab = function(activeTab) {
                        freeChampCtrl.tab = activeTab;
                    };

                    freeChampCtrl.isUnderSet = function(checkTab) {
                        return freeChampCtrl.underTab == checkTab;
                    };

                    freeChampCtrl.setUnderTab = function(activeTab) {
                        freeChampCtrl.underTab = activeTab;
                    };
                },
                controllerAs: "freeChamp"
            };
        }]);

        app.directive('connectionPage', function() {
            return {
                restrict:'E',
                templateUrl:'views/connection.html'
            };
        });

        app.controller('connectionController', ['$http', function($http) {
            var ctrl = this;
            ctrl.pseudo = "";

            $http.get('src/Routes/getCookie.php').success(function(data) {
                if (data != 'null') {
                    app.connected = true;
                    ctrl.pseudo = data;
                }
            });

            ctrl.isConnected = function() {
                return app.connected;
            };

            ctrl.destroyCookie = function() {
                $http.get('src/Routes/destroyCookie.php').success(function(data) {
                    app.connected = false;
                    ctrl.pseudo = "";
                });
            };

            ctrl.connect = function() {
                var pseudo = $("#pseudo").val();
                var pass = $("#password").val();

                $.post( "src/Routes/connectUser.php", { pseudo: pseudo, password: pass }).done(function (data) {
                    if (data == 1) {
                        ctrl.pseudo = pseudo;
                        app.connected = true;
                        $http.get('src/Routes/createCookie.php?pseudo=' + pseudo);
                    }
                });
            };
        } ]);

        app.directive('myChamp', ['$http', '$interval', function ($http, $interval) {
            return {
                restrict: "E",
                templateUrl: "views/myChamp.html",
                controller: function($http) {
                    var myChampCtrl = this;
                    myChampCtrl.champs = [];
                    myChampCtrl.champsNotOwned = [];
                    myChampCtrl.toggle = false;
                    myChampCtrl.showAdd = false;

                    var interval = $interval(function(){
                        if (app.connected) {
                            $http.get('src/Routes/getChampsUser.php').success(function(data) {
                                myChampCtrl.champs = data;
                            });

                            $http.get('src/Routes/getChampsNotOwned.php').success(function(data) {
                                myChampCtrl.champsNotOwned = data;
                            });
                            $interval.cancel(interval);
                        }
                    }, 1000);

                    myChampCtrl.getChamps = function() {
                        return myChampCtrl.champs;
                    };

                    myChampCtrl.getChampsNotOwned = function() {
                        return myChampCtrl.champsNotOwned;
                    };

                    myChampCtrl.isShowAdd = function() {
                        return myChampCtrl.showAdd;
                    };

                    myChampCtrl.toggleAdd = function() {
                        myChampCtrl.showAdd = !myChampCtrl.showAdd;
                    };

                    myChampCtrl.isShow = function() {
                        return myChampCtrl.toggle;
                    };

                    myChampCtrl.toggleEdit = function() {
                        myChampCtrl.toggle = !myChampCtrl.toggle;
                    };

                    myChampCtrl.removeChamp = function(idChamp) {
                        $http.get('src/Routes/deleteChamps.php?idChamp=' + idChamp);
                        for (var i = 0; i < myChampCtrl.getChamps().length ; i++) {
                            if (myChampCtrl.getChamps()[i].id == idChamp) {
                                myChampCtrl.getChampsNotOwned().push(myChampCtrl.getChamps()[i]);
                                myChampCtrl.getChamps().splice(i, 1);
                            }
                        }
                    };

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
                controllerAs: "myChamp"
            };
        }]);

        app.directive('gameCtrl', ['$http', '$interval', function ($http, $interval) {
            return {
                restrict: "E",
                templateUrl: "views/game.html",
                controller: function($http, $interval) {
                    var gameCtrl = this;
                    gameCtrl.games = [];
                    gameCtrl.tab = -1;

                    gameCtrl.refreshGames = function() {
                        gameCtrl.games = [];
                        $http.get('src/Routes/getGames.php').success(function(data) {
                            for (var i = 0; i < data.length; i++) {
                                gameCtrl.games.push(JSON.parse(data[i]));
                            }
                        });
                    };

                    gameCtrl.isSet = function(checkTab) {
                        return gameCtrl.tab == checkTab;
                    };

                    gameCtrl.setTab = function(activeTab) {
                        gameCtrl.tab = activeTab;
                    };


                    gameCtrl.getGames = function() {
                        return gameCtrl.games;
                    };

                    gameCtrl.createGame = function() {
                        var gameName = $('input[name="gameName"]').val();
                        var gameMode = $('input[name="gameMode"]:checked').val();
                        var gameRestriction = $('input[name="gameRestriction"]:checked').val();
                        var url = 'src/Routes/createGames.php?gameName=' + gameName
                            + '&gameMode=' + gameMode + '&gameRestriction=' + gameRestriction;
                        console.log(url);
                        $http.get(url).success(function(data) {
                            $http.get('src/Routes/getGames.php').success(function(data) {
                                gameCtrl.games = [];
                                for (var i = 0; i < data.length; i++) {
                                    gameCtrl.games.push(JSON.parse(data[i]));
                                }
                                gameCtrl.tab = gameCtrl.games.length;
                            });
                        });
                    };
                },
                controllerAs: "game"
            };
        }]);
    })();
    app.connected = false;
    app.controller('pageController', function() {
        this.page = '0';

        this.isSet = function(checkPage) {
            return this.page == checkPage;
        };

        this.setPage = function(activePage) {
            this.page = activePage;
        };
    });

    app.directive('freeChamp', ['$http', function($http) {
        return {
            restrict: "E",
            templateUrl: "views/freeChamp.html",
            controller: function($http) {
                var freeChampCtrl = this;
                freeChampCtrl.freeChamps = [];
                freeChampCtrl.freeChampsInfo = [];
                this.underTab = 1;
                freeChampCtrl.load = false;

                $http.get('src/Routes/getFreeChamps.php').success(function(data) {
                    freeChampCtrl.freeChamps = data;
                    freeChampCtrl.tab = freeChampCtrl.freeChamps[0].id;
                });

                $http.get('src/Routes/getFreeChampsInfo.php').success(function(data) {
                    freeChampCtrl.freeChampsInfo = data;
                    freeChampCtrl.load = true;
                });


                freeChampCtrl.isLoaded = function() {
                    return freeChampCtrl.load;
                };

                freeChampCtrl.isSet = function(checkTab) {
                    return freeChampCtrl.tab == checkTab;
                };

                freeChampCtrl.setTab = function(activeTab) {
                    freeChampCtrl.tab = activeTab;
                };

                freeChampCtrl.isUnderSet = function(checkTab) {
                    return freeChampCtrl.underTab == checkTab;
                };

                freeChampCtrl.setUnderTab = function(activeTab) {
                    freeChampCtrl.underTab = activeTab;
                };
            },
            controllerAs: "freeChamp"
        };
    }]);

    app.directive('connectionPage', function() {
        return {
            restrict:'E',
            templateUrl:'views/connection.html'
        };
    });

    app.controller('connectionController', ['$http', function($http) {
        var ctrl = this;
        ctrl.pseudo = "";

        $http.get('src/Routes/getCookie.php').success(function(data) {
            if (data != 'null') {
                app.connected = true;
                ctrl.pseudo = data;
            }
        });

        ctrl.isConnected = function() {
            return app.connected;
        };

        ctrl.destroyCookie = function() {
            $http.get('src/Routes/destroyCookie.php').success(function(data) {
                app.connected = false;
                ctrl.pseudo = "";
            });
        };

        ctrl.connect = function() {
            var pseudo = $("#pseudo").val();
            var pass = $("#password").val();

            $.post( "src/Routes/connectUser.php", { pseudo: pseudo, password: pass }).done(function (data) {
                if (data == 1) {
                    ctrl.pseudo = pseudo;
                    app.connected = true;
                    $http.get('src/Routes/createCookie.php?pseudo=' + pseudo);
                }
            });
        };
    } ]);

    app.directive('myChamp', ['$http', '$interval', function ($http, $interval) {
        return {
            restrict: "E",
            templateUrl: "views/myChamp.html",
            controller: function($http) {
                var myChampCtrl = this;
                myChampCtrl.champs = [];
                myChampCtrl.champsNotOwned = [];
                myChampCtrl.toggle = false;
                myChampCtrl.showAdd = false;

                var interval = $interval(function(){
                    if (app.connected) {
                        $http.get('src/Routes/getChampsUser.php').success(function(data) {
                            myChampCtrl.champs = data;
                        });

                        $http.get('src/Routes/getChampsNotOwned.php').success(function(data) {
                            myChampCtrl.champsNotOwned = data;
                        });
                        $interval.cancel(interval);
                    }
                }, 1000);

                myChampCtrl.getChamps = function() {
                    return myChampCtrl.champs;
                };

                myChampCtrl.getChampsNotOwned = function() {
                    return myChampCtrl.champsNotOwned;
                };

                myChampCtrl.isShowAdd = function() {
                    return myChampCtrl.showAdd;
                };

                myChampCtrl.toggleAdd = function() {
                    myChampCtrl.showAdd = !myChampCtrl.showAdd;
                };

                myChampCtrl.isShow = function() {
                    return myChampCtrl.toggle;
                };

                myChampCtrl.toggleEdit = function() {
                    myChampCtrl.toggle = !myChampCtrl.toggle;
                };

                myChampCtrl.removeChamp = function(idChamp) {
                    $http.get('src/Routes/deleteChamps.php?idChamp=' + idChamp);
                    for (var i = 0; i < myChampCtrl.getChamps().length ; i++) {
                        if (myChampCtrl.getChamps()[i].id == idChamp) {
                            myChampCtrl.getChampsNotOwned().push(myChampCtrl.getChamps()[i]);
                            myChampCtrl.getChamps().splice(i, 1);
                        }
                    }
                };

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
            controllerAs: "myChamp"
        };
    }]);

    app.directive('gameCtrl', ['$http', '$interval', function ($http, $interval) {
        return {
            restrict: "E",
            templateUrl: "views/game.html",
            controller: function($http, $interval) {
                var gameCtrl = this;
                gameCtrl.games = [];
                gameCtrl.tab = -1;

                gameCtrl.refreshGames = function() {
                    gameCtrl.games = [];
                    $http.get('src/Routes/getGames.php').success(function(data) {
                        for (var i = 0; i < data.length; i++) {
                            gameCtrl.games.push(JSON.parse(data[i]));
                        }
                    });
                };

                gameCtrl.isSet = function(checkTab) {
                    return gameCtrl.tab == checkTab;
                };

                gameCtrl.setTab = function(activeTab) {
                    gameCtrl.tab = activeTab;
                };


                gameCtrl.getGames = function() {
                    return gameCtrl.games;
                };

                gameCtrl.createGame = function() {
                    var gameName = $('input[name="gameName"]').val();
                    var gameMode = $('input[name="gameMode"]:checked').val();
                    var gameRestriction = $('input[name="gameRestriction"]:checked').val();
                    var url = 'src/Routes/createGames.php?gameName=' + gameName
                        + '&gameMode=' + gameMode + '&gameRestriction=' + gameRestriction;
                    console.log(url);
                    $http.get(url).success(function(data) {
                        $http.get('src/Routes/getGames.php').success(function(data) {
                            gameCtrl.games = [];
                            for (var i = 0; i < data.length; i++) {
                                gameCtrl.games.push(JSON.parse(data[i]));
                            }
                            gameCtrl.tab = gameCtrl.games.length;
                        });
                    });
                };
            },
            controllerAs: "game"
        };
    }]);
})();