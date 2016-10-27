'use strict';

/* Filters */

angular.module('TwitterFilters', []).filter('sumOfValues', function () {
    return function (scoreCard) {
//        if (typeof (scoreCard.score) === 'undefined') {
//            return 0;
//        }
        var sum = 0;
        
        for (var i = 0; i < scoreCard.hole.length; i++) {
            sum = sum + scoreCard.hole[i].score;
            
        }
           scoreCard.score = sum;
        return scoreCard.score;
    }
  }
);
