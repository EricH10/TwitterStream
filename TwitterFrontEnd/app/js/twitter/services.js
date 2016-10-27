

/* Services */

var twitterServices = angular.module('twitterServices', ['ngResource']);

twitterServices.factory('twitterTracking', function($http) {

return {
    
    getScoreCard: function(scoreCard) {
    
    savedScoreCard = scoreCard;
    return scoreCard;
    },
    
    getTrackedWords: function(){
        
       
        trackedWordsList = $http({method : 'GET',url : 'http://localhost:8080/Tweets/word'});
    
        return trackedWordsList;
    },
    
    createTrackedWord: function(){
        trackedWord = {
            name: ''
    }; 
     return trackedWord;
    },
    
    createDate: function(){
        date = {
            date: ''
    }; 
     return date;
    },
    
         
    addTrackedWord: function(trackedWord){
        
        word = $http.post('http://localhost:8080/Tweets/word/save',trackedWord);
        return word;
    },
    getMessages: function(){
        messageList = $http.get("http://localhost:8080/Tweets/message");
    
        return messageList;
    }
    
    
 };
 });