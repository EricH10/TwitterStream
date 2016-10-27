'use strict';

/* Controllers */

var TwitterControllers = angular.module('TwitterControllers', []);

function addCntl($rootScope,$scope, $http, $location, twitterTracking, $timeout){

    $scope.trackedWordList = [];
    $scope.trackedWord = twitterTracking.createTrackedWord();


    $scope.postTrackedWord = function () {
        twitterTracking.addTrackedWord($scope.trackedWord).success(function (data, status) {
            $scope.trackedWordList.push(data);

        });
        $scope.trackedWord = twitterTracking.createTrackedWord();

    };

    $scope.startStream = function () {
        $http.post('http://localhost:8080/Tweets/stream');


    };
    $scope.stopStream = function () {
        $http.post('http://localhost:8080/Tweets/stream/stop');


    };
    $scope.delete = function ($index) {
        $scope.newWordList = $scope.trackedWordList;
        $http.delete('http://localhost:8080/Tweets/word/' + $scope.newWordList[$index].id).success(function (data, status) {
            $scope.trackedWordList.splice($index, 1);

        });
    };

    $scope.getTrackedWords = function () {
        twitterTracking.getTrackedWords().success(function (data, status) {
            $scope.trackedWordList = data;
        }).error(function (data, status) {
            alert("Error");
        });

    }};
    function AnalyzeCntl($rootScope, $scope, $http, $location, twitterTracking) {
        $scope.messageList = [];
        $scope.allMessageList = [];
        $scope.wordList = [];
        $scope.index = 0;
        $scope.date = twitterTracking.createDate();
        twitterTracking.getTrackedWords().success(function (data, status) {
            $scope.wordList = data;
        }).error(function (data, status) {
            alert("Error");
        });


        $scope.getMessages = function () {
            twitterTracking.getMessages().success(function (data, status) {
                $scope.allMessageList = data;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].trackedWords.id === (data[1].trackedWords.id)) {
                        $scope.messageList.push(data[i]);
                    }
                }
            }).error(function (data, status) {
                alert("Error");
            });
        };
        $scope.filterByDate = function(){
            $scope.tempMessageList = $scope.messageList;
            $scope.messageList = [];
            console.log($scope.date);
            for (var i = 0; i < $scope.tempMessageList.length; i++){

                if($scope.tempMessageList[i].date.indexOf($scope.date.date) > -1){
                    $scope.messageList.push($scope.tempMessageList[i]);
                    console.log($scope.tempMessageList[i]);
            }
        }
        };
        $scope.changeWord = function ($index) {
            $scope.index = $index;
            $scope.messageList = [];
            for (var i = 0; i < $scope.allMessageList.length; i++) {
                if ($scope.allMessageList[i].trackedWords.id === ($scope.wordList[$index].id)) {
                    $scope.messageList.push($scope.allMessageList[i]);
                }
            }
        }
        $scope.getTrackedWords = function () {
            twitterTracking.getTrackedWords().success(function (data, status) {
                $scope.trackedWordsList = data;

            }).error(function (data, status) {
                alert("Error");
            });

        };
    };
    function CompareCntl($rootScope, $scope, $http, $location, twitterTracking) {
        $scope.messageList = [];
        $scope.messageList2 = [];
        $scope.allMessageList = [];
        $scope.wordList = [];
        $scope.index = 0;
        $scope.date = twitterTracking.createDate();
        twitterTracking.getTrackedWords().success(function (data, status) {
            $scope.wordList = data;
        }).error(function (data, status) {
            alert("Error");
        });


        $scope.getMessages = function () {
            twitterTracking.getMessages().success(function (data, status) {
                $scope.allMessageList = data;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].trackedWords.id === (data[1].trackedWords.id)) {
                        $scope.messageList.push(data[i]);
                        $scope.messageList2.push(data[i]);
                    }
                }
            }).error(function (data, status) {
                alert("Error");
            });
        };

        $scope.changeWord = function ($index) {
            $scope.index = $index;
            $scope.messageList = [];
            for (var i = 0; i < $scope.allMessageList.length; i++) {
                if ($scope.allMessageList[i].trackedWords.id === ($scope.wordList[$index].id)) {
                    $scope.messageList.push($scope.allMessageList[i]);
                }
            }
        };
        $scope.changeWord2 = function ($index) {
            $scope.index = $index;
            $scope.messageList2 = [];
            for (var i = 0; i < $scope.allMessageList.length; i++) {
                if ($scope.allMessageList[i].trackedWords.id === ($scope.wordList[$index].id)) {
                    $scope.messageList2.push($scope.allMessageList[i]);
                }
            }
        };
        $scope.getTrackedWords = function () {
            twitterTracking.getTrackedWords().success(function (data, status) {
                $scope.trackedWordsList = data;

            }).error(function (data, status) {
                alert("Error");
            });

        };
    }
    function AnalyzeCntl($rootScope, $scope, $http, $location, twitterTracking) {
        $scope.messageList = [];
        $scope.allMessageList = [];
        $scope.wordList = [];
        $scope.index = 0;
        $scope.date = twitterTracking.createDate();
        twitterTracking.getTrackedWords().success(function (data, status) {
            $scope.wordList = data;
        }).error(function (data, status) {
            alert("Error");
        });


        $scope.getMessages = function () {
            twitterTracking.getMessages().success(function (data, status) {
                $scope.allMessageList = data;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].trackedWords.id === (data[1].trackedWords.id)) {
                        $scope.messageList.push(data[i]);
                    }
                }
            }).error(function (data, status) {
                alert("Error");
            });
        };
        $scope.filterByDate = function(){
            $scope.tempMessageList = $scope.messageList;
            $scope.messageList = [];
            console.log($scope.date);
            for (var i = 0; i < $scope.tempMessageList.length; i++){

                if($scope.tempMessageList[i].date.indexOf($scope.date.date) > -1){
                    $scope.messageList.push($scope.tempMessageList[i]);
                    console.log($scope.tempMessageList[i]);
            }
        }
        };
        $scope.changeWord = function ($index) {
            $scope.index = $index;
            $scope.messageList = [];
            for (var i = 0; i < $scope.allMessageList.length; i++) {
                if ($scope.allMessageList[i].trackedWords.id === ($scope.wordList[$index].id)) {
                    $scope.messageList.push($scope.allMessageList[i]);
                }
            }
        }
        $scope.getTrackedWords = function () {
            twitterTracking.getTrackedWords().success(function (data, status) {
                $scope.trackedWordsList = data;

            }).error(function (data, status) {
                alert("Error");
            });

        };
    }

function Maps($rootScope, $scope, $http, $location, twitterTracking) {
     $scope.allMessageList = [];
     twitterTracking.getMessages().success(function (data, status) {
            $scope.allMessageList = data;
        }).error(function (data, status) {
            alert("Error");
        });
      $scope.initMap = function (){
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: {lat: -34.397, lng: 150.644}
        });
        var geocoder = new google.maps.Geocoder();

        document.getElementById('submit').addEventListener('click', function() {
          geocodeAddress(geocoder, map);
        });
      };

      function geocodeAddress(geocoder, resultsMap) {
        for(var i = 0; i < $scope.allMessageList.length; i++){
            $scope.address = $scope.allMessageList[i].location;
            var address = $scope.address;
            console.log(address);
            geocoder.geocode({address: address}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                resultsMap.setCenter(results[0].geometry.location);
                
                var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
                });
            } else {
              //  alert('Geocode was not successful for the following reason: ' + status);
            }
            });
      }
  }
      }



