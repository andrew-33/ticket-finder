package com.example.ticketfinder;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface EventRepository extends CrudRepository<Event, Integer> {
    Event getById(Integer id);
}