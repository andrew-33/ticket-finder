package com.example.ticketfinder;

import org.springframework.data.repository.CrudRepository;

import org.springframework.transaction.annotation.Transactional;

public interface TimepointRepository extends CrudRepository<Timepoint, Integer> {
    @Transactional
    Long deleteByEventId(Integer eventId);
}