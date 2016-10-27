package twitter


import com.twitter.hbc.ClientBuilder;
import com.twitter.hbc.core.Constants;
import com.twitter.hbc.core.endpoint.StatusesSampleEndpoint;
import com.twitter.hbc.core.processor.StringDelimitedProcessor;
import com.twitter.hbc.httpclient.BasicClient;
import com.twitter.hbc.httpclient.auth.Authentication;
import com.twitter.hbc.httpclient.auth.OAuth1;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;
import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional


class StreamController {
    def streamingService
    def sessionFactory
    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "POST", delete: "DELETE"]
    def client

    def save() {

        runStream()
    }

    @Transactional
    def update(Stream streamInstance) {
       client.stop()
    }
    
    def runStream() throws InterruptedException {
   // Create an appropriately sized blocking queue

    def trackedWords = TrackedWords.findAll();
    BlockingQueue<String> queue = new LinkedBlockingQueue<String>(10000);

    // Define our endpoint: By default, delimited=length is set (we need this for our processor)
    // and stall warnings are on.
    StatusesSampleEndpoint endpoint = new StatusesSampleEndpoint();
    endpoint.stallWarnings(false);

    Authentication auth = new OAuth1("Po4TnwsIMhUdJ0vzC0pQzt20C", "I8w33ikJTG6DNJyTvD64gTzgDkvuJZ3edfmQcqY30k7L9oqxTY", "1918581332-tdGqweroVY16eEV5h3MBTeTpoXHPqMfrKMoMYS9", "fUDXGI6f16sG3whT9k6MwAVk4rLOHO10LWvYAlOueDH69");
    //Authentication auth = new com.twitter.hbc.httpclient.auth.BasicAuth(username, password);

    // Create a new BasicClient. By default gzip is enabled.
        client = new ClientBuilder()
            .name("sampleExampleClient")
            .hosts(Constants.STREAM_HOST)
            .endpoint(endpoint)
            .authentication(auth)
            .processor(new StringDelimitedProcessor(queue))
            .build();

    // Establish a connection
    client.connect();

    // Do whatever needs to be done with messages
    for (int msgRead = 0; msgRead < 1000000; msgRead++) {
       
      if (client.isDone()) {
        System.out.println("Client connection closed unexpectedly: " + client.getExitEvent().getMessage());
        break;
      }

      String msg = queue.poll(10, TimeUnit.SECONDS);
      if (msg == null) {
        client.stop()
        
      } 
     else {

       for(int count = 0; count < trackedWords.size(); count++){
        if(msg.contains(" "+ trackedWords.get(count).name + " ")) {
         String delimiterLocation1 = "\"location\":"
         String delimterLocation2 = ",\"url\":"
         
         String[] location1 = (msg.split(delimiterLocation1))
         String[] location2= (location1[1].split(delimterLocation2))
         String location = location2[0]
          String delimiter ="\"text\":"
          String delimiter2 ="\"source\":"
          
          String[] tokens = msg.split(delimiter);
          String[] tokens2 = tokens[1].split(delimiter2);
          
          String text = tokens2[0];
          def trackedWord = trackedWords.get(count)
       
          if(text.contains(" "+ trackedWords.get(count).name + " ")) {
             streamingService.save(trackedWord,text, location)
      }}}
     }}
    
    client.stop()
    
    // Print some stats
    System.out.printf("The client read %d messages!\n", client.getStatsTracker().getNumMessages())
   
 }
 
    
    


}

