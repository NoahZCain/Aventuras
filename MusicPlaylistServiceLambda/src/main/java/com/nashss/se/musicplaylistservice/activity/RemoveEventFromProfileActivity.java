package com.nashss.se.musicplaylistservice.activity;

import com.nashss.se.musicplaylistservice.activity.requests.RemoveEventFromProfileRequest;
import com.nashss.se.musicplaylistservice.activity.requests.RemoveFollowingFromProfileRequest;
import com.nashss.se.musicplaylistservice.activity.results.RemoveEventFromProfileResult;
import com.nashss.se.musicplaylistservice.dynamodb.EventDao;
import com.nashss.se.musicplaylistservice.dynamodb.ProfileDao;
import com.nashss.se.musicplaylistservice.dynamodb.models.Profile;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class RemoveEventFromProfileActivity {

    private final Logger log = LogManager.getLogger();
    private final ProfileDao profileDao;
    private final EventDao eventDao;

    @Inject
    public RemoveEventFromProfileActivity(ProfileDao profileDao, EventDao eventDao){
        this.profileDao = profileDao;
        this.eventDao = eventDao;
    }

    public RemoveEventFromProfileResult handleRequest(final RemoveEventFromProfileRequest removeEventFromProfileRequest){
        log.info("Received RemoveEventFromProfileRequest{}", removeEventFromProfileRequest);

        String profileId = removeEventFromProfileRequest.getProfileId();
        String eventIdToRemove = removeEventFromProfileRequest.getEventId();

        profileDao.getProfile(profileId);
        eventDao.getEvent(eventIdToRemove);

        Set<String> updatedList = profileDao.removeEventFromProfile(eventIdToRemove,profileId);
        List<String> list = new ArrayList<>(updatedList);
        return RemoveEventFromProfileResult.builder()
                .withEventList(list)
                .build();
    }
}