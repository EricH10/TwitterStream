package twitter

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import java.text.SimpleDateFormat

@Transactional(readOnly = true)
class TrackedWordsController {
    
    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]
    
    def index(Integer max) {
        CalculateHourlyRate()
        addCount()
        params.max = Math.min(max ?: 1000, 10000)
        respond TrackedWords.list(params), [status: OK]
        
    }
    def show(TrackedWords trackedWord) {
        
        respond trackedWord: trackedWord
    }

    def save(TrackedWords trackedWordsInstance) {
        if (trackedWordsInstance == null) {
            render status: NOT_FOUND
            return
        }
        trackedWordsInstance.validate()
        if (trackedWordsInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        trackedWordsInstance.save flush:true
        respond trackedWordsInstance, [status: CREATED]
    }

    @Transactional
    def update(TrackedWords trackedWordsInstance) {
        if (trackedWordsInstance == null) {
            render status: NOT_FOUND
            return
        }

        trackedWordsInstance.validate()
        if (trackedWordsInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }
        
        trackedWordsInstance.save flush:true
        respond trackedWordsInstance, [status: OK]
    }

    @Transactional
    def delete(TrackedWords trackedWordsInstance) {

        if (trackedWordsInstance == null) {
            println trackedWordsInstance
            render status: NOT_FOUND
            return
        }

        trackedWordsInstance.delete flush:true
        render status: NO_CONTENT
    }
    def CalculateHourlyRate(){
        def trackedWords = TrackedWords.findAll()
        for (int i = 0; i < trackedWords.size(); i++){
            def messages  = trackedWords.getAt(i).message.findAll()
            Date date = new Date()
            
            def currentDay = new SimpleDateFormat("MM-dd-yyyy").format(date) 
            def currentHour = new SimpleDateFormat("hh").format(date) 
            def currentMinute = new SimpleDateFormat("mm").format(date)
            def countHour = 0
            def countMinute = 0
            for (int z = 0; z < messages.size(); z++){
                def minute = messages.getAt(z).date.split(currentDay)

                if (messages.getAt(z).date.contains(currentDay)){
                    
                    if (messages.getAt(z).date.contains(currentHour)){
                        countHour++ 
                        
                        if (minute[1].contains(currentMinute)){
                            countMinute++

                        }
                     
                    }
                }
                
            }
             trackedWords.getAt(i).hourlyRate = countHour
             trackedWords.getAt(i).minuteRate = countMinute
        }
    }
    def addCount(){
        def wordList = TrackedWords.findAll()
        for (int i = 0; i < wordList.size(); i++){
            
            def messageCount = wordList.get(i).message.findAll().size()
            wordList.get(i).count = messageCount
        }
    }
}


