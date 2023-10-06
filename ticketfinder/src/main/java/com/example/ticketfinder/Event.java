package com.example.ticketfinder;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ElementCollection;
import java.util.ArrayList;


@Entity
public class Event {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String name;

    private String url;

    @ElementCollection
    private ArrayList<Float> minPrices = new ArrayList<Float>();

    @ElementCollection
    private ArrayList<Float> maxPrices = new ArrayList<Float>();

    @ElementCollection
    private ArrayList<String> priceDates = new ArrayList<String>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) { this.id = id; }

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

    public ArrayList<Float> getMinPrices() {
        return minPrices;
    };

    public void setMinPrices(ArrayList<Float> prices) {
        this.minPrices = prices;
    }

    public ArrayList<Float> getMaxPrices() {
        return maxPrices;
    };

    public void setMaxPrices(ArrayList<Float> prices) {
        this.maxPrices = prices;
    }

    public ArrayList<String> getPriceDate() {
        return priceDates;
    }

    public void setPriceDates(ArrayList<String> dates) {
        this.priceDates = dates;
    }
}