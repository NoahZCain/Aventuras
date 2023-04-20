package com.nashss.se.musicplaylistservice.activity.results;

import java.util.List;

public class RemoveEventFromProfileResult {
    private final List<String> eventList;

    private RemoveEventFromProfileResult(List<String> eventList){
        this.eventList = eventList;
    }

    public List<String> getEventList() {
        return eventList;
    }

    @Override
    public String toString() {
        return "RemoveEventFromProfileResult{" +
                "eventList=" + eventList +
                '}';
    }
    public static Builder builder(){
        return new Builder();
    }
    public static class Builder{
        private List<String> eventList;

        public Builder withEventList(List<String> eventList){
            this.eventList = eventList;
            return this;
        }

        public RemoveEventFromProfileResult build(){
            return new RemoveEventFromProfileResult(eventList);
        }

    }
}