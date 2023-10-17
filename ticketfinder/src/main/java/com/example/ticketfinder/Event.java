package com.example.ticketfinder;

import jakarta.persistence.*;

import java.util.ArrayList;


@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    private String url;

    @OneToMany(mappedBy = "event")
    private ArrayList<Timepoint> timepoints;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public ArrayList<Timepoint> getTimepoints() {
        return timepoints;
    }

    public void setTimepoints(ArrayList<Timepoint> timepoints) {
        this.timepoints = timepoints;
    }

}