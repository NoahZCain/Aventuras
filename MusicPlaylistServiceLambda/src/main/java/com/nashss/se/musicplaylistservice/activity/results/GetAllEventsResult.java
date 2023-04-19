package com.nashss.se.musicplaylistservice.activity.results;

import java.util.ArrayList;
import java.util.List;

public class GetAllEventsResult {
    private final List<String> allEventList;

    private GetAllEventsResult(List<String> allEventList) {
        this.allEventList = allEventList;
    }

    public List<String> getAllEventList() {
        return allEventList;
    }

    @Override
    public String toString() {
        return "GetAllEventsResult{" +
                "allEventList=" + allEventList +
                '}';
    }

    //CHECKSTYLE:OFF:Builder
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private List<String> allEventList;

        public Builder withEventList(List<String> allEventList) {
            this.allEventList = new ArrayList<>(allEventList);
            return this;
        }

        public GetAllEventsResult build() {
            return new GetAllEventsResult(allEventList);
        }
    }
}
