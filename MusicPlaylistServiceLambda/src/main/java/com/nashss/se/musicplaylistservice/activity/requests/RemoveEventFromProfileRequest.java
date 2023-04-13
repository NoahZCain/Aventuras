package com.nashss.se.musicplaylistservice.activity.requests;

import com.amazonaws.internal.config.Builder;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

@JsonDeserialize(builder= RemoveEventFromProfileRequest.class)
public class RemoveEventFromProfileRequest {
    private final String profileId;
    private final String eventIdToRemove;

    private RemoveEventFromProfileRequest(String profileId,String eventIdToRemove){
        this.profileId = profileId;
        this.eventIdToRemove = eventIdToRemove;
    }

    public String getProfileId() {
        return profileId;
    }

    public String getEventIdToRemove() {
        return eventId;
    }

    @Override
    public String toString() {
        return "RemoveEventFromProfileRequest{" +
                "profileId='" + profileId + '\'' +
                ", eventIdToRemove='" + eventIdToRemove + '\'' +
                '}';
    }
    //CHECKSTYLE:OFF:Builder

    public static Builder builder(){
        return new Builder();
    }
   @JsonPOJOBuilder
    public static class Builder{

        private String profileId;
        private String eventIdToRemove;

        public Builder withProfileId(String profileId){
            this.profileId = profileId;
             return this;
        }
        public Builder withEventIdToRemove(String eventIdToRemove){
            this.eventIdToRemove = eventIdToRemove;
            return this;
        }
        public RemoveEventFromProfileRequest build(){
            return new RemoveEventFromProfileRequest(profileId,eventIdToRemove);
        }
   }
}
