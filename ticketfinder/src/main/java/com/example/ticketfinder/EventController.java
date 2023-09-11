package com.example.ticketfinder;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping(path="/api")
public class EventController {
    @Autowired
    private EventRepository eventRepository;

    @PostMapping(path="/add") // Map ONLY POST Requests
    public @ResponseBody String addEvent (@RequestParam String name) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        Event n = new Event();
        n.setName(name);
        eventRepository.save(n);
        return "Saved";
    }


    @GetMapping(path="/all")
    public @ResponseBody Iterable<Event> getAllEvents() {
        // This returns a JSON or XML with the events
        return eventRepository.findAll();
    }
}