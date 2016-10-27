package twitter

import grails.rest.Resource

class TrackedWords {
    String name
    int count 
    int hourlyRate
    int minuteRate
    static hasMany = [message : Message]
    static constraints = {
        count nullable: true
        hourlyRate nullable: true
        minuteRate nullable: true
	
    }
   
}
