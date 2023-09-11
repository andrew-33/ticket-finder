package com.example.ticketfinder;

import org.springframework.data.repository.CrudRepository;

import com.example.ticketfinder.Event;

public interface EventRepository extends CrudRepository<Event, Integer> {

}