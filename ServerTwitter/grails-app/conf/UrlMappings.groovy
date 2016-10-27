class UrlMappings {

	static mappings = {
		"/word"(controller: "TrackedWords", action: "index")
                "/word/save"(controller: "TrackedWords", action: "save")
                "/word/update"(controller: "TrackedWords", action: "update")
                "/word/$id"{
		controller = "TrackedWords"
		action = [POST: "update", PUT: "update", GET: "show", DELETE: "delete"]}
                "/message"(controller: "Message", action: "index")
                "/message/save"(controller: "Message", action: "index")
                "/stream"(controller: "Stream", action: "save")
                "/stream/stop"(controller: "Stream", action: "update")

		
        "/"(view:"/index")
	}

}
