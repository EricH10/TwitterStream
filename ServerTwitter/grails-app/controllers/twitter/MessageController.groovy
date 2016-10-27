package twitter



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import java.text.SimpleDateFormat

@Transactional(readOnly = true)
class MessageController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 100000, 1000000)
        respond Message.list(params), [status: OK]
    }

    @Transactional
    def save(Message messageInstance) {
        if (messageInstance == null) {
            render status: NOT_FOUND
            return
        }

        messageInstance.validate()
        if (messageInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }
        messageInstance.date = new Date()
        messageInstance.save flush:true
 
        respond messageInstance, [status: CREATED]
    }

    @Transactional
    def update(Message messageInstance) {
        if (messageInstance == null) {
            render status: NOT_FOUND
            return
        }

        messageInstance.validate()
        if (messageInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        messageInstance.save flush:true
        respond messageInstance, [status: OK]
    }

    @Transactional
    def delete(Message messageInstance) {

        if (messageInstance == null) {
            render status: NOT_FOUND
            return
        }

        messageInstance.delete flush:true
        render status: NO_CONTENT
    }
    
}