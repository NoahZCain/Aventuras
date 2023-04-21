package com.nashss.se.musicplaylistservice.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.nashss.se.musicplaylistservice.activity.requests.GetAllEventsRequest;
import com.nashss.se.musicplaylistservice.activity.results.GetAllEventsResult;

public class GetAllEventsLambda extends LambdaActivityRunner<GetAllEventsRequest, GetAllEventsResult>
        implements RequestHandler<AuthenticatedLambdaRequest<GetAllEventsRequest>, LambdaResponse> {

    /**
     * Handles a Lambda Function request
     *
     * @param input   The Lambda Function input
     * @param context The Lambda execution environment context object.
     * @return The Lambda Function output
     */
    @Override
    public LambdaResponse handleRequest(AuthenticatedLambdaRequest<GetAllEventsRequest> input, Context context) {
        return super.runActivity(
                () -> input.fromPath(path ->
                        GetAllEventsRequest.builder()
//                                .withId(path.get("id"))
//                                .withName(path.get("name"))
//                                .withAddress(path.get("address"))
//                                .withEventCreator(path.get("eventCreator"))
//                                .withDateTime(path.get("dateTime"))
                                .build()),
                (request, serviceComponent) ->
                        serviceComponent.provideGetAllEventsActivity().handleRequest(request));
    }
}
