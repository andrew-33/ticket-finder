package com.example.ticketfinder;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping(path="/api")
public class EventController {
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private TimepointRepository timepointRepository;

    @ControllerAdvice
    public class Handler {

        @ExceptionHandler(Exception.class)
        public ResponseEntity<Object> handle(Exception ex,
                                             HttpServletRequest request, HttpServletResponse response) {
            if (ex instanceof NullPointerException) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping(path="/add") // Map ONLY POST Requests
    public @ResponseBody String addEvent (@RequestParam String name, @RequestParam String url,
                                          @RequestParam Float minPrice, @RequestParam Float maxPrice, @RequestParam String date) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        Event n = new Event();
        n.setName(name);
        n.setUrl(url);
        Event saved = eventRepository.save(n);

        Timepoint t = new Timepoint();
        t.setEvent(saved);
        t.setMinPrice(minPrice);
        t.setMaxPrice(maxPrice);
        t.setDate(date);
        timepointRepository.save(t);

        return "Saved";
    }


    @GetMapping(path="/all")
    public @ResponseBody Iterable<Event> getAllEvents() {
        // This returns a JSON or XML with the events
        return eventRepository.findAll();
    }

    @DeleteMapping(path="/delete-all")
    public @ResponseBody String deleteAll() {
        eventRepository.deleteAll();
        timepointRepository.deleteAll();
        return "Deleted all";
    }

    @DeleteMapping(path="/delete")
    public @ResponseBody String deleteEvent(@RequestParam Integer id) {
        eventRepository.deleteById(id);
        return "Deleted id " + Integer.toString(id);
    }

}