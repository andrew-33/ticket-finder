package com.example.ticketfinder;

import jakarta.persistence.*;

import java.util.ArrayList;


@Entity
public class Timepoint {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    @JoinColumn(name="EVENT_ID")
    private Event event;

    private Float minPrice;

    private Float maxPrice;

    private String date;

    public Event getEvent() { return event; }

    public void setEvent(Event event) { this.event = event; }

    public Float getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(Float minPrice) { this.minPrice = minPrice; }

    public Float getMaxPrice() { return maxPrice; }

    public void setMaxPrice(Float maxPrice) { this.maxPrice = maxPrice; }

    public String getDate() { return date; }

    public void setDate(String date) { this.date = date; }

}