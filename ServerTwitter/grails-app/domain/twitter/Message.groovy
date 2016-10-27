package twitter

import grails.rest.Resource
import java.text.SimpleDateFormat

class Message {
    String message
    String date
    String location
    static belongsTo = [trackedWords : TrackedWords]
    static constraints = {
        date nullable: true
        location nullable: true
        message(blank: true, size:0..500) 
        
    }
    def Message(String message, Date date, String location){
        this.message = message
        this.date = new SimpleDateFormat("MM-dd-yyyy hh:mm aa").format(date) 
        this.location = location
        
    }
}
