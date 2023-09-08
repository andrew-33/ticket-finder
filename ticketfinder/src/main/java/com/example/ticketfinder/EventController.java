package com.example.ticketfinder;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventController {
    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/event")
    public Event event(@RequestParam(value = "name", defaultValue = "Hello") String name) {
        return new Event(counter.incrementAndGet(), String.format(name));
    }
}