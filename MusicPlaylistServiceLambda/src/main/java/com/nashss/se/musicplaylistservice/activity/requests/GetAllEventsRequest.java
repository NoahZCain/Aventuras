package com.nashss.se.musicplaylistservice.activity.requests;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

@JsonDeserialize(builder = GetAllEventsRequest.Builder.class)
public class GetAllEventsRequest {
    private String eventId;
    private String name;
    private String dateTime;
    private String eventCreator;
    private String address;

    public GetAllEventsRequest(String eventId, String name, String dateTime, String eventCreator, String address) {
        this.eventId = eventId;
        this.name = name;
        this.dateTime = dateTime;
        this.eventCreator = eventCreator;
        this.address = address;
    }

    public String getEventId() {
        return eventId;
    }

    public String getName() {
        return name;
    }

    public String getDateTime() {
        return dateTime;
    }

    public String getEventCreator() {
        return eventCreator;
    }

    public String getAddress() {
        return address;
    }

    @Override
    public String toString() {
        return "GetALLEventsRequest{" +
                "eventId='" + eventId + '\'' +
                ", name='" + name + '\'' +
                ", dateTime='" + dateTime + '\'' +
                ", eventCreator='" + eventCreator + '\'' +
                ", address='" + address + '\'' +
                '}';
    }

    @JsonPOJOBuilder
    public static class Builder {
        private String eventId;
        private String name;
        private String dateTime;
        private String eventCreator;
        private String address;


        public Builder withId(String eventId) {
            this.eventId = eventId;
            return this;
        }

        public Builder withName(String name) {
            this.name = name;
            return this;
        }

        public Builder withDateTime(String dateTime) {
            this.dateTime = dateTime;
            return this;
        }

        public Builder withEventCreator(String eventCreator) {
            this.eventCreator = eventCreator;
            return this;
        }

        public Builder withAddress(String address) {
            this.address = address;
            return this;
        }

        public GetAllEventsRequest build() {
            return new GetAllEventsRequest(eventId, name, dateTime, eventCreator, address);
        }

    }

    public static Builder builder() {
        return new Builder();
    }
}
