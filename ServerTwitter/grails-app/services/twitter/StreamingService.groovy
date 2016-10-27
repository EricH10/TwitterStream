package twitter

import grails.transaction.Transactional

@Transactional
class StreamingService {

    def save(trackedWord, text, location) {
        String delimiter = '"'
        if (location != null){
        location = location.substring(1, location.length()-1);
        //print location
        }
        Date newDate = new Date()
        def message = new Message(text, newDate, location)
        def messages = Message.findAll()
        for(int i = 0; i < messages.size(); i++){
            print messages.getAt(i).location
        }
        trackedWord.addToMessage(message).save(flush:true)
        if (message.validate()){
            
        }
        

    }
    
}
