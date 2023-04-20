package com.nashss.se.musicplaylistservice.activity.requests;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

@JsonDeserialize(builder= RemoveEventFromProfileRequest.Builder.class)
public class RemoveEventFromProfileRequest {
    private final String eventId;

    private final String profileId;

    private RemoveEventFromProfileRequest(String eventId,  String profileId){
        this.eventId = eventId;
        this.profileId = profileId;
    }

    public String getEventId() {
        return eventId;
    }

    public String getProfileId() {
        return profileId;
    }

    @Override
    public String toString() {
        return "RemoveEventFromProfileRequest{" +
                "eventId='" + eventId + '\'' +
                ", profileId='" + profileId + '\'' +
                '}';
    }

    //CHECKSTYLE:OFF:Builder

    public static Builder builder(){
        return new Builder();
    }
    @JsonPOJOBuilder
    public static class Builder{

        private String eventId;
        private String profileId;

        public Builder withEventId(String eventId) {
            this.eventId = eventId;
            return this;
        }

        public Builder withProfileId(String profileId) {
            this.profileId = profileId;
            return this;
        }
        public RemoveEventFromProfileRequest build(){
            return new RemoveEventFromProfileRequest(eventId, profileId);
        }
    }
}