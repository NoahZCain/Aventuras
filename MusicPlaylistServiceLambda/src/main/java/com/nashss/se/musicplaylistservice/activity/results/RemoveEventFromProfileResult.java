package com.nashss.se.musicplaylistservice.activity.results;

import java.util.List;

public class RemoveEventFromProfileResult {
    private final List<String> eventList;

    private RemoveEventFromProfileResult(List<String> eventList){
        this.eventList = eventList;
    }
}
